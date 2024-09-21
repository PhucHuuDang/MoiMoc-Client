import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@/lib/config";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `%s | ${config.name}`,
  },
  description: config.description,
  icons: [
    {
      url: "/MOI-MOC-LOGO.svg",
      href: "/MOI-MOC-LOGO.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <Toaster richColors closeButton />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
