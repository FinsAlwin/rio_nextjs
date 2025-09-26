import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { property_url } = body;

    // Extract property name from URL
    const propertyName = property_url
      ? property_url
          .split("/")
          .filter((segment) => segment !== "")
          .pop()
      : "rio-estado-villa";

    // Define different properties based on URL
    const properties = {
      "the-village": {
        id: 1,
        property_name: "The Village",
        location: "Goa, India",
        price: "₹3.8 Cr",
        main_image: "/homepage_images/rio-estado-master-bedroom_web.webp",
        description:
          "Experience luxury living in The Village, a premium residential development featuring modern villas with contemporary design and world-class amenities.",
        gallery_images: [
          "/homepage_images/rio-estado-master-bedroom_web.webp",
          "/homepage_images/home_casa_rumah.webp",
          "/homepage_images/black_forest_image.webp",
          "/homepage_images/card_image_1.webp",
          "/homepage_images/card_image_2.webp",
        ],
        bedrooms: 4,
        bathrooms: 3,
        area: "3200 sq ft",
        features: [
          "Private Pool",
          "Modern Kitchen",
          "Master Bedroom Suite",
          "Garden",
          "Parking",
          "24/7 Security",
        ],
        amenities: [
          "Swimming Pool",
          "Gym & Fitness Center",
          "Clubhouse",
          "Security",
          "Parking",
          "Garden",
          "Children's Play Area",
        ],
        // Additional fields for PropertyDetails component
        configuration: "4 BHK Villa",
        land_area: "3200 sq ft",
        features_text:
          "Private Pool, Modern Kitchen, Master Bedroom Suite, Garden, Parking, 24/7 Security",
        possession: "Ready to Move In",
        specs_cover_image:
          "/homepage_images/rio-estado-master-bedroom_web.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief:
          "The Village represents the pinnacle of luxury living in Goa. Each villa is meticulously designed with contemporary architecture, featuring spacious layouts, premium finishes, and modern amenities. The development offers a perfect blend of privacy and community living, with beautifully landscaped gardens, recreational facilities, and round-the-clock security.",
        property_brief_cover_img: "/homepage_images/home_casa_rumah.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Where Luxury Meets Serenity",
        property_tagline_1_img: "/homepage_images/black_forest_image.webp",
        property_url: "/properties/the-village/",
        meta_title: "The Village | Luxury Villas in Goa | RIO Luxury Homes",
        meta_description:
          "Discover The Village - premium luxury villas in Goa with modern amenities, private pools, and world-class facilities.",
        canonical_url: "https://rioluxuryhomes.com/properties/the-village/",
      },
      "rio-estado-villa": {
        id: 2,
        property_name: "Rio Estado Villa",
        location: "Goa, India",
        price: "₹2.5 Cr",
        main_image: "/homepage_images/rio-estado-master-bedroom_web.webp",
        description:
          "Luxury villa with modern amenities and stunning views in the heart of Goa.",
        gallery_images: [
          "/homepage_images/rio-estado-master-bedroom_web.webp",
          "/homepage_images/home_casa_rumah.webp",
          "/homepage_images/black_forest_image.webp",
        ],
        bedrooms: 3,
        bathrooms: 2,
        area: "2500 sq ft",
        features: [
          "Private Pool",
          "Garden",
          "Parking",
          "Security",
          "Modern Kitchen",
          "Master Bedroom",
        ],
        amenities: [
          "Swimming Pool",
          "Gym",
          "Clubhouse",
          "Security",
          "Parking",
          "Garden",
        ],
        // Additional fields for PropertyDetails component
        configuration: "3 BHK Villa",
        land_area: "2500 sq ft",
        features_text:
          "Private Pool, Garden, Parking, Security, Modern Kitchen, Master Bedroom",
        possession: "Ready to Move In",
        specs_cover_image:
          "/homepage_images/rio-estado-master-bedroom_web.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief:
          "Rio Estado Villa offers an exceptional living experience in the heart of Goa. This beautifully designed villa combines modern architecture with traditional Goan charm, featuring spacious interiors, premium amenities, and stunning views of the surrounding landscape.",
        property_brief_cover_img:
          "/homepage_images/rio-estado-master-bedroom_web.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Modern Living in Traditional Goa",
        property_tagline_1_img: "/homepage_images/home_casa_rumah.webp",
        property_url: "/properties/rio-estado-villa/",
        meta_title: "Rio Estado Villa | Luxury Villa in Goa",
        meta_description:
          "Experience luxury living in Rio Estado Villa, Goa. Modern amenities, stunning views, and premium location.",
        canonical_url:
          "https://rioluxuryhomes.com/properties/rio-estado-villa/",
      },
      "casa-rumah": {
        id: 3,
        property_name: "Casa Rumah",
        location: "Goa, India",
        price: "₹3.2 Cr",
        main_image: "/homepage_images/home_casa_rumah.webp",
        description:
          "Premium villa with pool and garden, offering the perfect blend of luxury and comfort.",
        gallery_images: [
          "/homepage_images/home_casa_rumah.webp",
          "/homepage_images/rio-estado-master-bedroom_web.webp",
          "/homepage_images/black_forest_image.webp",
          "/homepage_images/card_image_3.webp",
          "/homepage_images/card_image_4.webp",
        ],
        bedrooms: 4,
        bathrooms: 3,
        area: "3200 sq ft",
        features: [
          "Private Pool",
          "Premium Kitchen",
          "Master Suite",
          "Garden",
          "Parking",
          "Security",
        ],
        amenities: [
          "Swimming Pool",
          "Gym",
          "Clubhouse",
          "Security",
          "Parking",
          "Garden",
        ],
        // Additional fields for PropertyDetails component
        configuration: "4 BHK Villa",
        land_area: "3200 sq ft",
        features_text:
          "Private Pool, Premium Kitchen, Master Suite, Garden, Parking, Security",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/home_casa_rumah.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief:
          "Casa Rumah embodies the essence of luxury living in Goa. This exquisite villa features contemporary design elements, premium finishes, and thoughtfully planned spaces that maximize comfort and functionality. The property offers a perfect retreat for families seeking both privacy and community living.",
        property_brief_cover_img: "/homepage_images/home_casa_rumah.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Premium Living Redefined",
        property_tagline_1_img: "/homepage_images/card_image_3.webp",
        property_url: "/properties/casa-rumah/",
        meta_title: "Casa Rumah | Premium Villa in Goa | RIO Luxury Homes",
        meta_description:
          "Discover Casa Rumah - premium villa with pool and garden in Goa. Luxury living with modern amenities.",
        canonical_url: "https://rioluxuryhomes.com/properties/casa-rumah/",
      },
      "black-forest": {
        id: 4,
        property_name: "Black Forest",
        location: "Goa, India",
        price: "₹4.1 Cr",
        main_image: "/homepage_images/black_forest_image.webp",
        description:
          "Exclusive villa in forest setting, offering privacy and tranquility in nature's embrace.",
        gallery_images: [
          "/homepage_images/black_forest_image.webp",
          "/homepage_images/rio-estado-master-bedroom_web.webp",
          "/homepage_images/home_casa_rumah.webp",
          "/homepage_images/card_image_1.webp",
          "/homepage_images/card_image_2.webp",
        ],
        bedrooms: 5,
        bathrooms: 4,
        area: "4500 sq ft",
        features: [
          "Private Pool",
          "Forest View",
          "Master Suite",
          "Garden",
          "Parking",
          "Security",
        ],
        amenities: [
          "Swimming Pool",
          "Gym",
          "Clubhouse",
          "Security",
          "Parking",
          "Garden",
          "Nature Trail",
        ],
        // Additional fields for PropertyDetails component
        configuration: "5 BHK Villa",
        land_area: "4500 sq ft",
        features_text:
          "Private Pool, Forest View, Master Suite, Garden, Parking, Security",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/black_forest_image.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief:
          "Black Forest offers a unique living experience surrounded by nature's beauty. This exclusive villa provides the perfect escape from city life while maintaining all modern conveniences. The property features expansive spaces, premium amenities, and breathtaking views of the surrounding forest landscape.",
        property_brief_cover_img: "/homepage_images/black_forest_image.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Nature's Luxury Retreat",
        property_tagline_1_img: "/homepage_images/card_image_1.webp",
        property_url: "/properties/black-forest/",
        meta_title: "Black Forest | Exclusive Villa in Goa | RIO Luxury Homes",
        meta_description:
          "Experience Black Forest - exclusive villa in forest setting. Privacy and tranquility in Goa.",
        canonical_url: "https://rioluxuryhomes.com/properties/black-forest/",
      },
      "phuket-resort": {
        id: 5,
        property_name: "Rio Phuket Resort",
        location: "Phuket, Thailand",
        price: "₹5.8 Cr",
        main_image: "/homepage_images/phuket_image.webp",
        description:
          "Beachfront luxury resort offering unparalleled ocean views and world-class amenities in the heart of Phuket.",
        gallery_images: [
          "/homepage_images/phuket_image.webp",
          "/homepage_images/rio-estado-master-bedroom_web.webp",
          "/homepage_images/home_casa_rumah.webp",
          "/homepage_images/black_forest_image.webp",
          "/homepage_images/card_image_1.webp",
        ],
        bedrooms: 6,
        bathrooms: 5,
        area: "6000 sq ft",
        features: [
          "Private Beach Access",
          "Ocean View",
          "Master Suite",
          "Garden",
          "Parking",
          "Security",
        ],
        amenities: [
          "Swimming Pool",
          "Gym",
          "Clubhouse",
          "Security",
          "Parking",
          "Garden",
          "Beach Access",
        ],
        // Additional fields for PropertyDetails component
        configuration: "6 BHK Villa",
        land_area: "6000 sq ft",
        features_text:
          "Private Beach Access, Ocean View, Master Suite, Garden, Parking, Security",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/phuket_image.webp",
        google_map_url: "https://maps.google.com/?q=Phuket,Thailand",
        // Additional fields for PropertyDescription component
        property_brief:
          "Rio Phuket Resort represents the ultimate in beachfront luxury living. This magnificent villa offers direct beach access, panoramic ocean views, and world-class amenities. Experience the perfect blend of tropical paradise and modern luxury in one of Thailand's most prestigious locations.",
        property_brief_cover_img: "/homepage_images/phuket_image.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Beachfront Paradise Awaits",
        property_tagline_1_img: "/homepage_images/phuket_image.webp",
        property_url: "/properties/phuket-resort/",
        meta_title:
          "Rio Phuket Resort | Beachfront Luxury Resort | RIO Luxury Homes",
        meta_description:
          "Experience Rio Phuket Resort - beachfront luxury resort with ocean views and world-class amenities in Phuket.",
        canonical_url: "https://rioluxuryhomes.com/properties/phuket-resort/",
      },
    };

    // Get property data or default to Rio Estado Villa
    const propertyData =
      properties[propertyName] || properties["rio-estado-villa"];

    const dummyData = {
      status: "success",
      response_data: {
        property_details: propertyData,
        property_gallery: propertyData.gallery_images.map((image, index) => {
          const roomTitles = [
            "MASTER BEDROOM",
            "LIVING ROOM",
            "KITCHEN",
            "BATHROOM",
            "GARDEN VIEW",
          ];
          return {
            id: index + 1,
            image_url: image,
            image_name: image,
            image_title: roomTitles[index] || `Room ${index + 1}`,
            alt_text: `${propertyData.property_name} - ${
              roomTitles[index] || `Image ${index + 1}`
            }`,
          };
        }),
        property_villas: [
          {
            id: 1,
            villa_name: "Villa A",
            bedrooms: propertyData.bedrooms,
            bathrooms: propertyData.bathrooms,
            area: propertyData.area,
            price: propertyData.price,
            image: propertyData.main_image,
          },
          {
            id: 2,
            villa_name: "Villa B",
            bedrooms: propertyData.bedrooms + 1,
            bathrooms: propertyData.bathrooms,
            area: `${parseInt(propertyData.area) + 200} sq ft`,
            price: `₹${
              parseInt(propertyData.price.replace(/[₹,Cr]/g, "")) + 0.5
            } Cr`,
            image: propertyData.gallery_images[1] || propertyData.main_image,
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
