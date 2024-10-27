import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AboutMoiMocSafeTypes } from "@/safe-types-zod/admin/about-moi-moc-safe-types";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormTextareaControl } from "@/components/_global-components-reused/form/form-textarea-control";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import axios from "axios";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/animata/spinner";
import { DataTypes } from "../manage-moi-moc-client";

interface ManageContentProps {
  tabsContent: string;
  data: DataTypes;
}
export const ManageContent = ({ tabsContent, data }: ManageContentProps) => {
  const [content, setContent] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof AboutMoiMocSafeTypes>>({
    resolver: zodResolver(AboutMoiMocSafeTypes),
  });

  const queryClient = useQueryClient();

  // const { data, isError, isLoading, error } = useQuery({
  //   queryKey: ["about-moi-moc"],
  //   queryFn: async () => {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/about-moi-moc`,
  //     );
  //     return response.data;
  //   },
  // });

  const handleContentChange = useCallback((section: string, value: string) => {
    // setContent((prev) => ({ ...prev, [section]: value }));
  }, []);

  const handleSaveChanges = useCallback(() => {
    form.handleSubmit(onSubmit)();
  }, [content]);

  useEffect(() => {
    if (data) {
      form.setValue("story", data.story);
      form.setValue("vision", data.vision);
      form.setValue("mission", data.mission);
    }
  }, [data]);

  const onSubmit = async (values: z.infer<typeof AboutMoiMocSafeTypes>) => {
    setIsPending(true);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/about-moi-moc/${data.id}`,
        values,
      );

      if (response.status === 200) {
        toast.success("Changes saved successfully");
        queryClient.invalidateQueries({ queryKey: ["about-moi-moc"] });
      }
    } catch (error) {
      console.log({ error });
      toast.error(
        "Something went wrong when updating the content of Manage About Moi Moc",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormValues form={form} onSubmit={onSubmit}>
      <TabsContent value={tabsContent}>
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <FormTextareaControl
                form={form}
                name="story"
                label="Story"
                placeholder="Enter story content here..."
              />

              <FormTextareaControl
                form={form}
                name="vision"
                label="Vision"
                placeholder="Enter vision content here..."
              />

              <FormTextareaControl
                form={form}
                name="mission"
                label="Mission"
                placeholder="Enter mission content here..."
              />

              {/* <FormSubmit className="bg-red-500">Save changes</FormSubmit> */}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="flex justify-end">
        <FormSubmit disabled={isPending}>
          {isPending && <Spinner className="size-6" />} Save all changes
        </FormSubmit>
      </div>
    </FormValues>
  );
};
