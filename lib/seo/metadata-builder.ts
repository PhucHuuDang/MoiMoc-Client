import { Metadata } from "next";

const SITE_NAME = "Môi Mộc";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://moimoc.com";
const DEFAULT_LOCALE = "vi_VN";

export interface MetadataBuilderOptions {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  locale?: string;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  openGraph?: {
    siteName?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    card?: "summary" | "summary_large_image" | "app" | "player";
    site?: string;
    creator?: string;
  };
}

/**
 * Build comprehensive metadata for Next.js pages
 */
export function buildMetadata(options: MetadataBuilderOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    url,
    type = "website",
    locale = DEFAULT_LOCALE,
    alternates,
    openGraph,
    twitter,
  } = options;

  const fullTitle = `${title} | ${SITE_NAME}`;
  const ogImage = image || `${SITE_URL}/og-default.png`;
  const pageUrl = url || SITE_URL;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: alternates?.canonical || pageUrl,
      languages: alternates?.languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: openGraph?.siteName || SITE_NAME,
      locale,
      type: type === "product" ? "website" : type,
      images: openGraph?.images || [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitter?.card || "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      site: twitter?.site,
      creator: twitter?.creator,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Build product-specific metadata
 */
export interface ProductMetadataOptions {
  productName: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category?: string;
  productId: string | number;
  inStock?: boolean;
}

export function buildProductMetadata(
  options: ProductMetadataOptions,
): Metadata {
  const {
    productName,
    description,
    price,
    discountPrice,
    images,
    category,
    productId,
    inStock = true,
  } = options;

  const priceText = discountPrice
    ? `${discountPrice.toLocaleString("vi-VN")}₫ (giảm từ ${price.toLocaleString("vi-VN")}₫)`
    : `${price.toLocaleString("vi-VN")}₫`;

  const enhancedDescription = `${description} | Giá: ${priceText} | ${inStock ? "Còn hàng" : "Hết hàng"}${category ? ` | Danh mục: ${category}` : ""}`;

  return buildMetadata({
    title: productName,
    description: enhancedDescription,
    keywords: [
      productName,
      "son môi",
      "mỹ phẩm thiên nhiên",
      "son organic",
      "Môi Mộc",
      ...(category ? [category] : []),
    ],
    image: images[0],
    url: `${SITE_URL}/product/${productId}`,
    type: "product",
    openGraph: {
      images: images.slice(0, 4).map((img) => ({
        url: img,
        width: 800,
        height: 800,
        alt: productName,
      })),
    },
  });
}

/**
 * Build page metadata for products listing
 */
export function buildProductsPageMetadata(): Metadata {
  return buildMetadata({
    title: "Sản phẩm",
    description:
      "Khám phá bộ sưu tập son môi từ thiên nhiên của Môi Mộc. Sản phẩm 100% hữu cơ, an toàn cho môi, nuôi dưỡng và bảo vệ đôi môi bạn.",
    keywords: [
      "sản phẩm Môi Mộc",
      "son môi thiên nhiên",
      "son organic",
      "mỹ phẩm hữu cơ",
      "son dưỡng môi",
    ],
    url: `${SITE_URL}/products`,
  });
}

/**
 * Build metadata for about page
 */
export function buildAboutPageMetadata(): Metadata {
  return buildMetadata({
    title: "Về Môi Mộc",
    description:
      "Câu chuyện thương hiệu Môi Mộc - Mang vẻ đẹp tự nhiên từ thiên nhiên Việt Nam. Tìm hiểu về tầm nhìn, sứ mệnh và hành trình của chúng tôi.",
    keywords: [
      "Môi Mộc",
      "về chúng tôi",
      "thương hiệu Việt",
      "mỹ phẩm thiên nhiên",
      "câu chuyện thương hiệu",
    ],
    url: `${SITE_URL}/about-moi-moc`,
  });
}
