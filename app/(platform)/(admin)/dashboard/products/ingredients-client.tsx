"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const IngredientsClient = () => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Ingredient</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-center">
            <div>Ingredients</div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-lg font-semibold">Ingredient 1</h4>
              <p className="text-sm text-gray-500">Description</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-lg font-semibold">Ingredient 2</h4>
              <p className="text-sm text-gray-500">Description</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h4 className="text-lg font-semibold">Ingredient 3</h4>
              <p className="text-sm text-gray-500">Description</p>
            </div>
          </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
