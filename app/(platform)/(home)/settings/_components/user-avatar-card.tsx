"use client";

import axios from "axios";
import { toast } from "sonner";

import { useState } from "react";
import { useAuthContext } from "@/provider/auth-provider";
import { AvatarImageUpload } from "./avatar-image-upload";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { clientGetData } from "@/api/actions/get-data-api";
import { Skeleton } from "@/components/ui/skeleton";

export const UserAvatarCard = () => {
  const auth = useAuthContext();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: userInformation,
    isError,
    isLoading: isUserLoading,
    error,
  } = useQuery({
    queryKey: ["user-detail"],
    queryFn: async () => await clientGetData("/users/detail", auth?.token!),
  });

  const handleAddAvatar = async () => {
    if (!auth?.isAuth || !auth) {
      toast.error("Bạn cần đăng nhập để thay đổi ảnh đại diện");
      return;
    }

    if (!profileImage) {
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/avatar`,
        { avatar: profileImage },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["user-detail"] });
        queryClient.invalidateQueries({ queryKey: ["user-activities"] });
        toast.success("Thay đổi ảnh đại diện thành công");
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
      toast.error("Lỗi khi thêm ảnh đại diện");
    }
  };

  const imageUrl: string = !!profileImage
    ? profileImage
    : (userInformation?.user?.avatar ??
      "/about-moi-moc-images/avatar-placeholder.gif");

  const UserAvatarSkeleton = () => {
    return (
      <div className="flex items-center justify-between mb-4 rounded-lg">
        <div className="flex items-col items-center space-x-4">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex flex-col gap-y-2">
            <Skeleton className="w-24 h-5 rounded-lg" />
            <Skeleton className="w-44 h-5 rounded-lg" />
          </div>
        </div>

        <Skeleton className="w-40 h-8 rounded-md" />
      </div>
    );
  };

  return (
    <>
      {!isUserLoading ? (
        <div className="flex items-center justify-between mb-4 rounded-lg">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={imageUrl} alt={auth?.user?.name} />
              <AvatarFallback>{auth?.user?.name}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{auth?.user?.name}</h1>
              <span className="text-muted-foreground">
                Manage your profile settings and preferences
              </span>
            </div>
          </div>

          <AvatarImageUpload handleImageUpload={setProfileImage} />
        </div>
      ) : (
        <UserAvatarSkeleton />
      )}

      {profileImage && (
        <div className="mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Progress value={profileCompletion} className="w-full" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile {profileCompletion}% complete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button disabled={isLoading} variant="moiMoc" className="w-32">
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will update all your profile settings. Are you
                  sure you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddAvatar}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};
