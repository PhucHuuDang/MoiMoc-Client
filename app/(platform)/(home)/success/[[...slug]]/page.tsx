"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CheckCircle, Download, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  notFound,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useSearchParam } from "react-use";
import { useCartStore } from "@/store/use-cart-store";

export default function EnhancedPaymentSuccess({
  params,
}: {
  params: { slug: string };
}) {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const id = searchParams.get("id");
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");

  const clearCart = useCartStore((state) => state.clearCart);

  console.log(searchParams.get("code"));

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    clearCart();
    setShowConfetti(true);
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!code || !id || !cancel || !status || !orderCode) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-20">
      <Card className="w-full max-w-lg bg-white/90 backdrop-blur-sm shadow-2xl overflow-auto">
        <CardHeader className="text-center relative">
          <div
            className="mx-auto my-4 bg-green-100 flex item-center justify-center text-green-600
              rounded-full p-2 w-16 h-16 items-center"
          >
            <Check className="w-10 h-10" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800 mt-8">
            Thanh toán thành công
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <span className="text-gray-600 text-lg">
            Cảm ơn bạn đã tin tưởng và quan tâm mua hàng tại MoiMoc!
          </span>
          <div className="flex justify-center space-x-4 items-start">
            {/* <img
              src="/placeholder.svg?height=100&width=100"
              alt="Product"
              className="rounded-lg shadow-md"
            /> */}
            <div className="bg-gray-50 p-4 rounded-lg text-left flex-1">
              <h3 className="font-semibold text-gray-700 mb-2">
                Chi tiết đơn hàng
              </h3>
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm text-gray-600">
                  Mã đơn hàng:{" "}
                  <span className="font-bold text-moi_moc_green">
                    {searchParams.get("orderCode")}
                  </span>
                </span>
                {/* <span className="text-sm text-gray-600">
                  Date: <span className="font-medium">May 15, 2023</span>
                </span>
                <span className="text-sm text-gray-600">
                  Total: <span className="font-medium">$99.99</span>
                </span> */}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
            <div className="bg-green-500 h-1.5 rounded-full dark:bg-green-500 w-full"></div>
          </div>
          <span className="text-sm text-gray-500">
            Your order will be shipped within 2-3 business days.
          </span>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-300">
            <Download className="mr-2 h-4 w-4" /> Download Receipt
          </Button>
          <div className="flex space-x-4 w-full">
            <Button
              variant="outline"
              className="w-full hover:bg-gray-100 transition-colors duration-300"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" /> Home
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full hover:bg-gray-100 transition-colors duration-300"
              asChild
            >
              <Link href="/orders">
                <ShoppingBag className="mr-2 h-4 w-4" /> My Orders
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
      {showConfetti && <div className="fixed inset-0 pointer-events-none" />}
    </div>
  );
}
