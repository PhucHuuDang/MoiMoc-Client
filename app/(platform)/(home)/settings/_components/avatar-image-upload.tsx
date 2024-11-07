"use client";

import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { useShallow } from "zustand/react/shallow";

interface AvatarImageUploadProps {
  handleImageUpload: (url: string) => void;
}

export const AvatarImageUpload = ({
  handleImageUpload,
}: AvatarImageUploadProps) => {
  const handleUploadSuccess = async (result: any, { widget }: any) => {
    const newImage = result.info.secure_url;

    handleImageUpload(newImage);
  };

  return (
    <CldUploadWidget
      // onUpload={handleUpload}
      // onUploadAdded={handleUploadAdded}
      onSuccess={handleUploadSuccess}
      options={{
        maxFiles: 1,
        // multiple: true,
        // theme: "minimal",
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
    >
      {({ cloudinary, open }) => {
        // console.table(cloudinary);

        return (
          <Button variant="outline" onClick={() => open?.()}>
            <Camera className="mr-2 h-4 w-4" />
            Change Picture
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
