import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export function ProductDetailSkelton() {
  return (
    // <div className="mx-auto px-4 py-20">
    <div className="min-h-screen container bg-main_background_color py-20">
      <Skeleton className="w-full h-4 mb-4" />
      {/* Top banner */}

      {/* Breadcrumb Skeleton */}
      <div className="flex items-center space-x-2 mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Skeleton */}
        <div className="space-y-4">
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="flex space-x-2 overflow-x-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-20 h-20 rounded-md flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4" />
            ))}
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-6 w-1/3" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="flex space-x-4">
            <Button size="lg" className="flex-1" disabled>
              <ShoppingCart className="mr-2 h-4 w-4" /> Thêm vào giỏ hàng
            </Button>
            <Button size="lg" variant="outline" disabled>
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <Skeleton className="h-6 w-40" />

          <div className="flex flex-col space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>

      {/* Product Description Tabs Skeleton */}
      <Card className="mt-8">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details" className="flex-1">
              Chi tiết sản phẩm
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              Đánh giá & Nhận xét
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex-1">
              Thảo luận
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4 space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </TabsContent>
          <TabsContent value="reviews" className="mt-4 space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </TabsContent>
          <TabsContent value="discussion" className="mt-4 space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Related Products Skeleton */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full aspect-square" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-2/3" />
                  <Button size="sm" className="w-full" disabled>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <footer className="mt-16 border-t pt-8">
        {/* LOGO */}
        <Skeleton className="h-[150px] w-[401px] mx-auto mb-8 rounded-lg" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
        <Skeleton className="h-8 w-32 mb-4 md:mb-0" />
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  );
}
