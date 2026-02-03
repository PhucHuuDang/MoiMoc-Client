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
    founder: {
      "@type": "Person",
      name: "Môi Mộc Team",
    },
    foundingDate: "2020",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Vietnamese"],
    },
    sameAs: [
      // Add your social media URLs here
      "https://www.facebook.com/moimoc",
      "https://www.instagram.com/moimoc",
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
