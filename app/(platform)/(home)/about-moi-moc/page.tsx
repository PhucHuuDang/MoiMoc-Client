import Image from "next/image";
import { Footer } from "@/components/_global-components-reused/footer";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";
import AboutMoiMocClient from "./about-moi-moc-client";
import { JsonLd, generateOrganizationSchema } from "@/components/seo/json-ld";
import { buildAboutPageMetadata } from "@/lib/seo/metadata-builder";

import type { Metadata } from "next";

// ISR: Revalidate every 1 hour for about page content
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildAboutPageMetadata();
}

const AboutMoiMocPage = () => {
  const words = [
    {
      text: "Tự nhiên...",
      className: "whitespace-nowrap text-3xl font-light text-white ",
    },
    {
      text: "như chính bạn!",
      className:
        "whitespace-nowrap text-5xl font-light text-white text-[#87d5a4] ",
    },
  ];

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <JsonLd data={organizationSchema} />
      <div className="min-h-screen pt-16">
        <AboutMoiMocClient />
      </div>
    </>
  );
};

export default AboutMoiMocPage;
