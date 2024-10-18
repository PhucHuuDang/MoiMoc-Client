import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProductCUSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48 bg-zinc-800" />
        <Skeleton className="h-10 w-32 bg-zinc-800" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-zinc-800" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-zinc-800" />
                  <Skeleton className="h-10 w-full bg-zinc-800" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-zinc-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-zinc-800" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-full bg-zinc-800" />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full bg-zinc-800" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-zinc-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-zinc-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-zinc-800" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-40 w-full bg-zinc-800 mb-4" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square bg-zinc-800" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
