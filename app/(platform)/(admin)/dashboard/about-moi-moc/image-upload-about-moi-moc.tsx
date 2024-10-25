"use client";

import { Button } from "@/components/ui/button";
import { useImagesProductStore } from "@/store/use-images-product-store";
import { Camera, Upload } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

import { useShallow } from "zustand/react/shallow";

interface ImageUploadAboutMoiMocProps {}

export const ImageUploadAboutMoiMoc = ({}: ImageUploadAboutMoiMocProps) => {
  const imagesProductStore = useImagesProductStore();

  const test = useImagesProductStore(useShallow((state) => state.addImage));

  const handleUploadSuccess = (result: any, { widget }: any) => {
    imagesProductStore.addImage(result.info.secure_url);
    // setUrl(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      // onUpload={handleUpload}
      // onUploadAdded={handleUploadAdded}
      onSuccess={handleUploadSuccess}
      options={{
        // maxFiles: 1,
        multiple: true,
        // folder: "/Users/danghuuphuc001/Desktop/books",
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
    >
      {({ cloudinary, open }) => {
        // console.table(cloudinary);

        return (
          <Button
            onClick={() => open?.()}
            className="relative h-5 rounded-2xl cursor-pointer hover:opacity-70 flex justify-center
              items-center gap-2 group/thumbnail hover:border-slate-200 outline-dashed"
          >
            <Upload
              className="text-primary font-bold size-8 group-hover/thumbnail:bg-opacity-10 transition
                animate-pulse"
            />
            <div
              className="font-semibold text-primary animate-pulse group-hover/thumbnail:bg-opacity-10
                text-lg transition"
            >
              Upload Image
            </div>
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
