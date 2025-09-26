import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse request body to get post_url with error handling
    let body = {};
    try {
      body = await request.json();
    } catch {
      // If no body or invalid JSON, use defaults
      body = {};
    }

    const { post_url } = body;

    // Extract blog slug from URL
    const blogSlug = post_url ? post_url.split("/").pop() : "luxury-living-goa";

    // Define blog posts data
    const blogPosts = {
      "luxury-living-goa": {
        blog_post_id: 1,
        post_title: "Luxury Living in Goa: Your Dream Villa Awaits",
        post_content: `
          <h2>Experience Luxury Living in Goa</h2>
          <p>Goa offers unparalleled luxury living experiences that combine modern amenities with natural beauty. At RIO Luxury Homes, we create exceptional properties that redefine luxury living in one of India's most beautiful destinations.</p>
          
          <h3>Why Choose Goa for Luxury Living?</h3>
          <ul>
            <li>Pristine beaches and natural landscapes</li>
            <li>Modern infrastructure and connectivity</li>
            <li>Rich cultural heritage and vibrant nightlife</li>
            <li>Excellent investment opportunities</li>
            <li>Year-round tropical climate</li>
          </ul>
          
          <p>Our luxury villas in Goa are designed to provide the ultimate living experience with world-class amenities, breathtaking views, and architectural excellence that seamlessly blends with the natural surroundings.</p>
          
          <h3>Features of RIO Luxury Homes</h3>
          <p>Each property is meticulously crafted with premium materials, state-of-the-art technology, and sustainable design principles. From private pools to landscaped gardens, every detail is designed for luxury and comfort.</p>
        `,
        post_image_name: "/blogs_images/blog_image_footer.webp",
        post_url: "/blog/luxury-living-goa",
        display_date: "January 15, 2024",
        author: "RIO Team",
        meta_title:
          "Luxury Living in Goa: Your Dream Villa Awaits | RIO Luxury Homes",
        meta_description:
          "Discover the beauty of luxury living in Goa with RIO Luxury Homes. Experience world-class amenities, stunning architecture, and modern comfort.",
      },
      "investment-opportunities-goa": {
        blog_post_id: 2,
        post_title:
          "Investment Opportunities in Goa's Luxury Real Estate Market",
        post_content: `
          <h2>Goa's Real Estate Market: A Growing Investment Hub</h2>
          <p>Goa's luxury real estate market presents exceptional investment opportunities with strong growth potential and attractive returns. The state's unique position as a premier tourist destination makes it ideal for both residential and commercial investments.</p>
          
          <h3>Key Investment Advantages</h3>
          <ul>
            <li>High rental yields from tourism</li>
            <li>Steady appreciation in property values</li>
            <li>Growing demand from domestic and international buyers</li>
            <li>Government initiatives supporting infrastructure development</li>
          </ul>
          
          <p>RIO Luxury Homes offers carefully curated investment opportunities that maximize returns while ensuring quality and sustainability.</p>
        `,
        post_image_name: "/properties_image/blog1.webp",
        post_url: "/blog/investment-opportunities-goa",
        display_date: "January 10, 2024",
        author: "RIO Investment Team",
        meta_title:
          "Investment Opportunities in Goa's Luxury Real Estate | RIO",
        meta_description:
          "Explore high-ROI investment opportunities in Goa's luxury real estate market with RIO Luxury Homes.",
      },
      "modern-architecture-trends": {
        blog_post_id: 3,
        post_title: "Modern Architecture Trends in Luxury Villa Design",
        post_content: `
          <h2>The Evolution of Luxury Villa Architecture</h2>
          <p>Modern luxury villa design is experiencing a renaissance, with architects pushing boundaries to create homes that are both aesthetically stunning and functionally superior.</p>
          
          <h3>Current Trends in Luxury Design</h3>
          <ul>
            <li>Sustainable and eco-friendly materials</li>
            <li>Smart home technology integration</li>
            <li>Open-plan living spaces</li>
            <li>Seamless indoor-outdoor connectivity</li>
            <li>Minimalist aesthetic with bold accents</li>
          </ul>
          
          <p>At RIO Luxury Homes, we incorporate these cutting-edge trends while maintaining timeless elegance and functionality.</p>
        `,
        post_image_name: "/properties_image/blog2.webp",
        post_url: "/blog/modern-architecture-trends",
        display_date: "January 5, 2024",
        author: "RIO Design Team",
        meta_title: "Modern Architecture Trends in Luxury Villa Design | RIO",
        meta_description:
          "Discover the latest trends in luxury villa architecture and design with RIO Luxury Homes.",
      },
      "buying-property-goa-guide": {
        blog_post_id: 4,
        post_title: "The Ultimate Guide to Buying Property in Goa",
        post_content: `
          <h2>Your Complete Guide to Property Purchase in Goa</h2>
          <p>Buying property in Goa requires careful planning and understanding of local regulations. This comprehensive guide covers everything you need to know for a successful property purchase.</p>
          
          <h3>Key Steps in the Buying Process</h3>
          <ul>
            <li>Legal documentation and verification</li>
            <li>Property registration procedures</li>
            <li>Understanding local zoning laws</li>
            <li>Financial planning and loan options</li>
            <li>Property inspection and due diligence</li>
          </ul>
          
          <p>Our expert team at RIO Luxury Homes guides you through every step of the process, ensuring a smooth and transparent transaction.</p>
        `,
        post_image_name: "/blogs_images/blog_image_footer.webp",
        post_url: "/blog/buying-property-goa-guide",
        display_date: "December 28, 2023",
        author: "RIO Legal Team",
        meta_title:
          "Ultimate Guide to Buying Property in Goa | RIO Luxury Homes",
        meta_description:
          "Complete guide to purchasing luxury property in Goa. Legal requirements, market insights, and expert advice.",
      },
      "smart-home-technology": {
        blog_post_id: 7,
        post_title: "Smart Home Technology in Luxury Villas",
        post_content: `
          <h2>Revolutionizing Luxury Living with Smart Technology</h2>
          <p>Smart home technology is transforming the way we experience luxury living. From automated lighting systems to advanced security features, modern luxury villas are becoming intelligent ecosystems that adapt to our lifestyle needs.</p>
          
          <h3>Key Smart Home Features</h3>
          <ul>
            <li>Automated lighting and climate control systems</li>
            <li>Integrated security and surveillance systems</li>
            <li>Smart entertainment and audio systems</li>
            <li>Energy management and monitoring</li>
            <li>Voice-controlled assistants and IoT devices</li>
            <li>Smart kitchen appliances and systems</li>
          </ul>
          
          <h3>Benefits of Smart Home Integration</h3>
          <p>Smart technology in luxury villas offers enhanced comfort, improved energy efficiency, increased security, and seamless control over your living environment. With smartphone integration, homeowners can control their entire villa remotely.</p>
          
          <h3>Future-Ready Luxury</h3>
          <p>At RIO Luxury Homes, we integrate cutting-edge smart home technology that not only enhances current living experiences but also ensures your villa remains future-ready as technology continues to evolve.</p>
        `,
        post_image_name: "/blogs_images/blog_image_footer.webp",
        post_url: "/blog/smart-home-technology",
        display_date: "December 10, 2023",
        author: "RIO Tech Team",
        meta_title: "Smart Home Technology in Luxury Villas | RIO Luxury Homes",
        meta_description:
          "Discover how smart home technology is revolutionizing luxury living with automated systems, energy efficiency, and enhanced security features.",
      },
      "sustainable-luxury-homes": {
        blog_post_id: 5,
        post_title: "Sustainable Luxury: Eco-Friendly Homes in Goa",
        post_content: `
          <h2>Pioneering Sustainable Luxury Living</h2>
          <p>RIO Luxury Homes is leading the way in sustainable luxury living, combining eco-friendly practices with uncompromising luxury. Our green initiatives ensure that luxury living doesn't come at the cost of environmental responsibility.</p>
          
          <h3>Sustainable Features</h3>
          <ul>
            <li>Solar energy systems and renewable power</li>
            <li>Rainwater harvesting and water conservation</li>
            <li>Sustainable building materials and techniques</li>
            <li>Energy-efficient appliances and systems</li>
            <li>Waste management and recycling programs</li>
            <li>Native landscaping and biodiversity preservation</li>
          </ul>
          
          <h3>Environmental Benefits</h3>
          <p>Our sustainable approach reduces carbon footprint, conserves natural resources, and creates healthier living environments while maintaining the highest standards of luxury and comfort.</p>
          
          <p>Choose RIO Luxury Homes for a future where luxury and sustainability coexist harmoniously.</p>
        `,
        post_image_name: "/properties_image/blog1.webp",
        post_url: "/blog/sustainable-luxury-homes",
        display_date: "December 20, 2023",
        author: "RIO Sustainability Team",
        meta_title: "Sustainable Luxury: Eco-Friendly Homes in Goa | RIO",
        meta_description:
          "Discover how RIO Luxury Homes is pioneering sustainable luxury living with eco-friendly features, renewable energy, and green building practices.",
      },
      "interior-design-trends": {
        blog_post_id: 6,
        post_title: "Interior Design Trends for Luxury Villas",
        post_content: `
          <h2>Latest Trends Shaping Luxury Villa Interiors</h2>
          <p>Interior design in luxury villas is evolving, with new trends emphasizing comfort, functionality, and aesthetic appeal. Discover the latest design philosophies that are defining modern luxury living spaces.</p>
          
          <h3>Current Design Trends</h3>
          <ul>
            <li>Minimalist aesthetics with bold statement pieces</li>
            <li>Natural materials and biophilic design elements</li>
            <li>Multi-functional spaces and flexible layouts</li>
            <li>Luxury wellness areas and spa-like bathrooms</li>
            <li>Smart storage solutions and hidden technology</li>
            <li>Sustainable and locally sourced furnishings</li>
          </ul>
          
          <h3>Color Palettes and Materials</h3>
          <p>Contemporary luxury interiors favor neutral color palettes with natural textures, incorporating elements like stone, wood, and metal to create sophisticated yet warm living environments.</p>
          
          <p>RIO Luxury Homes works with leading interior designers to create spaces that reflect these trends while maintaining timeless elegance.</p>
        `,
        post_image_name: "/properties_image/blog2.webp",
        post_url: "/blog/interior-design-trends",
        display_date: "December 15, 2023",
        author: "RIO Interior Team",
        meta_title:
          "Interior Design Trends for Luxury Villas | RIO Luxury Homes",
        meta_description:
          "Explore the latest interior design trends that are shaping luxury villa interiors. From minimalist aesthetics to bold statement pieces.",
      },
    };

    // Get the specific blog post or default to first one
    const blogPost = blogPosts[blogSlug] || blogPosts["luxury-living-goa"];

    const dummyData = {
      status: "success",
      response_data: {
        blog_details: blogPost,
        recommended_posts: [
          {
            blog_post_id: 5,
            post_title: "Sustainable Luxury: Eco-Friendly Homes in Goa",
            post_image_name: "/properties_image/blog1.webp",
            post_url: "/blog/sustainable-luxury-homes",
            display_date: "December 20, 2023",
          },
          {
            blog_post_id: 6,
            post_title: "Interior Design Trends for Luxury Villas",
            post_image_name: "/properties_image/blog2.webp",
            post_url: "/blog/interior-design-trends",
            display_date: "December 15, 2023",
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
