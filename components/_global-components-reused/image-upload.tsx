"use client";

import { useImagesProductStore } from "@/store/use-images-product-store";
import { Camera, Upload } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
}

export const ImageUpload = ({ value, onChange, id }: ImageUploadProps) => {
  const [url, setUrl] = useState<string>();
  const imagesProductStore = useImagesProductStore();

  const handleUpload = (result: any) => {
    console.log({ result });

    onChange?.(result.info.secure_url);
    setUrl(result.info.secure_url);
  };

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
            className="relative w-50 h-10 rounded-3xl cursor-pointer hover:opacity-70 transition p-10
              border-dashed border-slate-400 flex bg-white justify-center items-center gap-2
              group/thumbnail hover:border-slate-200"
          >
            {/* <Camera className="text-slate-400 h-6 w-6 group-hover/thumbnail:text-slate-100 transition" />
            <div
              className="font-semibold text-slate-400 group-hover/thumbnail:text-slate-100 text-lg
                transition"
            >
              Thumbnail
            </div> */}

            <Upload className="text-primary size-6 group-hover/thumbnail:bg-opacity-10 transition" />
            <div
              className="font-semibold text-primary group-hover/thumbnail:bg-opacity-10 text-lg
                transition"
            >
              Upload
            </div>
            {value ||
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
              ))}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
