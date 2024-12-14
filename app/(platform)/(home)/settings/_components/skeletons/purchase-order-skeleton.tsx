export function PurchaseOrderSkeleton() {
  return (
    <div className="p-6 space-y-6 border rounded-lg">
      {/* Order header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="h-5 w-20 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* Order status timeline */}
      <div className="flex justify-center items-center gap-2 py-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            <div className="h-3 w-16 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b">
        {["Products", "Summary", "Details"].map((tab, i) => (
          <div
            key={i}
            className="h-4 w-20 bg-gray-200 animate-pulse rounded mb-2"
          />
        ))}
      </div>

      {/* Cost breakdown */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-16 bg-gray-200 animate-pulse rounded" />
          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between pt-4">
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  );
}
