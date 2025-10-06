import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Real data for properties
    const dummyData = {
      status: "success",
      response_data: {
        properties: {
          all_properties: [
            {
              id: 1,
              property_url: "/properties/the-hills-estate/",
              property_name: "The Hills Estate",
              main_image: "/assets/properties/the-hills-estate.webp",
              configuration: "3 & 4 BHK Villas",
              location: "Calangute, Goa",
              development_status: "upcoming",
              is_sold_out: "n",
            },
            {
              id: 2,
              property_url: "/properties/the-village/",
              property_name: "The Village",
              main_image: "/assets/properties/the-village.jpg",
              configuration: "4 BHK Villas",
              location: "Bastora, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 3,
              property_url: "/properties/stone-wall/",
              property_name: "Stone Wall",
              main_image: "/assets/properties/stone-wall.jpg",
              configuration: "4 BHK Villas",
              location: "Salvador, Goa",
              development_status: "upcoming",
              is_sold_out: "n",
            },
            {
              id: 4,
              property_url: "/properties/casa-brilhante/",
              property_name: "Casa Brilhante",
              main_image: "/assets/properties/casa-brilhante.jpg",
              configuration: "4 BHK Villas",
              location: "Verla, Goa",
              development_status: "completed",
              is_sold_out: "y",
            },
            {
              id: 5,
              property_url: "/properties/rumah-hutan-1/",
              property_name: "Rumah Hutan",
              main_image: "/assets/properties/rumah-hutan.webp",
              configuration: "3 & 4 BHK Villas",
              location: "Siolim, Goa",
              development_status: "completed",
              is_sold_out: "y",
            },
            {
              id: 6,
              property_url: "/properties/rio-estado/",
              property_name: "RIO ESTADO",
              main_image: "/assets/properties/rio-estado.webp",
              configuration: "4 BHK Villas",
              location: "Ucassaim, Goa",
              development_status: "ongoing",
              is_sold_out: "y",
            },
            {
              id: 7,
              property_url: "/properties/rio-royale/",
              property_name: "RIO Royale",
              main_image: "/assets/properties/rio-royale.jpg",
              configuration: "1, 2 & 3 BHK Apartments",
              location: "Candolim, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 8,
              property_url: "/properties/black-forest/",
              property_name: "Black Forest",
              main_image: "/assets/properties/black-forest.jpg",
              configuration: "4 BHK Private Villa",
              location: "Siolim, Goa",
              development_status: "ongoing",
              is_sold_out: "y",
            },
            {
              id: 9,
              property_url: "/properties/rio-estilo/",
              property_name: "RIO Estilo",
              main_image: "/assets/properties/rio-estilo.jpg",
              configuration: "3 BHK Villas",
              location: "Vagator, Goa",
              development_status: "completed",
              is_sold_out: "y",
            },
            {
              id: 10,
              property_url: "/properties/a-cappella/",
              property_name: "A Cappella",
              main_image: "/assets/properties/a-cappella.jpg",
              configuration: "4 BHK Villas",
              location: "Siolim, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 11,
              property_url: "/properties/6-assagao/",
              property_name: "6 Assagao",
              main_image: "/assets/properties/6-assagao.jpg",
              configuration: "4 BHK Villas",
              location: "Assagao, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 12,
              property_url: "/properties/amanta/",
              property_name: "Amanta",
              main_image: "/assets/properties/amanta.jpg",
              configuration: "2 & 3 BHK Villas",
              location: "Saligao, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 13,
              property_url: "/properties/rio-foresta/",
              property_name: "RIO Foresta",
              main_image: "/assets/properties/rio-foresta.webp",
              configuration: "4 BHK Villas",
              location: "Nachinola, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
          ],
          upcoming: [
            {
              id: 1,
              property_url: "/properties/the-hills-estate/",
              property_name: "The Hills Estate",
              main_image: "/assets/properties/the-hills-estate.webp",
              configuration: "3 & 4 BHK Villas",
              location: "Calangute, Goa",
              development_status: "upcoming",
              is_sold_out: "n",
            },
            {
              id: 3,
              property_url: "/properties/stone-wall/",
              property_name: "Stone Wall",
              main_image: "/assets/properties/stone-wall.jpg",
              configuration: "4 BHK Villas",
              location: "Salvador, Goa",
              development_status: "upcoming",
              is_sold_out: "n",
            },
          ],
          ongoing: [
            {
              id: 2,
              property_url: "/properties/the-village/",
              property_name: "The Village",
              main_image: "/assets/properties/the-village.jpg",
              configuration: "4 BHK Villas",
              location: "Bastora, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 6,
              property_url: "/properties/rio-estado/",
              property_name: "RIO ESTADO",
              main_image: "/assets/properties/rio-estado.webp",
              configuration: "4 BHK Villas",
              location: "Ucassaim, Goa",
              development_status: "ongoing",
              is_sold_out: "y",
            },
            {
              id: 7,
              property_url: "/properties/rio-royale/",
              property_name: "RIO Royale",
              main_image: "/assets/properties/rio-royale.jpg",
              configuration: "1, 2 & 3 BHK Apartments",
              location: "Candolim, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 8,
              property_url: "/properties/black-forest/",
              property_name: "Black Forest",
              main_image: "/assets/properties/black-forest.jpg",
              configuration: "4 BHK Private Villa",
              location: "Siolim, Goa",
              development_status: "ongoing",
              is_sold_out: "y",
            },
            {
              id: 10,
              property_url: "/properties/a-cappella/",
              property_name: "A Cappella",
              main_image: "/assets/properties/a-cappella.jpg",
              configuration: "4 BHK Villas",
              location: "Siolim, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 11,
              property_url: "/properties/6-assagao/",
              property_name: "6 Assagao",
              main_image: "/assets/properties/6-assagao.jpg",
              configuration: "4 BHK Villas",
              location: "Assagao, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 12,
              property_url: "/properties/amanta/",
              property_name: "Amanta",
              main_image: "/assets/properties/amanta.jpg",
              configuration: "2 & 3 BHK Villas",
              location: "Saligao, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
            {
              id: 13,
              property_url: "/properties/rio-foresta/",
              property_name: "RIO Foresta",
              main_image: "/assets/properties/rio-foresta.webp",
              configuration: "4 BHK Villas",
              location: "Nachinola, Goa",
              development_status: "ongoing",
              is_sold_out: "n",
            },
          ],
          completed: [
            {
              id: 4,
              property_url: "/properties/casa-brilhante/",
              property_name: "Casa Brilhante",
              main_image: "/assets/properties/casa-brilhante.jpg",
              configuration: "4 BHK Villas",
              location: "Verla, Goa",
              development_status: "completed",
              is_sold_out: "y",
            },
            {
              id: 5,
              property_url: "/properties/rumah-hutan-1/",
              property_name: "Rumah Hutan",
              main_image: "/assets/properties/rumah-hutan.webp",
              configuration: "3 & 4 BHK Villas",
              location: "Siolim, Goa",
              development_status: "completed",
              is_sold_out: "y",
            },
            {
              id: 9,
              property_url: "/properties/rio-estilo/",
              property_name: "RIO Estilo",
              main_image: "/assets/properties/rio-estilo.jpg",
              configuration: "3 BHK Villas",
              location: "Vagator, Goa",
              development_status: "completed",
              is_sold_out: "y",
            },
          ],
        },
        blog_posts: [
          {
            id: 1,
            blog_post_id: "Z1NyU05LWVUwWXB3SHhKWkdwQ0xvUT09",
            post_url:
              "/blog/a-complete-guide-to-building-an-above-ground-swimming-pool-112/",
            post_title:
              "A complete guide to building an above-ground swimming pool",
            post_content:
              "Finding a solution to spending more time as a family, probably continuing to keep your kids or grandchildren active and busy, figuring out a way to chill out and unwind yourself, or maybe a technique...",
            post_image_name:
              "https://rioluxuryhomes.in/files/blog_posts/112_a-complete-guide-to-building-an-above-ground-swimm_1629289140.jpeg",
          },
          {
            id: 2,
            blog_post_id: "Nm41QVFUT0V0WjZ5c2JNZVRxV3NIZz09",
            post_url:
              "/blog/diy-floating-shelf-ideas-to-add-some-extravagance-to-your-space-111/",
            post_title:
              "DIY floating shelf ideas to add some extravagance to your space",
            post_content:
              "Floating shelves are a trending stylish solution in the design world. They are no sweat to install and hence are a great DIY pick for the art and craft lovers. In fact, a floating shelf can instantly...",
            post_image_name:
              "https://rioluxuryhomes.in/files/blog_posts/113_diy-floating-shelf-ideas-to-add-some-extravagance_1629289118.jpeg",
          },
          {
            id: 3,
            blog_post_id: "R0dkS3Z0b1BodFpQTWIyR3pTQWdmUT09",
            post_url:
              "/blog/create-a-fun-and-fabulous-play-area-for-kids-in-your-backyard-with-these-ideas-110/",
            post_title:
              "Create a fun and fabulous play area for kids in your backyard with these ideas",
            post_content:
              "Struggling to make your kids ditch those video games and soak up some fresh air? Give your kids an outdoor space where they can explore and have some good-time play. Playing outdoors and spending...",
            post_image_name:
              "https://rioluxuryhomes.in/files/blog_posts/114_create-a-fun-and-fabulous-play-area-for-kids-in-yo_1629289080.jpeg",
          },
          {
            id: 4,
            blog_post_id: "ZkI1R1FuQnFYUklkU05qcy9MQTlwQT09",
            post_url:
              "/blog/types-of-kitchen-islands-to-fit-every-kitchen-size-109/",
            post_title: "Types of kitchen islands to fit every kitchen size",
            post_content:
              "You might not recognize the number of options there are pertaining to kitchen islands. After all, how diverse can they be from one another, really? Well, we are here to familiarize you with different...",
            post_image_name:
              "https://rioluxuryhomes.in/files/blog_posts/111_types-of-kitchen-islands-to-fit-every-kitchen-size_1629289176.jpeg",
          },
          {
            id: 5,
            blog_post_id: "eW1zd0dSbGVpa3c5NzlnRkVMcFR6dz09",
            post_url:
              "/blog/perfect-outdoor-bar-ideas-to-steal-for-your-backyard-108/",
            post_title: "Perfect outdoor bar ideas to steal for your backyard",
            post_content:
              "If you are someone who's looking to take your outdoor parties to the next level, you are at the right place. Whether an extension of your outdoor kitchen or a standalone feature, upgrading your...",
            post_image_name:
              "https://rioluxuryhomes.in/files/blog_posts/110_perfect-outdoor-bar-ideas-to-steal-for-your-backya_1629124928.jpeg",
          },
        ],
      },
      message: "",
    };

    return NextResponse.json(dummyData);
  } catch {
    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
