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

type DeliveryMethod = {
  id: number;
  name: string;
  price: number;
  estimatedDays: string;
  active: boolean;
  ordersLastMonth: number;
  revenue: number;
};

export default function DeliveryMethodsClient() {
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([
    {
      id: 1,
      name: "Standard Shipping",
      price: 137770,
      estimatedDays: "3-5",
      active: true,
      ordersLastMonth: 1200,
      revenue: 165324000,
    },
    {
      id: 2,
      name: "Express Shipping",
      price: 344770,
      estimatedDays: "1-2",
      active: true,
      ordersLastMonth: 800,
      revenue: 275816000,
    },
    {
      id: 3,
      name: "Same Day Delivery",
      price: 689770,
      estimatedDays: "0",
      active: false,
      ordersLastMonth: 150,
      revenue: 103465500,
    },
    {
      id: 4,
      name: "International Shipping",
      price: 574770,
      estimatedDays: "5-10",
      active: true,
      ordersLastMonth: 300,
      revenue: 172431000,
    },
    {
      id: 5,
      name: "Economy Shipping",
      price: 91770,
      estimatedDays: "7-10",
      active: true,
      ordersLastMonth: 500,
      revenue: 45885000,
    },
  ]);

  const [newMethod, setNewMethod] = useState<Partial<DeliveryMethod>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMethod, setEditingMethod] = useState<DeliveryMethod | null>(
    null,
  );
  const [deletingMethod, setDeletingMethod] = useState<DeliveryMethod | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleAddMethod = () => {
    if (newMethod.name && newMethod.price && newMethod.estimatedDays) {
      setDeliveryMethods([
        ...deliveryMethods,
        {
          ...newMethod,
          id: Date.now(),
          active: true,
          ordersLastMonth: 0,
          revenue: 0,
        } as DeliveryMethod,
      ]);
      setNewMethod({});
    }
  };

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

  const filteredMethods = deliveryMethods
    .filter(
      (method) =>
        method.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeTab === "all" ||
          (activeTab === "active" && method.active) ||
          (activeTab === "inactive" && !method.active)),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "orders") return b.ordersLastMonth - a.ordersLastMonth;
      return 0;
    });

  const totalRevenue = deliveryMethods.reduce(
    (sum, method) => sum + method.revenue,
    0,
  );
  const totalOrders = deliveryMethods.reduce(
    (sum, method) => sum + method.ordersLastMonth,
    0,
  );
  const activeMethodsCount = deliveryMethods.filter(
    (method) => method.active,
  ).length;

  return (
    <div
      className={`container mx-auto p-4 sm:p-6 max-w-7xl ${isDarkMode ? "dark" : ""}`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
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
                {totalRevenue.toLocaleString("vi-VN")} ₫
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Delivery Method</DialogTitle>
              <DialogDescription>
                Create a new delivery method for your store.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newMethod.name || ""}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (₫)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newMethod.price || ""}
                  onChange={(e) =>
                    setNewMethod({
                      ...newMethod,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="days" className="text-right">
                  Est. Days
                </Label>
                <Input
                  id="days"
                  value={newMethod.estimatedDays || ""}
                  onChange={(e) =>
                    setNewMethod({
                      ...newMethod,
                      estimatedDays: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddMethod}>
                Add Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Methods</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMethods.map((method) => (
          <Card
            key={method.id}
            className="transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {method.name}
              </CardTitle>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Delivery Method</DialogTitle>
                          <DialogDescription>
                            Make changes to the delivery method.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={method.name}
                              onChange={(e) =>
                                setEditingMethod({
                                  ...method,
                                  name: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-price" className="text-right">
                              Price (₫)
                            </Label>
                            <Input
                              id="edit-price"
                              type="number"
                              value={method.price}
                              onChange={(e) =>
                                setEditingMethod({
                                  ...method,
                                  price: parseFloat(e.target.value),
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-days" className="text-right">
                              Est. Days
                            </Label>
                            <Input
                              id="edit-days"
                              value={method.estimatedDays}
                              onChange={(e) =>
                                setEditingMethod({
                                  ...method,
                                  estimatedDays: e.target.value,
                                })
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={handleEditMethod}>
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the delivery method "{method.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              setDeletingMethod(method);
                              handleDeleteMethod();
                            }}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
                <Switch
                  checked={method.active}
                  onCheckedChange={() => handleToggleActive(method.id)}
                />
              </div>
              <span className="text-sm text-muted-foreground mb-4">
                Estimated delivery time:
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
                  {method.revenue.toLocaleString("vi-VN")} ₫
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
