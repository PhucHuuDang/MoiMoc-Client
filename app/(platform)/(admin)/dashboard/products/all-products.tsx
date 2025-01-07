"use client";
import { DataTable } from "./data-table-products/data-table";
import { columns } from "./data-table-products/columns";

import { Skeleton } from "@/components/ui/skeleton";

import {
  ProductReturnedTypes,
  ProductTransformedTypes,
} from "@/types/product-types";
import { useQuery } from "@tanstack/react-query";
import { serverFetching } from "@/api/actions/server-fetching";

interface AllProductsProps {
  // productsList: ProductTransformedTypes[];
  productsList: ProductReturnedTypes[];
}
export function AllProducts({ productsList }: AllProductsProps) {
  const {
    data: products,
    isFetching,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await serverFetching(`/products`);

      return data;
    },

    initialData: productsList,
    refetchOnMount: false,
  });


  const productTransformed: ProductTransformedTypes[] = products?.map(
    (product: ProductReturnedTypes) => {
      return {
        id: product.productId,
        productName: product.productName,
        image: product.productImages[0].imageUrl,
        price: product.price,
        discountPercentage: product.discountPercentage,
        discountPrice: product.discountPrice,
        quantity: product.quantity,
        createdAt: product.createdAt,
        productType: product.productType.type,
      };
    },
  );

  if (isLoading) {
    return <AllProductsSkelton />;
  }

  return (
    <div className="mx-auto md:w-[500px] lg:w-[90%] min-h-64 py-10">
      <DataTable
        columns={columns}
        data={productTransformed}
        filterName="productName"
      />
    </div>
  );
}

export function AllProductsSkelton() {
  return (
    <div className="w-full space-y-4 bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Skeleton className="h-10 w-full bg-gray-800" />
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Skeleton className="h-5 w-5 bg-gray-700" />
          </div>
        </div>
        <Skeleton className="h-10 w-24 bg-gray-800" />
      </div>
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-800 p-4">
          <div className="grid grid-cols-8 gap-4 items-center">
            <Skeleton className="h-5 w-5 bg-gray-700" />
            <Skeleton className="h-6 w-6 bg-gray-700" />
            <Skeleton className="h-6 w-full bg-gray-700 col-span-2" />
            <Skeleton className="h-6 w-full bg-gray-700" />
            <Skeleton className="h-6 w-full bg-gray-700" />
            <Skeleton className="h-6 w-full bg-gray-700" />
            <Skeleton className="h-6 w-full bg-gray-700" />
          </div>
        </div>
        <div className="divide-y divide-gray-800">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-900 p-4">
              <div className="grid grid-cols-8 gap-4 items-center">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 bg-gray-800" />
                  <Skeleton className="h-14 w-14 rounded-lg bg-gray-800" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Skeleton className="h-4 w-full bg-gray-800" />
                  <Skeleton className="h-4 w-3/4 bg-gray-800" />
                </div>
                <Skeleton className="h-4 w-20 bg-gray-800" />
                <Skeleton className="h-4 w-16 bg-gray-800" />
                <Skeleton className="h-4 w-16 bg-gray-800" />
                <Skeleton className="h-4 w-16 bg-gray-800" />
                <Skeleton className="h-4 w-24 bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-400">
        <Skeleton className="h-6 w-40 bg-gray-800" />
        <div className="space-x-2">
          <Skeleton className="h-10 w-24 inline-block bg-gray-800" />
          <Skeleton className="h-10 w-24 inline-block bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
