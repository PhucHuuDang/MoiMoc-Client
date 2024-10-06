"use client";

import { ImageUpload } from "@/components/_global-components-reused/image-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useFromStoreImagesProduct } from "@/store/use-from-store-images-product";
import { useImagesProductStore } from "@/store/use-images-product-store";
import { X } from "lucide-react";
import Image from "next/image";
import { MouseEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface ProductImageProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
}

export const ProductImage = () => {
  // const imagesProductStore = useImagesProductStore();
  const imagesProductStore = useFromStoreImagesProduct(
    useImagesProductStore,
    (state) => state,
  );

  const ImageLoading = () => {
    return (
      <>
        <Skeleton className="size-[300px] rounded-md" />
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="size-[84px] rounded-md" />
          <Skeleton className="size-[84px] rounded-md" />
          <Skeleton className="size-[84px] rounded-md" />
          <Skeleton className="size-[84px] rounded-md" />
          <Skeleton className="size-[84px] rounded-md" />
          <Skeleton className="size-[84px] rounded-md" />
        </div>
      </>
    );
  };

  const handleDelete = (e: MouseEvent<SVGSVGElement>, index: number) => {
    e.stopPropagation();
    imagesProductStore?.removeImage(index);
  };

  // {
  //   console.log(imagesProductStore?.images);
  // }

  return (
    // <Card>
    // <CardContent>
    <div className="grid gap-2 h-[392px] overflow-y-auto pr-1">
      {imagesProductStore?.images.length === 0 ? (
        <ImageLoading />
      ) : (
        <>
          <div className="relative">
            <Image
              alt="Product image"
              className="aspect-square h-full w-full rounded-md object-cover"
              height="300"
              src={imagesProductStore?.images[0]!}
              width="300"
            />
            <X
              className="absolute z-50 right-2 rounded-lg hover:bg-slate-300 duration-200 top-1 h-6 w-6
                text-red-500 cursor-pointer"
              onClick={(e) => handleDelete(e, 0)}
            />
            <div className="absolute inset-0 hover:bg-slate-900/20 cursor-pointer duration-300" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {imagesProductStore?.images.map((image, index) => {
              return (
                index > 0 && (
                  <div className="relative">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="84"
                      src={image}
                      width="90"
                    />

                    <X
                      className="absolute z-50 right-1 rounded-lg hover:bg-slate-300 duration-200 top-0 h-5 w-5
                        text-red-500 cursor-pointer"
                      onClick={(e) => handleDelete(e, index)}
                    />
                    <div className="absolute inset-0 hover:bg-slate-900/20 cursor-pointer duration-300" />
                  </div>
                )
              );
            })}
          </div>
        </>
      )}
    </div>
    // </CardContent>
    //</Card>
  );
};
