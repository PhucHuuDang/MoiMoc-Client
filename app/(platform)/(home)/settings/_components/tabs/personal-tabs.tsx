import { clientGetData } from "@/api/actions/get-data-api";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent } from "@/components/ui/tabs";
import { useAuthContext } from "@/provider/auth-provider";
import { PersonalSafeTypes } from "@/safe-types-zod/client/settings-profile-safe-types/personal-safe-types";
import { UserProfile } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { capitalize, isEqual } from "lodash";
import { Check, Edit2, X } from "lucide-react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PersonalTabsProps {
  value: string;
}

type PersonalInfo = {
  name: string;
  phoneAuth: string;
  email: string;
  bio: string;

  address: string;
  website: string;
  designation: string;
};

export const PersonalTabs = ({ value }: PersonalTabsProps) => {
  const auth = useAuthContext();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [personalInfo, setPersonalInfo] = useState<
    z.infer<typeof PersonalSafeTypes>
  >({
    name: "",
    bio: "",
    // phoneAuth: "",
    email: "",
    address: "",
    website: "",
    designation: "",
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    // phoneAuth: false,
    bio: false,
    email: false,
    address: false,
    website: false,
    designation: false,
  });

  // console.log("auth: ", auth?.user);
  const {
    data: userInformation,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user-detail"],
    queryFn: async () => await clientGetData("/users/detail", auth?.token!),
  });

  const form = useForm<z.infer<typeof PersonalSafeTypes>>({
    resolver: zodResolver(PersonalSafeTypes),
  });

  const onSubmit = async (values: z.infer<typeof PersonalSafeTypes>) => {
    // console.log({ values });

    // const { createdAt, updatedAt, id, ...user } =
    //   userInformation?.user as UserProfile["user"];

    const { createdAt, updatedAt, id, phoneAuth, ...user } =
      (userInformation?.user as UserProfile["user"]) ?? {};

    let valuesChanged: Record<string, any> = {};

    for (const [key, value] of Object.entries(user)) {
      for (const [keyForm, valueForm] of Object.entries(values)) {
        if (key === keyForm && value !== valueForm) {
          valuesChanged[keyForm] = valueForm;
        }
      }
    }

    if (isEqual(valuesChanged, {})) {
      toast.info("Không có gì thay đổi");
      return;
    }

    console.log({ valuesChanged });

    try {
      const updatePersonalInfo = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        valuesChanged,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );

      if (updatePersonalInfo.status === 200) {
        toast.success("Cập nhật thông tin cá nhân thành công");
        queryClient.invalidateQueries({ queryKey: ["user-detail"] });
        queryClient.invalidateQueries({ queryKey: ["user-activities"] });
      }
    } catch (error) {
      console.log({ error });
      toast.error("Lỗi khi cập nhật thông tin cá nhân");
    }
  };

  const handleSubmit = useCallback(() => {
    form.handleSubmit(onSubmit)();
    setIsDialogOpen(false);
  }, []);

  // const validateField = (field: keyof typeof personalInfo, value: string) => {
  //   switch (field) {
  //     case "name":
  //       return value.length > 0 && value.length <= 50;
  //     case "bio":
  //       return value?.length <= 500;
  //     case "website":
  //       return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
  //         value,
  //       );
  //     case "designation":
  //       return value?.length <= 150;
  //     default:
  //       return true;
  //   }
  // };

  const handlePersonalInfoChange = (
    field: keyof typeof personalInfo,
    value: string,
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsEditing((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  useEffect(() => {
    if (!!userInformation) {
      const user = userInformation.user as UserProfile["user"];
      setPersonalInfo({
        name: user.name,
        // phoneAuth: user.phoneAuth,
        email: user.email,
        bio: user.bio,
        address: userInformation.address[0].address,
        website: user.website,
        designation: user.designation,
      });

      form.setValue("designation", user.designation);
      form.setValue("name", user.name);
      // form.setValue("phoneAuth", user.phoneAuth);
      form.setValue("email", user.email);
      form.setValue("address", userInformation.address[0].address ?? null);
      form.setValue("bio", user.bio ?? null);
      form.setValue("website", user.website ?? null);
    }
  }, [form, auth, isLoading]);

  const InputFormSkeleton = () => {
    return (
      <div className="flex w-full items-center justify-between gap-x-1">
        <div className="w-full">
          <Skeleton className="w-24 rounded-lg" />
          <Skeleton className="rounded-lg h-8 w-full" />
        </div>
        <Skeleton className="rounded-lg size-8" />
      </div>
    );
  };

  return (
    <>
      <TabsContent value={value}>
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </div>

            <div className="relative">
              <Button
                variant="moiMoc"
                className="w-36"
                disabled={form.formState.isSubmitting}
                onClick={() => setIsDialogOpen(true)}
              >
                {form.formState.isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormValues
              form={form}
              onSubmit={onSubmit}
              classNameForm="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {Object.entries(personalInfo).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>
                    {/* {key.charAt(0).toUpperCase() + key.slice(1)} */}
                    {capitalize(key)}
                  </Label>

                  {!isLoading ? (
                    isEditing[key as keyof typeof isEditing] ? (
                      <div className="flex w-full items-center justify-between gap-x-1">
                        <div className="w-full">
                          <FormItemsControl
                            form={form}
                            name={key as keyof typeof personalInfo}
                            disabled={false}
                            // label={capitalize(key)}
                            placeholder={`Hãy nhập ${key}`}
                          />
                        </div>

                        <div className="flex items-center gap-x-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              handlePersonalInfoChange(
                                key as keyof typeof personalInfo,
                                value as string,
                              )
                            }
                            // disabled={
                            //   !validateField(
                            //     key as keyof typeof personalInfo,
                            //     value as string,
                            //   )
                            // }
                          >
                            <Check className="h-4 w-4" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              setIsEditing((prev) => ({
                                ...prev,
                                [key]: false,
                              }))
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span>
                          {form.getValues(key as keyof typeof personalInfo) ??
                            "Hãy điền thêm thông tin của bạn"}
                        </span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            setIsEditing((prev) => ({ ...prev, [key]: true }))
                          }
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  ) : (
                    <InputFormSkeleton key={key} />
                  )}
                </div>
              ))}
            </FormValues>
          </CardContent>
        </Card>
      </TabsContent>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn muốn thay đổi thông tin?</AlertDialogTitle>
            <AlertDialogDescription>
              Hãy chắc chắn rằng bạn đã cập nhật đúng thông tin cá nhân của mình
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
