import { Suspense } from "react";
import { Metadata } from "next";
import Properties from "../../pages/Properties/Properties";
import { MainProvider } from "../../context/MainContext";

export const metadata: Metadata = {
  title:
    "Luxury Properties in Goa | Completed, Ongoing & Upcoming Projects by RIO",
  description:
    "Explore RIO's exclusive luxury villas and properties in Goa. Browse completed, ongoing, and upcoming projects designed for elegance and investment.",
  keywords: [
    "luxury properties Goa",
    "completed projects",
    "ongoing projects",
    "upcoming projects",
    "RIO properties",
    "Goa real estate",
  ],
  openGraph: {
    title:
      "Luxury Properties in Goa | Completed, Ongoing & Upcoming Projects by RIO",
    description:
      "Explore RIO's exclusive luxury villas and properties in Goa. Browse completed, ongoing, and upcoming projects designed for elegance and investment.",
    type: "website",
    locale: "en_US",
    siteName: "RIO Luxury Homes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Properties in Goa | RIO Projects",
    description: "Explore RIO's exclusive luxury villas and properties in Goa.",
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
    canonical: "https://rioluxuryhomes.in/properties",
  },
};

export default function PropertiesPage() {
  return (
    <MainProvider>
      <Suspense
        fallback={<div className="page-loading">Loading Properties...</div>}
      >
        <Properties />
      </Suspense>
    </MainProvider>
  );
}
