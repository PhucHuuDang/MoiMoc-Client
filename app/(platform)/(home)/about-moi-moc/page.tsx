import { Footer } from "@/components/_global-components-reused/footer";
import AboutMoiMocClient from "./about-moi-moc-client";
import {
  JsonLd,
  generateOrganizationSchema,
  generateAboutPageSchema,
  generateAboutFAQSchema,
  generateBreadcrumbSchema,
} from "@/components/seo/json-ld";
import { buildAboutPageMetadata } from "@/lib/seo/metadata-builder";

import type { Metadata, Viewport } from "next";

// ISR: Revalidate every 1 hour for about page content
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildAboutPageMetadata();
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const AboutMoiMocPage = () => {
  const organizationSchema = generateOrganizationSchema();
  const aboutPageSchema = generateAboutPageSchema();
  const faqSchema = generateAboutFAQSchema();

  // Breadcrumb navigation for SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    {
      name: "Trang chủ",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://moimoc.com",
    },
    {
      name: "Về Môi Mộc",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://moimoc.com"}/about-moi-moc`,
    },
  ]);

  return (
    <>
      {/* Multiple JSON-LD schemas for rich SEO */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={aboutPageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen pt-16">
        <AboutMoiMocClient />
      </div>
    </>
  );
};

export default AboutMoiMocPage;
