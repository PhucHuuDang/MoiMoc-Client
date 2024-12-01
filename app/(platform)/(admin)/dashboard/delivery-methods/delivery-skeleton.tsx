import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Plus, Search } from "lucide-react";

const SkeletonSummaryCard = () => (
  <Card className="mb-6">
    <CardHeader>
      <Skeleton className="h-6 w-40" />
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SkeletonDeliveryMethodCard = () => (
  <Card className="transition-all duration-300 hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </CardHeader>
    <CardContent>
      <div className="flex justify-between items-center mb-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-6 w-10" />
      </div>
      <Skeleton className="h-4 w-full mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </CardContent>
    <CardFooter>
      <Skeleton className="h-6 w-16" />
    </CardFooter>
  </Card>
);

export default function DeliveryMethodsSkeleton() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <SkeletonSummaryCard />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0
            sm:space-x-2 w-full sm:w-auto"
        >
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 w-full sm:w-[300px]" />
          </div>
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add New Method
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">
            <Skeleton className="h-5 w-24" />
          </TabsTrigger>
          <TabsTrigger value="active">
            <Skeleton className="h-5 w-24" />
          </TabsTrigger>
          <TabsTrigger value="inactive">
            <Skeleton className="h-5 w-24" />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonDeliveryMethodCard key={i} />
        ))}
      </div>
    </div>
  );
}
