import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * JSON-LD component for structured data
 * Renders schema.org structured data for SEO
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id={`json-ld-${data["@type"]?.toLowerCase() || "default"}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
      strategy="beforeInteractive"
    />
  );
}

/**
 * Product schema for individual product pages
 */
export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string[];
  sku?: string;
  brand?: string;
  offers: {
    price: number;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function generateProductSchema(
  product: ProductSchemaProps,
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: product.brand || "Môi Mộc",
    },
    offers: {
      "@type": "Offer",
      price: product.offers.price,
      priceCurrency: product.offers.priceCurrency,
      availability: product.offers.availability,
      url: product.offers.url,
    },
    ...(product.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.aggregateRating.ratingValue,
        reviewCount: product.aggregateRating.reviewCount,
      },
    }),
  };
}

/**
 * Organization schema for about page
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Môi Mộc",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://moimoc.com",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://moimoc.com"}/logo.png`,
    description:
      "Môi Mộc - Thương hiệu mỹ phẩm thiên nhiên Việt Nam, chuyên sản phẩm son môi từ nguyên liệu hữu cơ",
    slogan: "Từ thiên nhiên, cho vẻ đẹp tự nhiên",
    founder: {
      "@type": "Person",
      name: "Môi Mộc Team",
    },
    foundingDate: "2020",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Vietnamese", "vi"],
    },
    sameAs: [
      // Add your social media URLs here
      "https://www.facebook.com/moimoc",
      "https://www.instagram.com/moimoc",
    ],
  };
}

/**
 * AboutPage schema for the about page
 */
export function generateAboutPageSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moimoc.com";

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Về Môi Mộc - Câu chuyện thương hiệu",
    description:
      "Khám phá câu chuyện thương hiệu Môi Mộc - tiên phong trong sản xuất son môi từ thiên nhiên Việt Nam",
    url: `${siteUrl}/about-moi-moc`,
    mainEntity: {
      "@type": "Organization",
      name: "Môi Mộc",
      description:
        "Thương hiệu mỹ phẩm thiên nhiên Việt Nam chuyên sản xuất son môi từ nguyên liệu hữu cơ",
    },
    inLanguage: "vi",
  };
}

/**
 * FAQ schema for common questions about Môi Mộc
 */
export function generateAboutFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Môi Mộc sử dụng nguyên liệu gì?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Môi Mộc sử dụng các nguyên liệu thiên nhiên 100% từ Việt Nam như quả gấc, dầu dừa, dầu oliu, sáp ong, và hoa hồng. Tất cả đều là nguyên liệu hữu cơ, an toàn cho môi.",
        },
      },
      {
        "@type": "Question",
        name: "Tầm nhìn của Môi Mộc là gì?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Môi Mộc hướng đến việc trở thành niềm tự hào của người Việt trên thị trường mỹ phẩm quốc tế, xây dựng thương hiệu mỹ phẩm Việt hữu cơ sạch, an toàn và chất lượng.",
        },
      },
      {
        "@type": "Question",
        name: "Sứ mệnh của Môi Mộc là gì?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mang lại cho bạn một đời sống đẹp, an toàn và lành mạnh với những sản phẩm từ thiên nhiên Việt Nam, phù hợp với làn da người Việt.",
        },
      },
    ],
  };
}

/**
 * BreadcrumbList schema
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * ItemList schema for product listings
 */
export interface ProductListItem {
  name: string;
  url: string;
  image: string;
  description: string;
  price: number;
}

export function generateProductListSchema(
  products: ProductListItem[],
): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        url: product.url,
        image: product.image,
        description: product.description,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "VND",
        },
      },
    })),
  };
}
