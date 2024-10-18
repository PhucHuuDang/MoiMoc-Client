"use client";

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  CreditCard,
  Trash2,
  Plus,
  DollarSign,
  Settings,
  Search,
  AlertCircle,
  BarChart,
  Bell,
  Menu,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BarChart as BarChartComponent,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddPaymentMethod } from "./_components-payments-methods/add-payment-methods";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PaymentMethodsSkeleton from "./payment-skeleton";
import { ActionsControl } from "@/components/_global-components-reused/actions-control";
import { EditPaymentMethod } from "./_components-payments-methods/edit.payment-method";
import { ConfirmModal } from "@/components/_global-components-reused/confirm-modal";
import axios from "axios";
import { toast } from "sonner";
import { ToggleStatusPayment } from "./_components-payments-methods/toggle-status-payment";
import { capitalize } from "lodash";

interface PaymentMethod {
  id: number;
  method: string;
  type: string;
  fee: string;
  status: boolean;
  transaction: number;
}

export default function PaymentMethodsClient() {
  const client = useQueryClient();

  const {
    isFetching,
    isLoading,
    data: paymentMethods,
  } = useQuery<PaymentMethod[]>({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment-methods`,
      );
      return response.json();
    },
  });

  const [keyword, setKeyword] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const deleteMethod = async (id: number) => {
    setIsLoadingDelete(true);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/payment-methods/${id}`,
      );
      if (response.status === 200) {
        toast.success("Phương thức thanh toán đã được xóa thành công");
        client.invalidateQueries({ queryKey: ["payment-methods"] });
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa phương thức thanh toán");
      console.error({ error });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const filteredMethods = paymentMethods?.filter(
    (method) =>
      (method.method.toLowerCase().includes(keyword.toLowerCase()) ||
        method.type.toLowerCase().includes(keyword.toLowerCase())) &&
      (filterType === "all" || method.type === filterType),
  );

  // Todo: Chart Data
  const chartData = paymentMethods?.map((method) => ({
    method: method.method,
    transactions: method.transaction,
  }));

  if (isFetching || isLoading) return <PaymentMethodsSkeleton />;

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          Payment Methods Management
        </h1>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Notifications</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs defaultValue="methods" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="methods">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <CreditCard className="mr-2 h-6 w-6 text-primary" />
                Available Payment Methods
              </CardTitle>
              <CardDescription>
                Manage and configure payment options for customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4
                  sm:space-y-0 sm:space-x-4 mb-6"
              >
                <div className="flex items-center space-x-2 w-full max-w-md">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search payment methods..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="pl-10 pr-4 w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                    </SelectContent>
                  </Select>
                  <AddPaymentMethod />
                  {/* <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          {newMethod.id
                            ? "Edit Payment Method"
                            : "Add New Payment Method"}
                        </DialogTitle>
                        <DialogDescription>
                          Enter the details of the payment method for customers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={newMethod.name}
                            onChange={(e) =>
                              setNewMethod({
                                ...newMethod,
                                name: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right">
                            Type
                          </Label>
                          <Select
                            value={newMethod.type}
                            onValueChange={(value) =>
                              setNewMethod({ ...newMethod, type: value })
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">Card</SelectItem>
                              <SelectItem value="digital">Digital</SelectItem>
                              <SelectItem value="bank">Bank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="fee" className="text-right">
                            Fee
                          </Label>
                          <Input
                            id="fee"
                            value={newMethod.fee}
                            onChange={(e) =>
                              setNewMethod({
                                ...newMethod,
                                fee: e.target.value,
                              })
                            }
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={addOrUpdateMethod}>
                          {newMethod.id ? "Update Method" : "Add Method"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog> */}
                </div>
              </div>
              {filteredMethods?.length === 0 ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No results found</AlertTitle>
                  <AlertDescription>
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Fee</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMethods?.map((method) => (
                        <TableRow key={method.id}>
                          <TableCell className="font-medium text-primary">
                            {method.method}
                          </TableCell>
                          <TableCell>{capitalize(method.type)}</TableCell>
                          <TableCell>{method.fee}</TableCell>
                          <TableCell>
                            <Badge
                              variant={method.status ? "moiMoc" : "secondary"}
                            >
                              {method.status ? "Hoạt động" : "Không hoạt động"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {method.transaction ?? "loading..."}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end items-center space-x-2">
                              <ActionsControl>
                                <ToggleStatusPayment
                                  paymentMethodId={method.id}
                                  status={method.status}
                                />

                                <EditPaymentMethod
                                  paymentMethodId={method.id}
                                  defaultValues={{
                                    method: method.method,
                                    type: method.type,
                                    fee: method.fee,
                                  }}
                                />

                                <ConfirmModal
                                  action={() => deleteMethod(method.id)}
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
                              </ActionsControl>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Todo: Chart Data UI in here */}
        <TabsContent value="statistics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Methods
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods?.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  status Methods
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods?.filter((m) => m.status).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Active Methods
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods?.filter((m) => !m.status).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transactions
                </CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {/* {paymentMethods?.reduce(
                    (sum, method) => sum + method.transactions,
                    0,
                  )} */}
                  12
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Transaction Volume by Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChartComponent data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="transactions" fill="#8884d8" />
                </BarChartComponent>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <Settings className="mr-2 h-6 w-6 text-primary" />
                General Settings
              </CardTitle>
              <CardDescription>
                Configure general payment settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Allow Multiple Payment Methods
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    Allow customers to use multiple payment methods in a single
                    transaction
                  </span>
                </div>
                <Switch
                  defaultChecked
                  aria-label="Allow multiple payment methods"
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Auto-activate New Payment Methods
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    Automatically activate new payment methods when added
                  </span>
                </div>
                <Switch aria-label="Auto-activate new payment methods" />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="default-currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="default-currency">
                    <SelectValue placeholder="Select default currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="notification-options">
                  Notification Options
                </Label>
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="new-method" />
                      <label
                        htmlFor="new-method"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                          peer-disabled:opacity-70"
                      >
                        New payment method added
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="method-status" />
                      <label
                        htmlFor="method-status"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                          peer-disabled:opacity-70"
                      >
                        Payment method status change
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="high-volume" />
                      <label
                        htmlFor="high-volume"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                          peer-disabled:opacity-70"
                      >
                        High transaction volume alert
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="security" />
                      <label
                        htmlFor="security"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
                          peer-disabled:opacity-70"
                      >
                        Security and fraud alerts
                      </label>
                    </div>
                  </div>
                </ScrollArea>
              </div>
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
