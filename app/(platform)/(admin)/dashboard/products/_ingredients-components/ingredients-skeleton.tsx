import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export function IngredientsSkeleton() {
  return (
    <div className="w-full mx-auto p-6 space-y-6 bg-red-500">
      <div className="space-y-2">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <Skeleton className="h-10 w-full" />

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />

        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
