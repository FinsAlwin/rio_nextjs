import { Suspense } from "react";
import { Metadata } from "next";
import Home from "../pages/Home/Home";
import { MainProvider } from "../context/MainContext";

export const metadata: Metadata = {
  title: "RIO Luxury Homes | Iconic Luxury Villas for Sale in Goa",
  description:
    "Exclusive luxury villas for sale in Goa. Homes that offer private pools & 24/7 security. Global architecture, contemporary aesthetic, & high ROI.",
  keywords: [
    "luxury villas",
    "Goa real estate",
    "luxury homes",
    "investment properties",
    "RIO luxury homes",
  ],
  openGraph: {
    title: "RIO Luxury Homes | Iconic Luxury Villas for Sale in Goa",
    description:
      "Exclusive luxury villas for sale in Goa. Homes that offer private pools & 24/7 security. Global architecture, contemporary aesthetic, & high ROI.",
    type: "website",
    locale: "en_US",
    siteName: "RIO Luxury Homes",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIO Luxury Homes | Iconic Luxury Villas for Sale in Goa",
    description:
      "Exclusive luxury villas for sale in Goa. Homes that offer private pools & 24/7 security.",
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
    canonical: "https://rioluxuryhomes.in",
  },
};

export default function Page() {
  return (
    <MainProvider>
      <Suspense
        fallback={
          <div className="page-loading">Loading RIO Luxury Homes...</div>
        }
      >
        <Home />
      </Suspense>
    </MainProvider>
  );
}
