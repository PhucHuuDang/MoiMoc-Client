"use client";

import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import Spinner from "@/components/animata/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductControllerHeaderProps {
  isSubmitting: boolean;
  title: string;
}
export const ProductControllerHeader = ({
  isSubmitting,
  title,
}: ProductControllerHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Button
        size="icon"
        className="h-7 w-7 bg-primary hover:scale-110 duration-300 cursor-pointer"
        // onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      <h1
        className="flex-1 dark:text-primary shrink-0 whitespace-nowrap text-xl font-semibold
          tracking-tight sm:grow-0"
      >
        {title}
      </h1>
      <Badge
        variant="outline"
        className="ml-auto sm:ml-0 text-primary border border-primary"
      >
        In stock
      </Badge>
      <div className="hidden items-center gap-2 md:ml-auto md:flex dark:text-primary">
        {/* <Button variant="outline" size="sm">
          Discard
        </Button> */}
        {/* <Button size="sm" variant="moiMoc">
          Save Product
        </Button> */}

        <FormSubmit variant="dynamic" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner
                className="size-6 animate-spin"
                outerSize="size-6"
                childSize="size-4"
              />
              <span className="text-white">Đang tạo...</span>
            </>
          ) : (
            "Tạo sản phẩm"
          )}
        </FormSubmit>
      </div>
    </div>
  );
};
