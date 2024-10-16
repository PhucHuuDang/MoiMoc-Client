import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bell, Plus } from "lucide-react";

const SkeletonTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
        <TableHead>
          <Skeleton className="h-4 w-20" />
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-12" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-8 w-8 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const SkeletonCard = () => (
  <Card>
    <CardHeader className="space-y-2">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-48 w-full" />
    </CardContent>
  </Card>
);

export default function PaymentMethodsSkeleton() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="methods">
            <Skeleton className="h-5 w-32" />
          </TabsTrigger>
          <TabsTrigger value="statistics">
            <Skeleton className="h-5 w-32" />
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Skeleton className="h-5 w-32" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="w-full max-w-sm">
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>

              <SkeletonTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <Card className="mt-6">
            <CardHeader>
              <Skeleton className="h-6 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
