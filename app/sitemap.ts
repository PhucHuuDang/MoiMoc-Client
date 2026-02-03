import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://moimoc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all products
  let products: any[] = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      },
    );
    if (response.ok) {
      products = await response.json();
    }
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Static pages
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about-moi-moc`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/checkout`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic product pages
  const productPages = products.map((product) => ({
    url: `${SITE_URL}/${product.id}`,
    lastModified: new Date(
      product.updatedAt || product.createdAt || Date.now(),
    ),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
