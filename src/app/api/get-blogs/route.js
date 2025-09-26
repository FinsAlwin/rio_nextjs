import { NextResponse } from "next/server";

export async function POST() {
  try {
    const dummyData = {
      status: "success",
      response_data: {
        blogs: [
          {
            id: 1,
            title: "Luxury Living in Goa",
            excerpt:
              "Discover the beauty of luxury living in Goa with RIO Luxury Homes",
            content: "Goa offers unparalleled luxury living experiences...",
            image: "/properties_image/blog1.webp",
            post_url: "/blog/luxury-living-goa",
            date: "2024-01-15",
            author: "RIO Team",
          },
          {
            id: 2,
            title: "Investment Opportunities in Real Estate",
            excerpt:
              "Explore high-ROI investment opportunities in Goa's luxury real estate market",
            content:
              "The real estate market in Goa presents excellent investment opportunities...",
            image: "/properties_image/blog2.webp",
            post_url: "/blog/investment-opportunities",
            date: "2024-01-10",
            author: "RIO Team",
          },
          {
            id: 3,
            title: "Modern Architecture Trends",
            excerpt: "Latest trends in luxury villa architecture and design",
            content:
              "Modern architecture continues to evolve with new trends...",
            image: "/properties_image/blog1.webp",
            post_url: "/blog/modern-architecture-trends",
            date: "2024-01-05",
            author: "RIO Team",
          },
        ],
      },
    };

    return NextResponse.json(dummyData);
  } catch {
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
