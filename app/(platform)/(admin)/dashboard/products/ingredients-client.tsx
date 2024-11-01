"use client";

import { IngredientModal } from "@/components/modal/ingredient-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIngredientModal } from "@/hooks/use-ingredient-modal";
import { ListX } from "lucide-react";
import { IngredientsTypes } from "./types-data-fetch/product-return-types";
import { DataTable } from "./data-table-products/data-table";
import { columnsIngredients } from "./_ingredients-components/column-ingredients";
import { serverFetching } from "@/api/actions/server-fetching";
import { useQuery } from "@tanstack/react-query";
import { IngredientsSkeleton } from "./_ingredients-components/ingredients-skeleton";

interface IngredientsClientProps {
  ingredients: IngredientsTypes[];
}
export const IngredientsClient = ({ ingredients }: IngredientsClientProps) => {
  const ingredientModal = useIngredientModal();

  const {
    data: ingredientsList,
    isFetching,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const data = await serverFetching(`/ingredients`);

      return data;
    },

    initialData: ingredients,
    refetchOnMount: false,
  });

  if (isLoading) return <IngredientsSkeleton />;

  return (
    <>
      <IngredientModal />

      <div className="my-10 min-h-screen">
        <div className="h-auto flex items-center justify-center">
          <Card className="md:w-[500px] lg:w-[90%] min-h-64 max-h-full">
            <CardHeader>
              <CardTitle>Ingredient</CardTitle>
              <CardDescription>
                List of ingredients used in the products
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-start">
                <Button
                  variant="outline"
                  // variant={}
                  className="w-52 rounded-xl bg-transparent border border-dashed text-primary
                    border-primary/75 transition hover:scale-105 duration-300"
                  onClick={ingredientModal.onOpen}
                >
                  Add Ingredient
                </Button>
              </div>

              <div>
                <DataTable
                  columns={columnsIngredients}
                  data={ingredientsList}
                  filterName="ingredient"
                />
              </div>

              {/* <div className="flex items-center justify-center gap-1 my-10 text-sm font-bold">
                <ListX className="size-6 text-primary" />
                Empty ingredient list!
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
