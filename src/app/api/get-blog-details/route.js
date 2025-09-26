import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { post_url } = body;

    const dummyData = {
      status: "success",
      response_data: {
        post_details: {
          id: 1,
          title: "Luxury Living in Goa",
          excerpt:
            "Discover the beauty of luxury living in Goa with RIO Luxury Homes",
          content: `
            <h2>Experience Luxury Living in Goa</h2>
            <p>Goa offers unparalleled luxury living experiences that combine modern amenities with natural beauty. At RIO Luxury Homes, we create exceptional properties that redefine luxury living.</p>
            
            <h3>Why Choose Goa for Luxury Living?</h3>
            <ul>
              <li>Pristine beaches and natural landscapes</li>
              <li>Modern infrastructure and connectivity</li>
              <li>Rich cultural heritage</li>
              <li>Excellent investment opportunities</li>
            </ul>
            
            <p>Our luxury villas in Goa are designed to provide the ultimate living experience with world-class amenities and breathtaking views.</p>
          `,
          image: "/properties_image/blog1.webp",
          post_url: post_url || "/blog/luxury-living-goa",
          date: "2024-01-15",
          author: "RIO Team",
          meta_title: "Luxury Living in Goa | RIO Luxury Homes",
          meta_description:
            "Discover the beauty of luxury living in Goa with RIO Luxury Homes. Experience modern amenities and natural beauty.",
        },
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
