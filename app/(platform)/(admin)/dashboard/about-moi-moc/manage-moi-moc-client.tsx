"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Trash2,
  Save,
  Upload,
  X,
  Moon,
  Sun,
  Edit2,
  Settings2,
} from "lucide-react";
// import { toast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AboutMoiMocSafeTypes } from "@/safe-types-zod/admin/about-moi-moc-safe-types";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormTextareaControl } from "@/components/_global-components-reused/form/form-textarea-control";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { usePushDataActions } from "@/hooks/use-create-actions";
import axios from "axios";
import { toast } from "sonner";
import { ImageUploadAboutMoiMoc } from "./image-upload-about-moi-moc";
import { useQuery } from "@tanstack/react-query";
import { ManageImagesModels } from "./_components-about-moi-moc/manage-images-models";
import { ManageContent } from "./_components-about-moi-moc/manage-content";

export type DataTypes = {
  id: number;
  story: string;
  vision: string;
  mission: string;
};
export function ManageAboutMoiMocClient({
  initialImages = [],
  initialContent = {},
}) {
  const [images, setImages] = useState(initialImages);
  const [content, setContent] = useState(initialContent);
  const [newImageUrls, setNewImageUrls] = useState<string[] | []>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof AboutMoiMocSafeTypes>>({
    resolver: zodResolver(AboutMoiMocSafeTypes),
  });

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["about-moi-moc"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/about-moi-moc`,
      );
      return response.data;
    },
  });

  const handleDeleteImage = useCallback((index: number) => {
    setNewImageUrls((prev) => prev.filter((_, i) => i !== index));
    toast.success("The image has been removed from the list.");
  }, []);

  const handleContentChange = useCallback((section: string, value: string) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  }, []);

  // const simulateImageUpload = useCallback(() => {
  //   setIsUploading(true);
  //   setUploadProgress(0);
  //   const interval = setInterval(() => {
  //     setUploadProgress((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval);
  //         setIsUploading(false);
  //         return 100;
  //       }
  //       return prev + 10;
  //     });
  //   }, 500);
  // }, []);

  // const handleImageUpload = useCallback(
  //   (url: string) => {
  //     setNewImageUrls((prev) => [...prev, url]);
  //   },
  //   [newImageUrls],
  // );

  // const handleSaveChanges = useCallback(() => {
  //   console.log("Saving changes:", { images, content });

  //   form.handleSubmit(onSubmit)();
  // }, [images, content]);

  // useEffect(() => {
  //   if (data) {
  //     form.setValue("story", data.story);
  //     form.setValue("vision", data.vision);
  //     form.setValue("mission", data.mission);
  //   }
  // }, [data]);

  // const onSubmit = async (values: z.infer<typeof AboutMoiMocSafeTypes>) => {
  //   setIsPending(true);

  //   try {
  //     const response = await axios.put(
  //       `${process.env.NEXT_PUBLIC_API_URL}/about-moi-moc`,
  //       values,
  //     );

  //     if (response.status === 200) {
  //       toast.success("Changes saved successfully");
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //     toast.error(
  //       "Something went wrong when updating the content of Manage About Moi Moc",
  //     );
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  return (
    <div className={"min-h-screen w-full }"}>
      <div className="w-full p-4 space-y-8 transition-colors duration-200">
        <header className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Manage About Moi Moc
            </h1>
            <span className="text-muted-foreground mt-2">
              Manage your website content and images
            </span>
          </div>
          <div className="flex items-center space-x-4"></div>
        </header>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="images"
              className="data-[state=active]:text-primary"
            >
              Manage Images
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:text-primary"
            >
              Edit Content
            </TabsTrigger>
          </TabsList>

          {/* <FormValues form={form} onSubmit={onSubmit}> */}
          <ManageImagesModels tabsContent="images" data={data} />

          <ManageContent tabsContent="content" data={data} />
        </Tabs>
      </div>
    </div>
  );
}
