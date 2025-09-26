import { Suspense } from "react";
import { Metadata } from "next";
import PropertiesContent from "../../../pages/PropertiesContent/PropertiesContent";
import { MainProvider } from "../../../context/MainContext";

// Generate static params for known properties
export async function generateStaticParams() {
  const properties = [
    "rio-estado-villa",
    "casa-rumah",
    "black-forest",
    "rumah-hutan",
    "the-village",
    "rio-estilo",
    "rio-royale",
    "a-cappella",
  ];

  return properties.map((property) => ({
    propertiesURLId: property,
  }));
}

// Generate metadata for each property
export async function generateMetadata({
  params,
}: {
  params: Promise<{ propertiesURLId: string }>;
}): Promise<Metadata> {
  const { propertiesURLId } = await params;

  // Property-specific metadata
  const propertyMetadata: Record<string, Metadata> = {
    "rio-estado-villa": {
      title: "Rio Estado Villa | Luxury 3 BHK Villa in Goa | RIO Luxury Homes",
      description:
        "Discover Rio Estado Villa - a luxury 3 BHK villa in Goa with modern amenities, private pool, and 24/7 security. Perfect for investment and luxury living.",
    },
    "casa-rumah": {
      title: "Casa Rumah | Premium 4 BHK Villa in Goa | RIO Luxury Homes",
      description:
        "Explore Casa Rumah - a premium 4 BHK villa in Goa featuring contemporary design, landscaped gardens, and world-class amenities.",
    },
    "black-forest": {
      title: "Black Forest | Exclusive 5 BHK Villa in Goa | RIO Luxury Homes",
      description:
        "Experience Black Forest - an exclusive 5 BHK villa in Goa set in a forest setting with rooftop garden and panoramic views.",
    },
    "rumah-hutan": {
      title: "Rumah Hutan | Luxury Villa in Goa | RIO Luxury Homes",
      description:
        "Discover Rumah Hutan - a luxury villa in Goa offering modern living with natural surroundings and premium amenities.",
    },
    "the-village": {
      title:
        "The Village | Premium Residential Development in Goa | RIO Luxury Homes",
      description:
        "Explore The Village - a premium residential development in Goa featuring modern villas with contemporary design and world-class amenities.",
    },
  };

  const metadata = propertyMetadata[propertiesURLId] || {
    title: `${propertiesURLId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) =>
        l.toUpperCase()
      )} | Luxury Villa in Goa | RIO Luxury Homes`,
    description: `Discover ${propertiesURLId.replace(
      /-/g,
      " "
    )} - a luxury villa in Goa offering premium amenities and modern living.`,
  };

  return {
    ...metadata,
    openGraph: {
      title: metadata.title || "RIO Luxury Homes Property",
      description:
        metadata.description ||
        "Discover luxury properties in Goa with RIO Luxury Homes.",
      type: "website",
      locale: "en_US",
      siteName: "RIO Luxury Homes",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title || "RIO Luxury Homes Property",
      description:
        metadata.description ||
        "Discover luxury properties in Goa with RIO Luxury Homes.",
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
      canonical: `https://rioluxuryhomes.in/properties/${propertiesURLId}`,
    },
  };
}

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ propertiesURLId: string }>;
}) {
  const { propertiesURLId } = await params;

  return (
    <MainProvider>
      <Suspense
        fallback={
          <div className="page-loading">Loading Property Details...</div>
        }
      >
        <PropertiesContent propertiesURLId={propertiesURLId} />
      </Suspense>
    </MainProvider>
  );
}
