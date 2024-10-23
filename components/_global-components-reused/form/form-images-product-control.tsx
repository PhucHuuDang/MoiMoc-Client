"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { ImageUpload } from "../image-upload";
import { useFromStoreImagesProduct } from "@/store/use-from-store-images-product";
import { useImagesProductStore } from "@/store/use-images-product-store";
import { useEffect } from "react";
import { ProductImage } from "@/types/product-detail-types";

interface FormImagesProductControlProps<T extends FieldValues, K> {
  form: UseFormReturn<T>;
  name: Path<T>;
  children: React.ReactNode;

  title: string;
  description?: string;

  productId?: number;

  edit?: boolean;
}

export const FormImagesProductControl = <T extends FieldValues, K>({
  form,
  name,
  children,
  title,
  description,
  edit,
  productId,
}: FormImagesProductControlProps<T, K>) => {
  const imagesProductStore = useFromStoreImagesProduct(
    useImagesProductStore,
    (state) => state,
  );

  // useEffect(() => {
  //   const currentImages = form.watch(name); // Watch current form images

  //   // Avoid adding default images to the store multiple times
  //   if (currentImages?.length > 0 && imagesProductStore?.images.length === 0) {
  //     currentImages.forEach((img: ProductImage) => {
  //       imagesProductStore?.addImage(img?.imageUrl);
  //     });
  //   }

  //   if (!imagesProductStore?.images.length) return; // Exit if there are no images in the store

  //   if (edit && productId) {
  //     // For edit mode: merge current form images with new images from the store
  //     const newImages = imagesProductStore.images
  //       .filter(
  //         (imgUrl) =>
  //           !currentImages.some((img: any) => img.imageUrl === imgUrl),
  //       ) // Prevent duplicates
  //       .map((imageUrl) => ({
  //         productId,
  //         imageUrl,
  //         imageId: undefined, // Set undefined as it's a new image
  //       }));

  //     // Only update form if there are new images to add
  //     if (newImages.length > 0) {
  //       form.setValue(name, [...currentImages, ...newImages] as PathValue<
  //         T,
  //         Path<T>
  //       >);
  //     }
  //   } else {
  //     // For non-edit mode: only set images if they differ from current form value
  //     if (
  //       JSON.stringify(currentImages) !==
  //       JSON.stringify(imagesProductStore.images)
  //     ) {
  //       form.setValue(name, imagesProductStore.images as PathValue<T, Path<T>>);
  //     }
  //   }
  // }, [imagesProductStore?.images, edit, productId]); // Add other dependencies like 'edit' and 'productId'


  useEffect(() => {
    if (imagesProductStore?.images.length! > 0) {
      form.setValue(name, imagesProductStore?.images as PathValue<T, Path<T>>);
    }
  }, [imagesProductStore?.images]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const errorCondition = fieldState.error?.message;

        // console.log({ formState, fieldState });

        return (
          <FormItem>
            <Card>
              <FormLabel asChild>
                <CardHeader className="space-y-4">
                  <CardTitle
                    className={`${!!errorCondition && "text-rose-700"}`}
                  >
                    {title}
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                  <FormMessage>{fieldState.error?.message}</FormMessage>

                  <ImageUpload />
                </CardHeader>
              </FormLabel>

              <FormControl>
                <CardContent>{children}</CardContent>
              </FormControl>
            </Card>
          </FormItem>
        );
      }}
    />
  );
};
