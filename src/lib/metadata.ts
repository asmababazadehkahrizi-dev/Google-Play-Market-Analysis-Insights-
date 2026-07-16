import { Metadata } from "next";
import { site } from "@/data/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildMetadata({
  title,
  description,
  path = "",
  image = "/images/og-image.svg",
}: BuildMetadataOptions): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle =
    path && !title.includes(site.name) ? `${title} | ${site.name}` : title;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
