import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse request body to get offset and limit with error handling
    let body = {};
    try {
      body = await request.json();
    } catch {
      // If no body or invalid JSON, use defaults
      body = {};
    }

    const { offset = 0, limit = 10 } = body;

    // Complete blog posts data
    const allBlogPosts = [
      {
        blog_post_id: 1,
        post_title: "Luxury Living in Goa: Your Dream Villa Awaits",
        post_content:
          "Discover the beauty of luxury living in Goa with RIO Luxury Homes. Experience world-class amenities, stunning architecture, and the perfect blend of modern comfort with traditional Goan charm.",
        post_image_name: "/blogs_images/blog_image_footer.webp",
        post_url: "/blog/luxury-living-goa",
        display_date: "January 15, 2024",
        author: "RIO Team",
      },
      {
        blog_post_id: 2,
        post_title:
          "Investment Opportunities in Goa's Luxury Real Estate Market",
        post_content:
          "Explore high-ROI investment opportunities in Goa's luxury real estate market. Learn about the growing demand for premium properties and how RIO Luxury Homes is leading the way.",
        post_image_name: "/properties_image/blog1.webp",
        post_url: "/blog/investment-opportunities-goa",
        display_date: "January 10, 2024",
        author: "RIO Investment Team",
      },
      {
        blog_post_id: 3,
        post_title: "Modern Architecture Trends in Luxury Villa Design",
        post_content:
          "Latest trends in luxury villa architecture and design. From sustainable materials to smart home technology, discover what makes modern luxury homes stand out.",
        post_image_name: "/properties_image/blog2.webp",
        post_url: "/blog/modern-architecture-trends",
        display_date: "January 5, 2024",
        author: "RIO Design Team",
      },
      {
        blog_post_id: 4,
        post_title: "The Ultimate Guide to Buying Property in Goa",
        post_content:
          "Everything you need to know about purchasing luxury property in Goa. From legal requirements to market insights, this comprehensive guide covers it all.",
        post_image_name: "/blogs_images/blog_image_footer.webp",
        post_url: "/blog/buying-property-goa-guide",
        display_date: "December 28, 2023",
        author: "RIO Legal Team",
      },
      {
        blog_post_id: 5,
        post_title: "Sustainable Luxury: Eco-Friendly Homes in Goa",
        post_content:
          "Discover how RIO Luxury Homes is pioneering sustainable luxury living with eco-friendly features, renewable energy, and green building practices.",
        post_image_name: "/properties_image/blog1.webp",
        post_url: "/blog/sustainable-luxury-homes",
        display_date: "December 20, 2023",
        author: "RIO Sustainability Team",
      },
      {
        blog_post_id: 6,
        post_title: "Interior Design Trends for Luxury Villas",
        post_content:
          "Explore the latest interior design trends that are shaping luxury villa interiors. From minimalist aesthetics to bold statement pieces.",
        post_image_name: "/properties_image/blog2.webp",
        post_url: "/blog/interior-design-trends",
        display_date: "December 15, 2023",
        author: "RIO Interior Team",
      },
      {
        blog_post_id: 7,
        post_title: "Smart Home Technology in Luxury Villas",
        post_content:
          "Discover how smart home technology is revolutionizing luxury living with automated systems, energy efficiency, and enhanced security features.",
        post_image_name: "/blogs_images/blog_image_footer.webp",
        post_url: "/blog/smart-home-technology",
        display_date: "December 10, 2023",
        author: "RIO Tech Team",
      },
      {
        blog_post_id: 8,
        post_title: "Goa Real Estate Market Trends 2024",
        post_content:
          "Stay ahead with the latest trends in Goa's real estate market. Market analysis, price predictions, and investment hotspots for 2024.",
        post_image_name: "/properties_image/blog1.webp",
        post_url: "/blog/goa-real-estate-trends-2024",
        display_date: "December 5, 2023",
        author: "RIO Market Research",
      },
    ];

    // Calculate pagination
    const startIndex = offset;
    const endIndex = offset + limit;
    const paginatedPosts = allBlogPosts.slice(startIndex, endIndex);

    // Determine if there are more posts to load
    const hasMore = endIndex < allBlogPosts.length;

    const dummyData = {
      status: "success",
      response_data: {
        blog_posts: paginatedPosts,
        load_more: hasMore ? "y" : "n",
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
