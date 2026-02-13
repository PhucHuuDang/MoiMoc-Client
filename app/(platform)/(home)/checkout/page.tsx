import { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";
import { SparklesCore } from "@/components/aceternity-ui/sparkles";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Thanh toán - Môi Mộc";
  const description =
    "Hoàn tất đơn hàng của bạn một cách an toàn và nhanh chóng. Hỗ trợ nhiều phương thức thanh toán: COD, PayOS, Stripe. Giao hàng toàn quốc.";
  const url = "https://moimoc.com/checkout";
  const siteName = "Môi Mộc";

  return {
    title,
    description,
    keywords: [
      "thanh toán",
      "checkout",
      "đặt hàng",
      "mua hàng online",
      "thanh toán online",
      "COD",
      "PayOS",
      "Stripe",
      "giao hàng toàn quốc",
      "môi mộc",
    ],
    authors: [{ name: "Môi Mộc" }],
    creator: "Môi Mộc",
    publisher: "Môi Mộc",
    robots: {
      index: false, // Checkout pages should not be indexed
      follow: true,
      nocache: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url,
      title,
      description,
      siteName,
      images: [
        {
          url: "https://moimoc.com/og-checkout.jpg",
          width: 1200,
          height: 630,
          alt: "Thanh toán đơn hàng tại Môi Mộc",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://moimoc.com/og-checkout.jpg"],
      creator: "@moimoc",
    },
    alternates: {
      canonical: url,
    },
    verification: {
      google: "google-site-verification-code",
    },
  };
}

const CheckoutPage = () => {
  // JSON-LD structured data for checkout process
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CheckoutPage",
    name: "Thanh toán đơn hàng",
    description: "Trang thanh toán an toàn cho đơn hàng tại Môi Mộc",
    provider: {
      "@type": "Organization",
      name: "Môi Mộc",
      url: "https://moimoc.com",
      logo: "https://moimoc.com/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+84-xxx-xxx-xxx",
        contactType: "Customer Service",
        areaServed: "VN",
        availableLanguage: "Vietnamese",
      },
    },
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Online Payment"],
    priceRange: "$$",
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div
        className="min-h-screen w-full relative flex flex-col items-center justify-center
          "
      >
        <div className="w-full h-full 2xl:h-screen absolute inset-0 z-0">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={150}
            className="w-full h-full"
            particleColor="#47843c"
          />
        </div>
        <div className="z-10 w-full">
          <CheckoutClient />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
