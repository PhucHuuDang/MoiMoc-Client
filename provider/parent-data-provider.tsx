"use client";

import { ProductReturnedTypes } from "@/types/product-types";
import { createContext, use } from "react";

type ProductPromise = Promise<ProductReturnedTypes[] | null>;

type PromiseDataTest<T> = Promise<T[] | null>;

const ParentDataContext = createContext<ProductPromise | null>(null);

export const useParentDataContext = () => {
  let productPromise = use(ParentDataContext);

  if (!productPromise) {
    throw new Error(
      "useParentDataContext must be used within a ParentDataProvider",
    );
  }

  const products = use(productPromise);

  return products;
};

interface ParentDataProviderProps {
  children: React.ReactNode;
  productPromise: ProductPromise;
}

export const ParentDataProvider = ({
  children,
  productPromise,
}: ParentDataProviderProps) => {
  return (
    <ParentDataContext.Provider value={productPromise}>
      {children}
    </ParentDataContext.Provider>
  );
};
