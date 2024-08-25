"use client";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ArchiveProduct = () => {
  return (
    <Card x-chunk="dashboard-07-chunk-5">
      <CardHeader>
        <CardTitle>Archive Product</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <div></div> */}
        <FormSubmit variant="moiMoc">Archive Product</FormSubmit>
      </CardContent>
    </Card>
  );
};
