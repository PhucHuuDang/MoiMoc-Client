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

interface IngredientsClientProps {
  ingredients: IngredientsTypes[];
}
export const IngredientsClient = ({ ingredients }: IngredientsClientProps) => {
  const ingredientModal = useIngredientModal();

  return (
    <>
      <IngredientModal />

      <div className="flex justify-center my-10 min-h-screen">
        <div className="h-auto">
          <Card className="md:w-[500px] lg:w-[700px] min-h-64 max-h-full">
            <CardHeader>
              <CardTitle>Ingredient</CardTitle>
              <CardDescription>Description</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-center">
                <Button
                  variant="moiMoc"
                  className="w-[90%] rounded-xl"
                  onClick={ingredientModal.onOpen}
                >
                  Add Ingredient
                </Button>
              </div>

              <div>
                <DataTable
                  columns={columnsIngredients}
                  data={ingredients}
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
