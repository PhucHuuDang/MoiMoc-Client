"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Truck,
  DollarSign,
  Package2,
  SunMedium,
  Moon,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeliveryNewMethod } from "./_components-delivery-methods/delivery-new-method";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ActiveDialog } from "./_components-delivery-methods/active-dialog";
import { EditDeliveryMethod } from "./_components-delivery-methods/edit-delivery-method";
import { ConfirmModal } from "@/components/_global-components-reused/confirm-modal";
import axios from "axios";
import { toast } from "sonner";
import DeliveryMethodsSkeleton from "./delivery-skeleton";

type DeliveryMethod = {
  id: number;
  method: string;
  price: number;
  estimatedDays: string;
  active: boolean;
  ordersLastMonth: number;
  revenue: number;
};

export default function DeliveryMethodsClient() {
  const client = useQueryClient();

  const {
    isPending,
    isFetching,
    data: deliveryMethodsData,
    isError,
    error,
  } = useQuery<DeliveryMethod[]>({
    queryKey: ["delivery-methods"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delivery-methods`,
      );
      return response.json();
    },
  });

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>(
    deliveryMethodsData || [],
  );

  const [newMethod, setNewMethod] = useState<Partial<DeliveryMethod>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMethod, setEditingMethod] = useState<DeliveryMethod | null>(
    null,
  );
  const [deletingMethod, setDeletingMethod] = useState<DeliveryMethod | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("method");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleDeleteMethod = () => {
    if (deletingMethod) {
      setDeliveryMethods(
        deliveryMethods.filter((method) => method.id !== deletingMethod.id),
      );
      setDeletingMethod(null);
    }
  };

  const handleEditMethod = () => {
    if (editingMethod) {
      setDeliveryMethods(
        deliveryMethods.map((method) =>
          method.id === editingMethod.id ? editingMethod : method,
        ),
      );
      setEditingMethod(null);
    }
  };

  const handleToggleActive = (id: number) => {
    setDeliveryMethods(
      deliveryMethods.map((method) =>
        method.id === id ? { ...method, active: !method.active } : method,
      ),
    );
  };

  const handleQuickEdit = (
    id: number,
    field: "price" | "estimatedDays",
    value: string,
  ) => {
    setDeliveryMethods(
      deliveryMethods.map((method) =>
        method.id === id
          ? {
              ...method,
              [field]: field === "price" ? parseFloat(value) : value,
            }
          : method,
      ),
    );
  };

  const filteredMethods = deliveryMethodsData
    ?.filter(
      (method) =>
        method.method.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTab === "all" ||
          (activeTab === "active" && method.active) ||
          (activeTab === "inactive" && !method.active)),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.method.localeCompare(b.method);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "orders") return b.ordersLastMonth - a.ordersLastMonth;
      return 0;
    });

  console.log({ filteredMethods });

  const totalRevenue = deliveryMethodsData?.reduce(
    (sum, method) => sum + method.revenue,
    0,
  );
  const totalOrders = deliveryMethodsData?.reduce(
    (sum, method) => sum + method.ordersLastMonth,
    0,
  );
  const activeMethodsCount = deliveryMethodsData?.filter(
    (method) => method.active,
  ).length;

  const onDelete = async (
    deliveryMethodId: number,
  ): Promise<true | undefined> => {
    setIsLoadingDelete(true);

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delivery-methods/${deliveryMethodId}`,
      );

      if (response.status === 200) {
        toast.success("Phương thức vận chuyển đã được xóa thành công");
        client.invalidateQueries({ queryKey: ["delivery-methods"] });
        return true;
      }
    } catch (error) {
      console.error("Lỗi xóa phương thức vận chuyển", error);
      toast.error("Đã xảy ra lỗi khi xóa phương thức vận chuyển");
      return;
    } finally {
      setIsLoadingDelete(false);
    }
  };

  if (isFetching) return <DeliveryMethodsSkeleton />;

  return (
    <div
      className={`container mx-auto p-4 sm:p-6 max-w-7xl ${isDarkMode ? "dark" : ""}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Manage Delivery Methods
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? (
            <SunMedium className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold">
                {totalRevenue?.toLocaleString("vi-VN")} ₫
              </span>
              <span className="text-sm text-muted-foreground">
                Total Revenue
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold">
                {totalOrders}
              </span>
              <span className="text-sm text-muted-foreground">
                Total Orders
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold">
                {activeMethodsCount}
              </span>
              <span className="text-sm text-muted-foreground">
                Active Methods
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0
            sm:space-x-2 w-full sm:w-auto"
        >
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search delivery methods"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="price">Sort by Price</SelectItem>
              <SelectItem value="orders">Sort by Orders</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DeliveryNewMethod />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Methods</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMethods?.map((method) => (
          <Card
            key={method.id}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {method.method}
              </CardTitle>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <EditDeliveryMethod
                      defaultValues={{
                        method: method.method,
                        price: method.price,
                        estimatedDays: method.estimatedDays,
                      }}
                      deliveryMethodId={method.id}
                    />

                    <ConfirmModal
                      action={() => onDelete(method.id)}
                      title="Bạn có chắc chắn muốn xóa phuơng thức này?"
                      description="Nếu đồng ý, phương thức vận chuyển sẽ bị xóa vĩnh viễn!"
                      trigger={
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600 w-full"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Xoá vĩnh viễn
                        </DropdownMenuItem>
                      }
                      isPending={isLoadingDelete}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <div className="text-xl sm:text-2xl font-bold">
                  <Input
                    type="number"
                    value={method.price}
                    onChange={(e) =>
                      handleQuickEdit(method.id, "price", e.target.value)
                    }
                    className="w-32 sm:w-40 inline-block text-lg sm:text-xl"
                  />
                  <span className="ml-1">₫</span>
                </div>

                <ActiveDialog
                  active={method.active}
                  deliveryMethodId={method.id}
                />
              </div>
              <span className="text-sm text-muted-foreground mb-4">
                Ước lượng thời gian giao hàng:
                <Input
                  value={method.estimatedDays}
                  onChange={(e) =>
                    handleQuickEdit(method.id, "estimatedDays", e.target.value)
                  }
                  className="w-12 sm:w-16 inline-block mx-1 text-sm"
                />
                {parseInt(method.estimatedDays) === 1 ? "day" : "days"}
              </span>
              <div className="flex justify-between text-xs sm:text-sm">
                <div>
                  <Truck className="inline-block mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  {method.ordersLastMonth} orders
                </div>
                <div>
                  <DollarSign className="inline-block mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                  {method.revenue && method.revenue.toLocaleString("vi-VN")} ₫
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Badge variant={method.active ? "default" : "secondary"}>
                {method.active ? "Active" : "Inactive"}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
