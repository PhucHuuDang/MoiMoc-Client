import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@/lib/config";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/provider/auth-provider";
import { verifyAuth } from "@/api/auth/verify-auth";
import { ParentDataProvider } from "@/provider/parent-data-provider";
import { productsList } from "@/api/product-data/products-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `%s`,
  },
  description: config.description,

  icons: {
    icon: "/favicon-moi-moc.ico", // Favicon for all browsers

    apple: "/apple-touch-icon.png", // Apple-specific icon
  },
  openGraph: config.openGraph,
  twitter: config.twitter,
  alternates: config.alternates,
  robots: config.robots,
  metadataBase: config.metadataBase,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = verifyAuth();

  const productsPromise = productsList();

  return (
    <html suppressHydrationWarning lang="vi">
      <ParentDataProvider productPromise={productsPromise}>
        <AuthProvider authPromise={auth}>
          <Toaster richColors closeButton />
          <body className={inter.className}>{children}</body>
        </AuthProvider>
      </ParentDataProvider>
    </html>
  );
}
