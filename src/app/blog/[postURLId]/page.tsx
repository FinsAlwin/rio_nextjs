import { Suspense } from "react";
import { Metadata } from "next";
import BlogCore from "../../../components/BlogCore/BlogCore";
import { MainProvider } from "../../../context/MainContext";

// Generate static params for known blog posts
export async function generateStaticParams() {
  const blogPosts = [
    "luxury-living-goa",
    "investment-opportunities-goa",
    "modern-architecture-trends",
    "buying-property-goa-guide",
    "goa-real-estate-market",
    "luxury-villa-features",
    "property-investment-tips",
    "goa-lifestyle-benefits",
  ];

  return blogPosts.map((post) => ({
    postURLId: post,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ postURLId: string }>;
}): Promise<Metadata> {
  const { postURLId } = await params;

  // Blog post specific metadata
  const blogMetadata: Record<string, Metadata> = {
    "luxury-living-goa": {
      title: "Luxury Living in Goa: Your Dream Villa Awaits | RIO Luxury Homes",
      description:
        "Discover the beauty of luxury living in Goa with RIO Luxury Homes. Experience world-class amenities, stunning architecture, and modern comfort.",
    },
    "investment-opportunities-goa": {
      title:
        "Investment Opportunities in Goa's Luxury Real Estate Market | RIO",
      description:
        "Explore high-ROI investment opportunities in Goa's luxury real estate market. Learn about growing demand and premium property investments.",
    },
    "modern-architecture-trends": {
      title:
        "Modern Architecture Trends in Luxury Villa Design | RIO Luxury Homes",
      description:
        "Latest trends in luxury villa architecture and design. From sustainable materials to smart home technology in modern luxury homes.",
    },
    "buying-property-goa-guide": {
      title: "Ultimate Guide to Buying Property in Goa | RIO Luxury Homes",
      description:
        "Everything you need to know about purchasing luxury property in Goa. Legal requirements, market insights, and comprehensive buying guide.",
    },
  };

  const metadata = blogMetadata[postURLId] || {
    title: `${postURLId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())} | RIO Luxury Homes Blog`,
    description: `Read our latest insights on ${postURLId.replace(
      /-/g,
      " "
    )} and luxury real estate in Goa.`,
  };

  return {
    ...metadata,
    openGraph: {
      title: metadata.title || "RIO Luxury Homes Blog",
      description:
        metadata.description || "Latest insights on luxury real estate in Goa.",
      type: "article",
      locale: "en_US",
      siteName: "RIO Luxury Homes",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title || "RIO Luxury Homes Blog",
      description:
        metadata.description || "Latest insights on luxury real estate in Goa.",
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
    alternates: {
      canonical: `https://rioluxuryhomes.in/blog/${postURLId}`,
    },
  };
}

// Enable ISR for blog posts
export const revalidate = 1800; // Revalidate every 30 minutes

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postURLId: string }>;
}) {
  const { postURLId } = await params;

  return (
    <MainProvider>
      <Suspense
        fallback={<div className="page-loading">Loading Blog Post...</div>}
      >
        <BlogCore postURLId={postURLId} />
      </Suspense>
    </MainProvider>
  );
}
