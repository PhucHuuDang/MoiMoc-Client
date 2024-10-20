"use client";

import { useImagesProductStore } from "@/store/use-images-product-store";
import { Camera, Upload } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

import { useShallow } from "zustand/react/shallow";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
}

export const ImageUpload = ({ value, onChange, id }: ImageUploadProps) => {
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
          <div
            onClick={() => open?.()}
            className="relative w-50 h-5 rounded-3xl cursor-pointer hover:opacity-70 transition p-10
              outline-primary animate-pulse flex justify-center items-center gap-2
              group/thumbnail hover:border-slate-200 outline-dashed"
          >
            <Upload
              className="text-primary font-bold size-8 group-hover/thumbnail:bg-opacity-10 transition
                animate-pulse"
            />
            <div
              className="font-semibold text-primary animate-pulse group-hover/thumbnail:bg-opacity-10
                text-lg transition"
            >
              Upload
            </div>
            {/* {value ||
              (url && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    alt="Upload"
                    fill
                    style={{ objectFit: "cover", borderRadius: "16px" }}
                    src={value || url}
                  />
                  <input type="text" hidden id={id} name={id} value={url} />
                </div>
              ))} */}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
