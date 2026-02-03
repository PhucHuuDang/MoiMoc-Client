"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
// import { motion } from "framer-motion";
import { motion } from "@/lib/motion";

import { notFound, useSearchParams } from "next/navigation";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const iconAnimation = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { type: "spring", stiffness: 200, damping: 10 },
};

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 },
};

export function CancelPaymentClient() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const id = searchParams.get("id");
  const cancel = searchParams.get("cancel");
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");

  console.log(searchParams.get("code"));

  if (!code || !id || !cancel || !status || !orderCode) {
    return notFound();
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-main_background_color">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md overflow-hidden">
          <motion.div {...fadeIn}>
            <CardHeader className="text-center">
              <motion.div {...iconAnimation}>
                <XCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
              </motion.div>
              <CardTitle className="text-3xl font-bold mb-2">
                Hủy thanh toán
              </CardTitle>
              <CardDescription className="text-lg">
                Bạn đã hủy thanh toán thành công
              </CardDescription>
            </CardHeader>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <CardContent className="text-center">
              <span className="text-gray-600">
                Nếu có thắc mắc về sản phẩm hoặc cần hỗ trợ, vui lòng liên hệ
                chúng tôi qua email hoặc số điện thoại
              </span>
            </CardContent>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <CardFooter
              className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4
                mt-4"
            >
              <motion.div whileHover={buttonHover}>
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href="/" className="flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Trở về trang chủ
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={buttonHover}>
                <Button
                  asChild
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600
                    hover:to-blue-700"
                >
                  <Link
                    href="/checkout"
                    className="flex items-center justify-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Thử lại
                  </Link>
                </Button>
              </motion.div>
            </CardFooter>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
