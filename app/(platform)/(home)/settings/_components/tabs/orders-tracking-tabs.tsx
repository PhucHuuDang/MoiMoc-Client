"use client";

import React, { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Search,
  AlertCircle,
  Moon,
  Sun,
  Filter,
  X,
  Calendar as CalendarIcon,
  Scroll,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  format,
  subDays,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  eachDayOfInterval,
} from "date-fns";

import { DateRange } from "react-day-picker";

interface Order {
  id: string;
  date: string;
  total: string;
  status: "processing" | "in_transit" | "delivered";
  items: number;
  estimatedDelivery?: string;
  deliveredDate?: string;
  customer: string;
}

interface DateFilter {
  start: Date | null;
  end: Date | null;
}

interface StatusDetails {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  text: string;
}

const orders: Order[] = [
  {
    id: "ORD001",
    date: "2023-05-01",
    total: "$125.00",
    status: "processing",
    items: 3,
    estimatedDelivery: "2023-05-08",
    customer: "Alice Johnson",
  },
  {
    id: "ORD002",
    date: "2023-05-03",
    total: "$79.99",
    status: "in_transit",
    items: 1,
    estimatedDelivery: "2023-05-10",
    customer: "Bob Smith",
  },
  {
    id: "ORD003",
    date: "2023-05-05",
    total: "$249.50",
    status: "delivered",
    items: 5,
    deliveredDate: "2023-05-12",
    customer: "Charlie Brown",
  },
  {
    id: "ORD004",
    date: "2023-05-07",
    total: "$99.99",
    status: "processing",
    items: 2,
    estimatedDelivery: "2023-05-14",
    customer: "Diana Prince",
  },
  {
    id: "ORD005",
    date: "2023-05-10",
    total: "$189.00",
    status: "in_transit",
    items: 4,
    estimatedDelivery: "2023-05-17",
    customer: "Ethan Hunt",
  },
];

interface OrderTrackingTabsProps {
  value: string;
}

export default function OrderTrackingTabs({
  value,
}: OrderTrackingTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    start: null,
    end: null,
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: null!,
    to: null!,
  });

  const applyDateFilter = (start: Date | null, end: Date | null): void => {
    setDateFilter({ start, end });
    setDateRange({ from: start!, to: end! });
    setIsFilterOpen(false);
  };

  const clearDateFilter = (): void => {
    setDateFilter({ start: null, end: null });
    setDateRange({ from: null!, to: null! });
  };

  const filteredOrders = orders.filter(
    (order) =>
      (activeTab === "all" || order.status === activeTab) &&
      (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.total.includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!dateFilter.start ||
        !dateFilter.end ||
        isWithinInterval(new Date(order.date), {
          start: dateFilter.start,
          end: dateFilter.end,
        })),
  );

  const getStatusDetails = (status: Order["status"]): StatusDetails => {
    switch (status) {
      case "processing":
        return {
          icon: Package,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          text: "Processing",
        };
      case "in_transit":
        return {
          icon: Truck,
          color: "text-yellow-500",
          bgColor: "bg-yellow-100",
          text: "In Transit",
        };
      case "delivered":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-100",
          text: "Delivered",
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          text: "Unknown",
        };
    }
  };

  const StatusBadge: React.FC<{ status: Order["status"] }> = ({ status }) => {
    const { icon: StatusIcon, color, bgColor, text } = getStatusDetails(status);
    return (
      <Badge
        variant="secondary"
        className={`${color} ${bgColor} flex items-center gap-1 px-2 py-1`}
      >
        <StatusIcon className="h-4 w-4" />
        {text}
      </Badge>
    );
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg
        ${isDarkMode ? "bg-gray-800 text-white" : "bg-white"}`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-lg font-semibold">{order.id}</p>
            <p
              className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {order.date}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm">Items: {order.items}</p>
          <p className="text-lg font-semibold">{order.total}</p>
        </div>
        <div
          className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {order.status === "delivered"
            ? `Delivered on ${order.deliveredDate}`
            : `Estimated delivery: ${order.estimatedDelivery}`}
        </div>
        <div className="mt-4">
          <div
            className={`w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2.5 mb-4`}
          >
            <div
              className={`h-2.5 rounded-full ${
                order.status === "processing"
                  ? "w-1/3 bg-blue-500"
                  : order.status === "in_transit"
                    ? "w-2/3 bg-yellow-500"
                    : "w-full bg-green-500"
                } transition-all duration-500 ease-in-out`}
            ></div>
          </div>
          <Button
            variant={isDarkMode ? "outline" : "secondary"}
            size="sm"
            className="w-full"
            onClick={() => setSelectedOrder(order)}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const DateRangePickerWithPresets: React.FC = () => {
    const presets: { label: string; days: number | "month" }[] = [
      { label: "Today", days: 0 },
      { label: "Yesterday", days: 1 },
      { label: "Last 7 days", days: 7 },
      { label: "Last 30 days", days: 30 },
      { label: "This month", days: "month" },
    ];

    return (
      <div
        className={`p-4 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white"}`}
      >
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Label className="mb-2 block">Date Range</Label>
            <Calendar
              mode="range"
              // selected={dateRange}
              // onSelect={(value: DateRange) => setDateRange(value)}
              selected={dateRange as DateRange}
              onSelect={(value?: DateRange) => {
                if (value) setDateRange(value);
              }}
              numberOfMonths={2}
              className={
                isDarkMode
                  ? "bg-gray-800 text-white rounded-md border border-gray-700"
                  : "rounded-md border"
              }
            />
          </div>
          <div className="flex-1">
            <Label className="mb-2 block">Quick Select</Label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  className={`w-full justify-start ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  onClick={() => {
                    const end = new Date();
                    const start =
                      preset.days === "month"
                        ? startOfMonth(end)
                        : subDays(end, preset.days);
                    applyDateFilter(start, end);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        {dateRange?.from && dateRange?.to && (
          <div
            className={`p-4 rounded-md ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} mb-4`}
          >
            <Label className="mb-2 block">Selected Range</Label>
            <div className="flex items-center justify-between">
              <span>{format(dateRange.from, "MMM d, yyyy")}</span>
              <span>to</span>
              <span>{format(dateRange.to, "MMM d, yyyy")}</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${(eachDayOfInterval({ start: dateRange.from, end: dateRange.to }).length / 60) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <Button variant="outline" onClick={clearDateFilter}>
            Clear
          </Button>
          <Button
            onClick={() =>
              applyDateFilter(dateRange?.from as Date, dateRange?.to as Date)
            }
          >
            Apply
          </Button>
        </div>
      </div>
    );
  };

  return (
    <TabsContent value={value}>
      <div
        className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"}
          transition-colors duration-300 rounded-lg`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-center">Order Tracking</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className={isDarkMode ? "bg-gray-800" : ""}>
              <CardContent className="flex flex-col items-center justify-center h-full py-6">
                <p className="text-3xl font-bold text-blue-500 mb-2">
                  {orders.length}
                </p>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  Total Orders
                </p>
              </CardContent>
            </Card>
            <Card className={isDarkMode ? "bg-gray-800" : ""}>
              <CardContent className="flex flex-col items-center justify-center h-full py-6">
                <p className="text-3xl font-bold text-yellow-500 mb-2">
                  {orders.filter((o) => o.status === "in_transit").length}
                </p>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  In Transit
                </p>
              </CardContent>
            </Card>
            <Card className={isDarkMode ? "bg-gray-800" : ""}>
              <CardContent className="flex flex-col items-center justify-center h-full py-6">
                <p className="text-3xl font-bold text-green-500 mb-2">
                  {orders.filter((o) => o.status === "delivered").length}
                </p>
                <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                  Delivered
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search by order ID, total, or customer"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className={isDarkMode ? "bg-gray-800 text-white" : ""}
              />
            </div>
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`${dateFilter.start && dateFilter.end ? "bg-blue-100 text-blue-700" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter.start && dateFilter.end ? (
                    <span>
                      {format(dateFilter.start, "MMM d")} -{" "}
                      {format(dateFilter.end, "MMM d, yyyy")}
                    </span>
                  ) : (
                    "Filter by Date"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DateRangePickerWithPresets />
              </PopoverContent>
            </Popover>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList
              className={`grid w-full grid-cols-4 ${isDarkMode ? "bg-gray-800" : ""}`}
            >
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="in_transit">In Transit</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          {filteredOrders.length === 0 && (
            <div className="flex items-center justify-center mt-8 gap-x-1">
              <Scroll className="size-8" />
              <span className="font-bold text-2xl">No orders found.</span>
            </div>
          )}
        </div>

        <Dialog
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
        >
          <DialogContent
            className={`sm:max-w-[425px] ${isDarkMode ? "bg-gray-800 text-white" : ""}`}
          >
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Order ID</Label>
                  <div className="col-span-3">{selectedOrder.id}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Customer</Label>
                  <div className="col-span-3">{selectedOrder.customer}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Date</Label>
                  <div className="col-span-3">{selectedOrder.date}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Total</Label>
                  <div className="col-span-3">{selectedOrder.total}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <StatusBadge status={selectedOrder.status} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Items</Label>
                  <div className="col-span-3">{selectedOrder.items}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    {selectedOrder.status === "delivered"
                      ? "Delivered"
                      : "Estimated Delivery"}
                  </Label>
                  <div className="col-span-3">
                    {selectedOrder.status === "delivered"
                      ? selectedOrder.deliveredDate
                      : selectedOrder.estimatedDelivery}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TabsContent>
  );
}
