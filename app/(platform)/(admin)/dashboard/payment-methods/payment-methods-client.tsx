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

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  fee: string;
  active: boolean;
  transactions: number;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    name: "Credit Card",
    type: "card",
    fee: "2.9% + $0.30",
    active: true,
    transactions: 1200,
  },
  {
    id: "2",
    name: "PayPal",
    type: "digital",
    fee: "3.49% + $0.49",
    active: true,
    transactions: 800,
  },
  {
    id: "3",
    name: "Bank Transfer",
    type: "bank",
    fee: "$0.25 fixed",
    active: false,
    transactions: 300,
  },
  {
    id: "4",
    name: "Apple Pay",
    type: "digital",
    fee: "2.9%",
    active: true,
    transactions: 600,
  },
  {
    id: "5",
    name: "Google Pay",
    type: "digital",
    fee: "2.9%",
    active: false,
    transactions: 400,
  },
];

export default function PaymentMethodsClient() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    initialPaymentMethods,
  );
  const [newMethod, setNewMethod] = useState<PaymentMethod>({
    id: "",
    name: "",
    type: "",
    fee: "",
    active: true,
    transactions: 0,
  });
  const [showDialog, setShowDialog] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [confirmAction, setConfirmAction] = useState<{
    action: string;
    id: string;
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const addOrUpdateMethod = () => {
    if (newMethod.id) {
      setPaymentMethods(
        paymentMethods.map((p) =>
          p.id === newMethod.id ? { ...newMethod } : p,
        ),
      );
    } else {
      const newPaymentMethod = {
        ...newMethod,
        id: Date.now().toString(),
      };
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
    }
    setShowDialog(false);
    setNewMethod({
      id: "",
      name: "",
      type: "",
      fee: "",
      active: true,
      transactions: 0,
    });
  };

  const deleteMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    setShowConfirmation(false);
  };

  const toggleStatus = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) =>
        method.id === id ? { ...method, active: !method.active } : method,
      ),
    );
    setShowConfirmation(false);
  };

  const editMethod = (id: string) => {
    const methodToEdit = paymentMethods.find((p) => p.id === id);
    if (methodToEdit) {
      setNewMethod({ ...methodToEdit });
      setShowDialog(true);
    }
  };

  const filteredMethods = paymentMethods.filter(
    (method) =>
      (method.name.toLowerCase().includes(keyword.toLowerCase()) ||
        method.type.toLowerCase().includes(keyword.toLowerCase())) &&
      (filterType === "all" || method.type === filterType),
  );

  const chartData = paymentMethods.map((method) => ({
    name: method.name,
    transactions: method.transactions,
  }));

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
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
                <p>Notifications</p>
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
                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
                  </Dialog>
                </div>
              </div>
              {filteredMethods.length === 0 ? (
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
                      {filteredMethods.map((method) => (
                        <TableRow key={method.id}>
                          <TableCell className="font-medium">
                            {method.name}
                          </TableCell>
                          <TableCell>{method.type}</TableCell>
                          <TableCell>{method.fee}</TableCell>
                          <TableCell>
                            <Badge
                              variant={method.active ? "moiMoc" : "secondary"}
                            >
                              {method.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>{method.transactions}</TableCell>
                          <TableCell>
                            <div className="flex justify-end items-center space-x-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onSelect={() => {
                                      setConfirmAction({
                                        action: method.active
                                          ? "deactivate"
                                          : "activate",
                                        id: method.id,
                                      });
                                      setShowConfirmation(true);
                                    }}
                                  >
                                    {method.active ? "Deactivate" : "Activate"}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={() => editMethod(method.id)}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={() => {
                                      setConfirmAction({
                                        action: "delete",
                                        id: method.id,
                                      });
                                      setShowConfirmation(true);
                                    }}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
                  {paymentMethods.length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Methods
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods.filter((m) => m.active).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Inactive Methods
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {paymentMethods.filter((m) => !m.active).length}
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
                  {paymentMethods.reduce(
                    (sum, method) => sum + method.transactions,
                    0,
                  )}
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
                  <p className="text-sm text-muted-foreground">
                    Allow customers to use multiple payment methods in a single
                    transaction
                  </p>
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
                  <p className="text-sm text-muted-foreground">
                    Automatically activate new payment methods when added
                  </p>
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

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {confirmAction?.action} this payment
              method?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmation(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmAction?.action === "delete") {
                  deleteMethod(confirmAction.id);
                } else if (
                  confirmAction?.action === "deactivate" ||
                  confirmAction?.action === "activate"
                ) {
                  toggleStatus(confirmAction.id);
                }
                setShowConfirmation(false);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
