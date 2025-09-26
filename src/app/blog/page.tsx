import { Suspense } from "react";
import { Metadata } from "next";
import Blog from "../../pages/Blog/Blog";
import { MainProvider } from "../../context/MainContext";

export const metadata: Metadata = {
  title: "Luxury Real Estate Blog | Goa Property Insights | RIO Luxury Homes",
  description:
    "Stay updated with the latest insights on luxury real estate in Goa. Expert tips, market trends, and investment opportunities from RIO Luxury Homes.",
  keywords: [
    "Goa real estate blog",
    "luxury property insights",
    "real estate trends",
    "investment tips",
    "Goa property market",
  ],
  openGraph: {
    title: "Luxury Real Estate Blog | Goa Property Insights | RIO Luxury Homes",
    description:
      "Stay updated with the latest insights on luxury real estate in Goa. Expert tips, market trends, and investment opportunities.",
    type: "website",
    locale: "en_US",
    siteName: "RIO Luxury Homes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Real Estate Blog | RIO Luxury Homes",
    description: "Latest insights on luxury real estate in Goa.",
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
    canonical: "https://rioluxuryhomes.in/blog",
  },
};

// Enable ISR for blog page
export const revalidate = 3600; // Revalidate every hour

export default function BlogPage() {
  return (
    <MainProvider>
      <Suspense fallback={<div className="page-loading">Loading Blog...</div>}>
        <Blog />
      </Suspense>
    </MainProvider>
  );
}
