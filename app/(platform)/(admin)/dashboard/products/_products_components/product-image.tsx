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
import { Upload } from "lucide-react";
import Image from "next/image";

export const ProductImage = () => {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Add more product images to showcase your product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src="/placeholder.svg"
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/placeholder.svg"
                width="84"
              />
            </div>

            <div>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/placeholder.svg"
                width="84"
              />
            </div>
            {/* <div
              className="flex aspect-square w-full items-center justify-center rounded-md border
                border-dashed"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </div> */}

            <ImageUpload />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
