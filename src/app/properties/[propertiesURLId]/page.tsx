import { Suspense } from "react";
import { Metadata } from "next";
import PropertiesContent from "../../../pages/PropertiesContent/PropertiesContent";
import { MainProvider } from "../../../context/MainContext";

// Generate static params for known properties
export async function generateStaticParams() {
  const properties = [
    "the-hills-estate",
    "the-village",
    "stone-wall",
    "casa-brilhante",
    "rumah-hutan-1",
    "rio-estado",
    "rio-royale",
    "black-forest",
    "rio-estilo",
    "a-cappella",
    "6-assagao",
    "amanta",
    "rio-foresta",
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
    "the-hills-estate": {
      title: "The Hills Estate | Luxury Homes For Sale with Private Pool | RIO",
      description:
        "Immerse yourself in the privacy and verdant expanse of The Hills Estate by RIO Luxury Homes, 3BHK and 4 BHK luxury homes for sale in Calangute, Goa.",
    },
    "the-village": {
      title: "The Village | 4 BHK Villas in Goa for Sale | RIO",
      description:
        "Discover The Village by RIO Luxury Homes, 4BHK luxury villas for sale in Bastora, Goa. The address becomes the landmark.",
    },
    "stone-wall": {
      title: "Stone Wall | Buy Luxury Homes in North Goa | RIO",
      description:
        "Explore the exclusive Stone Wall by RIO Luxury Homes, luxury 3BHK and 4 BHK villas for sale in Salvador do Mundo, Goa. Welcome to your natural getaway.",
    },
    "casa-brilhante": {
      title:
        "Casa Brilhante | Luxury Villas in Goa for Sale & Rent with Private Pool | RIO",
      description:
        "Welcome to your vintage Goan whim, the Indo-Portugese inspired Casa Brilhante by RIO Luxury Homes. Luxury villas with private pool for sale in Verla, Goa.",
    },
    "rumah-hutan-1": {
      title:
        "Rumah Hutan | Luxury Villas in Goa for Sale & Rent with Private Pool | RIO",
      description:
        "Rumah Hutan by RIO Luxury Homes, your Balinese dream home, now in Goa. Luxury villas with private pool for sale in Siolim, Goa. Step into the sublime.",
    },
    "rio-estado": {
      title: "RIO Estado | Buy Luxury Homes in North Goa | RIO",
      description:
        "Indulge in RIO Estado, luxury 4 BHK villas with private pool, for sale in Goa. Indo-Portugese architecture, tucked away in Ucassaim. Soliltude for the select.",
    },
    "rio-royale": {
      title: "RIO Royale | Luxury Apartments for Sale in Goa Near Beach | RIO",
      description:
        "Own a slice of paradise at RIO Royale by RIO Luxury Homes, luxury apartments for sale in Candolim, Goa. Exclusive flats with direct access to the beach.",
    },
    "black-forest": {
      title: "Black Forest | Buy Luxury Villas in North Goa | RIO",
      description:
        "Experience Black Forest at RIO Luxury Homes, a luxury villa for sale in Siolim, Goa. 4 BHK property with lush, panoramic views. Have yourself a hill.",
    },
    "rio-estilo": {
      title:
        "RIO Estilo | Luxury Villas in Goa for Sale with Private Pool | RIO",
      description:
        "Immerse yourself in RIO Estilo, Balinese-inspired 3BHK villas with private pool, for sale in Vagator, Goa.",
    },
    "a-cappella": {
      title:
        "A Cappella | Luxurious Villas with Private Pools Near Goa's Beaches",
      description:
        "Indulge in A Capella by RIO Luxury Homes, luxury 4BHK villas for sale in Oxel, Goa. Exclusive properties with easy access to the beach.",
    },
    "6-assagao": {
      title: "6 Assagao | 4 BHK Villa in Goa for Sale | RIO",
      description:
        "The best is yet to come, with 6 Assagao by RIO Luxury Homes. Luxury 4BHK villas with private pool & lawn for sale in Goa. Crafted for the 0.0001%.",
    },
    amanta: {
      title: "Amanta | Luxury Homes for Sale in Goa | RIO",
      description:
        "Step into luxury with Amanta by RIO Luxury Homes, premium villas with private pool for sale in Saligao, Goa. For those who never settle.",
    },
    "rio-foresta": {
      title: "RIO Foresta | Premium Villas for Sale in Goa | RIO",
      description:
        "Be extraordinary at RIO Foresta, luxury homes for sale in Nachinola, Goa. Bathed in natural light, near Assagao, Siolim, and Moira.",
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
