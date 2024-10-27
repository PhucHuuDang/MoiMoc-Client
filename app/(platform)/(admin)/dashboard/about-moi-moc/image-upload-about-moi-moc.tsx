"use client";

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useImagesProductStore } from "@/store/use-images-product-store";
import axios from "axios";
import { Camera, Upload } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

import { useShallow } from "zustand/react/shallow";

interface ImageUploadAboutMoiMocProps {
  handleImageUpload: (url: string) => void;
}

export const ImageUploadAboutMoiMoc = ({
  handleImageUpload,
}: ImageUploadAboutMoiMocProps) => {
  const imagesProductStore = useImagesProductStore();

  const handleUploadSuccess = async (result: any, { widget }: any) => {
    const newImage = result.info.secure_url;

    handleImageUpload(newImage);
  };

  return (
    <>
      <CldUploadWidget
        // onUpload={handleUpload}
        // onUploadAdded={handleUploadAdded}
        onSuccess={handleUploadSuccess}
        options={{
          // maxFiles: 1,
          multiple: true,
          folder: "/Users/danghuuphuc001/Desktop/books",
          theme: "minimal",
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        {({ cloudinary, open }) => {
          // console.table(cloudinary);

          return (
            <div
              onClick={() => open?.()}
              className="bg-[#438a60] flex flex-row items-center justify-center gap-x-1 transition
                duration-200 hover:scale-110 hover:bg-[#326a49] text-white rounded-lg w-48"
            >
              <Upload className="text-primary font-bold size-6 group-hover/thumbnail:bg-opacity-10 transition" />
              <span>Upload Image</span>
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
};
