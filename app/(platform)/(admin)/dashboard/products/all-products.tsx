"use client";
import { DataTable } from "./data-table-products/data-table";
import { columns } from "./data-table-products/columns";
import {
  ProductReturnedTypes,
  ProductTransformedTypes,
} from "@/types/product-types";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

interface AllProductsProps {
  productsList: ProductTransformedTypes[];
}
export function AllProducts({ productsList }: AllProductsProps) {
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={productsList}
        filterName="productName"
      />
      {/* <DataTableDemo /> */}
    </div>
  );
}
