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
      : "the-hills-estate";

    // Define different properties based on URL
    const properties = {
      "the-hills-estate": {
        property_url: "/properties/the-hills-estate/",
        property_name: "The Hills Estate",
        main_image: "/assets/properties/The_Hills_Estate_Project_View.webp",
        property_tagline_1: "LEARN MORE ABOUT THIS PROJECT",
        property_tagline_1_img:
          "/assets/properties/The_Hills_Estate_Living.webp",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief: "",
        property_brief_cover_img: "",
        specs_cover_image: "/assets/properties/The_Hills_Estate_vertical.webp",
        configuration: "3 & 4 BHK Villas",
        land_area: "2 acres",
        features: "Gated Community, Clubhouse",
        location: "Calangute, Goa",
        google_map_url: "Calangute, Goa",
        possession: "Upcoming",
        meta_title:
          "The Hills Estate | Luxury Homes For Sale with Private Pool | RIO",
        meta_description:
          "Immerse yourself in the privacy and verdant expanse of The Hills Estate by RIO Luxury Homes, 3BHK and 4 BHK luxury homes for sale in Calangute, Goa.",
        development_status: "upcoming",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "0",
        canonical_url: "https://rioluxuryhomes.in/properties/the-hills-estate/",
        redirect_301: "n",
      },
      "the-village": {
        property_url: "/properties/the-village/",
        property_name: "The Village",
        main_image: "/assets/properties/The_Village_Overview.jpg",
        property_tagline_1: "LEARN MORE ABOUT THIS PROJECT",
        property_tagline_1_img:
          "/assets/properties/The_Village_villa_entrance_view.jpg",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief: "",
        property_brief_cover_img: "",
        specs_cover_image: "/assets/properties/The_Village_Vertical.jpg",
        configuration: "4 BHK Villas",
        land_area: "6000 sq.m",
        features: "Private courtyards",
        location: "Bastora, Goa",
        google_map_url: "Bastora, Goa",
        possession: "Ongoing",
        meta_title: "The Village | 4 BHK Villas in Goa for Sale | RIO",
        meta_description:
          "Discover The Village by RIO Luxury Homes, 4BHK luxury villas for sale in Bastora, Goa. The address becomes the landmark.",
        development_status: "ongoing",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "0",
        canonical_url: "https://rioluxuryhomes.in/properties/the-village/",
        redirect_301: "n",
      },
      "stone-wall": {
        property_url: "/properties/stone-wall/",
        property_name: "Stone Wall",
        main_image: "/assets/properties/9-Stone-Wall-scaled.jpg",
        property_tagline_1: "",
        property_tagline_1_img: "",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief: "",
        property_brief_cover_img: "",
        specs_cover_image: "/assets/properties/Stone-Wall-scaled.jpg",
        configuration: "4 BHK Villas",
        land_area: "0.5 acre",
        features: "Close to Porvorim, Panjim, Aldona, Siolim, and Assagao",
        location: "Salvador, Goa",
        google_map_url: "Salvador do Mundo",
        possession: "Upcoming",
        meta_title: "Stone Wall | Buy Luxury Homes in North Goa | RIO",
        meta_description:
          "Explore the exclusive Stone Wall by RIO Luxury Homes, luxury 3BHK and 4 BHK villas for sale in Salvador do Mundo, Goa. Welcome to your natural getaway.",
        development_status: "upcoming",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "0",
        canonical_url: "https://rioluxuryhomes.in/properties/stone-wall/",
        redirect_301: "n",
      },
      "casa-brilhante": {
        property_url: "/properties/casa-brilhante/",
        property_name: "Casa Brilhante",
        main_image: "/assets/properties/casa_b-aerial.jpg",
        property_tagline_1: "A vintage Goan Whim",
        property_tagline_1_img: "/assets/properties/casa_b-pool_deck.jpg",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief:
          'The word "brilhante" signifies brightness and unmatched luxury. Distinct from the transparency of Modernism and the starkness of tradition, it embraces a mystical Goan architectural philosophy, inviting visitors to explore its sun-dappled corridors, expansive arches and nostalgic courtyards, ultimately revealing its secrets through the interplay of light and shadow.',
        property_brief_cover_img:
          "/assets/properties/casa-brilhante-villa-c-facade-1200x1000-1.webp",
        specs_cover_image: "/assets/properties/casa_c-doors.jpg",
        configuration: "4 BHK Villas",
        land_area: "610 - 615 sq m each",
        features: "Portuguese & Mediterranean",
        location: "Verla, Goa",
        google_map_url: "https://maps.app.goo.gl/BopebCctF84soQty6",
        possession: "Ready",
        meta_title:
          "Casa Brilhante | Luxury Villas in Goa for Sale & Rent with Private Pool | RIO",
        meta_description:
          "Welcome to your vintage Goan whim, the Indo-Portugese inspired Casa Brilhante by RIO Luxury Homes. Luxury villas with private pool for sale in Verla, Goa.",
        development_status: "completed",
        is_sold_out: "y",
        property_status: "a",
        sort_order: "0",
        canonical_url: "https://rioluxuryhomes.in/properties/casa-brilhante/",
        redirect_301: "n",
      },
      "rumah-hutan-1": {
        property_url: "/properties/rumah-hutan-1/",
        property_name: "Rumah Hutan",
        main_image: "/assets/properties/rumah-hutan-gazebo-2000x15000-1.webp",
        property_tagline_1: "No room for the ordinary",
        property_tagline_1_img:
          "/assets/properties/rumah-hutan-facade-4-2000x1000-1.webp",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief:
          "Skylights bring daylight into our signature new age luxury homes across Goa. Private pools that rejuvenate, understated modern interiors, and the lush outdoors. This is what you can expect in our eight stunning Rumah Hutan villas.",
        property_brief_cover_img: "/assets/properties/rumah-aerial.jpg",
        specs_cover_image: "/assets/properties/rumah_1-living_room.jpg",
        configuration: "3 & 4 BHK Villas",
        land_area: "1 Acre",
        features: "Private pool & lawn",
        location: "Siolim, Goa",
        google_map_url: "https://maps.app.goo.gl/LQ86XyLyREaS7gy58",
        possession: "Ready",
        meta_title:
          "Rumah Hutan | Luxury Villas in Goa for Sale & Rent with Private Pool | RIO",
        meta_description:
          "Rumah Hutan by RIO Luxury Homes, your Balinese dream home, now in Goa. Luxury villas with private pool for sale in Siolim, Goa. Step into the sublime.",
        development_status: "completed",
        is_sold_out: "y",
        property_status: "a",
        sort_order: "0",
        canonical_url: "https://rioluxuryhomes.in/properties/rumah-hutan-1/",
        redirect_301: "n",
      },
      "rio-estado": {
        property_url: "/properties/rio-estado/",
        property_name: "RIO ESTADO",
        main_image: "/assets/properties/rio-estado-cover.webp",
        property_tagline_1: "Suspended in Solitude",
        property_tagline_1_img: "/assets/properties/Dining.jpg",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief:
          "Inspired by Indo-Portuguese architecture, tucked away on the meandering slopes of a quaint village in Ucassaim, these homes have been meticulously designed keeping your ultimate comforts in mind. These 11 independent luxury villas are dotted across the lush landscapes of Goa, with private pools and landscaped water bodies, encircled by large community spaces.",
        property_brief_cover_img: "/assets/properties/Villa_3.jpg",
        specs_cover_image: "/assets/properties/Villa_11.jpg",
        configuration: "4 BHK Villas",
        land_area: "3 Acre",
        features: "Private pool & car park",
        location: "Ucassaim, Goa",
        google_map_url: "https://maps.app.goo.gl/VxMeo4kht3wsw2uh7",
        possession: "Under construction",
        meta_title: "RIO Estado | Buy Luxury Homes in North Goa | RIO",
        meta_description:
          "Indulge in RIO Estado, luxury 4 BHK villas with private pool, for sale in Goa. Indo-Portugese architecture, tucked away in Ucassaim. Soliltude for the select.",
        development_status: "ongoing",
        is_sold_out: "y",
        property_status: "a",
        sort_order: "1",
        canonical_url: "https://rioluxuryhomes.in/properties/rio-estado/",
        redirect_301: "n",
      },
      "rio-royale": {
        property_url: "/properties/rio-royale/",
        property_name: "RIO Royale",
        main_image: "/assets/properties/Royale-1-2000x1200-1.jpg",
        property_tagline_1: "A location of unprecedented natural beauty",
        property_tagline_1_img: "/assets/properties/Royale-2-2000x1000-1.jpg",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief:
          "Set back from the shore, with direct access to the beach and turquoise sea, RIO unveils its exclusive gated community, RIO Royale. Influenced by modern Mediterranean architecture, styled with chequered retro windows, enhanced by fresh terrazzo floorings, double-height ceilings and intimate bedroom settings, RIO Royale presents a panorama of scenic views. Natural light floods into spacious rooms, set with high ceilings and custom furnishings. Sophistication has never looked so good.",
        property_brief_cover_img: "/assets/properties/Royale-8-1200-x1000.jpg",
        specs_cover_image: "/assets/properties/Royale-5-750x1000-1.jpg",
        configuration: "1, 2 & 3 BHK Apartments",
        land_area: "1.1 Acre",
        features: "Fully furnished",
        location: "Candolim, Goa",
        google_map_url: "https://maps.app.goo.gl/c4CiubEWbZdqmJfy9",
        possession: "Under construction",
        meta_title:
          "RIO Royale | Luxury Apartments for Sale in Goa Near Beach | RIO",
        meta_description:
          "Own a slice of paradise at RIO Royale by RIO Luxury Homes, luxury apartments for sale in Candolim, Goa. Exclusive flats with direct access to the beach.",
        development_status: "ongoing",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "2",
        canonical_url: "https://rioluxuryhomes.in/properties/rio-royale/",
        redirect_301: "n",
      },
      "black-forest": {
        property_url: "/properties/black-forest/",
        property_name: "Black Forest",
        main_image: "/assets/properties/black_forest-exterior_5.jpg",
        property_tagline_1: "Have yourself a hill",
        property_tagline_1_img:
          "/assets/properties/black-forest-rooftop-2000x1000-1.webp",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief:
          "This 4 bedroom property offers awe-inspiring, panoramic views of the forest around Siolim, without compromising your privacy. Designed to leverage the light and wonder of Goa, each bedroom is interwoven into the tropical ecosystem. A seamless open-plan layout, floor-to-ceiling windows and verdant roof gardens accompanied by an expansive pool and sundeck form a central space to enjoy the best of indoor-outdoor living.",
        property_brief_cover_img:
          "/assets/properties/black-forest-exterior-2-1200x1000-1.webp",
        specs_cover_image: "/assets/properties/black_forest-common_area.jpg",
        configuration: "4 BHK Private Villa",
        land_area: "1900 sq m",
        features: "",
        location: "Siolim, Goa",
        google_map_url: "",
        possession: "Under construction",
        meta_title: "Black Forest | Buy Luxury Villas in North Goa | RIO",
        meta_description:
          "Experience Black Forest at RIO Luxury Homes, a luxury villa for sale in Siolim, Goa. 4 BHK property with lush, panoramic views. Have yourself a hill.",
        development_status: "ongoing",
        is_sold_out: "y",
        property_status: "a",
        sort_order: "3",
        canonical_url: "https://rioluxuryhomes.in/properties/black-forest/",
        redirect_301: "n",
      },
      "rio-estilo": {
        property_url: "/properties/rio-estilo/",
        property_name: "RIO Estilo",
        main_image: "/assets/properties/RIO-Estilo-Main-Pool-Deck-1.jpg",
        property_tagline_1: "Stand wide-eyed in awe",
        property_tagline_1_img:
          "/assets/properties/RIO-Estilo-Main-Pool-Deck-2.jpg",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief:
          "Designed in the spirit of Bali's idyllic climate, with a seamless flow between indoor and outdoor living spaces, these villas feature modern, chic pavilions that open into magnificent, expansive swimming pools.",
        property_brief_cover_img: "/assets/properties/RIO-Estilo-Tile-2.jpg",
        specs_cover_image: "/assets/properties/RIO-Estilo-Tile-1.jpg",
        configuration: "3 BHK Villas",
        land_area: "1800 sq m",
        features: "Private pool & lawn",
        location: "Vagator, Goa",
        google_map_url: "https://maps.app.goo.gl/jaWCXQiCLKpBcXow5",
        possession: "Under construction",
        meta_title:
          "RIO Estilo | Luxury Villas in Goa for Sale with Private Pool | RIO",
        meta_description:
          "Immerse yourself in RIO Estilo, Balinese-inspired 3BHK villas with private pool, for sale in Vagator, Goa.",
        development_status: "completed",
        is_sold_out: "y",
        property_status: "a",
        sort_order: "4",
        canonical_url: "https://rioluxuryhomes.in/properties/rio-estilo/",
        redirect_301: "n",
      },
      "a-cappella": {
        property_url: "/properties/a-cappella/",
        property_name: "A Cappella",
        main_image: "/assets/properties/A-Cappella_1-2000x1200-1.jpg",
        property_tagline_1: "Blissfully marooned in paradise",
        property_tagline_1_img:
          "/assets/properties/A-Cappella_Living-Room-2.jpg",
        property_tagline_2: "Tuned to the seductively slow pace of luxury",
        property_tagline_2_img: "/assets/properties/A-Cappella_Living-Room-1",
        property_brief:
          "Set across 4 lush acres, this property offers stunning views that will leave you speechless. Situated within an oasis of palm trees and postcard blue skies, A Cappella lies just minutes from the beaches of Morjim, Ashwem, and Mandrem, and a mere 30 minute drive from the MOPA Airport. These distinctive 4 bedroom villas have extended terraces and patios accompanied by private patches of green and private pools. RIO's A Cappella provides you with an immersive Goan experience without compromising on your supreme comfort and privacy.",
        property_brief_cover_img:
          "/assets/properties/A-Cappella-4_1200x1000.jpg",
        specs_cover_image: "/assets/properties/A-Cappella-5_750x1000.jpg",
        configuration: "4 BHK Villas",
        land_area: "4 acres",
        features: "Recreational block & areas",
        location: "Siolim, Goa",
        google_map_url: "Oxel, Goa",
        possession: "Under construction",
        meta_title:
          "A Cappella | Luxurious Villas with Private Pools Near Goa's Beaches",
        meta_description:
          "Indulge in A Capella by RIO Luxury Homes, luxury 4BHK villas for sale in Oxel, Goa. Exclusive properties with easy access to the beach.",
        development_status: "ongoing",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "5",
        canonical_url: "https://rioluxuryhomes.in/properties/a-cappella/",
        redirect_301: "n",
      },
      "6-assagao": {
        property_url: "/properties/6-assagao/",
        property_name: "6 Assagao",
        main_image: "/assets/properties/6-Assagaon_1-2000x1200-2.jpg",
        property_tagline_1: "A hidden forest gem",
        property_tagline_1_img:
          "/assets/properties/6-Assagaon_2-2000x1000-1.jpg",
        property_tagline_2: "The address becomes the landmark",
        property_tagline_2_img: "/assets/properties/6-Assagaon_3-2000x1000-1",
        property_brief:
          "A rare architectural marvel, 6 Assagao is your dream home come alive. The interiors of its thoughtfully designed living spaces define the true essence of what contemporary living looks like. Avant-garde interiors and trendy furniture design provide a nuanced, high-end fusion of structure and style. Full height windows allow you to breathe in excellence, right in the lap of nature.",
        property_brief_cover_img:
          "/assets/properties/6-Assagaon_7-1200x1000-1.jpg",
        specs_cover_image: "/assets/properties/6-Assagaon_4-750x1000-1.jpg",
        configuration: "4 BHK Villas",
        land_area: "3000 sq.m",
        features: "Private pool & deck",
        location: "Assagao, Goa",
        google_map_url: "Assagao, Goa",
        possession: "Under construction",
        meta_title: "6 Assagao | 4 BHK Villa in Goa for Sale | RIO",
        meta_description:
          "The best is yet to come, with 6 Assagao by RIO Luxury Homes. Luxury 4BHK villas with private pool & lawn for sale in Goa. Crafted for the 0.0001%.",
        development_status: "ongoing",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "6",
        canonical_url: "https://rioluxuryhomes.in/properties/6-assagao/",
        redirect_301: "n",
      },
      amanta: {
        property_url: "/properties/amanta/",
        property_name: "Amanta",
        main_image: "/assets/properties/amanta-4.jpg",
        property_tagline_1: "",
        property_tagline_1_img: "",
        property_tagline_2: "",
        property_tagline_2_img: "",
        property_brief: "",
        property_brief_cover_img: "",
        specs_cover_image: "/assets/properties/amanta-2.jpg",
        configuration: "2 & 3 BHK Villas",
        land_area: "0.5 acre",
        features: "Private pool & lawn",
        location: "Saligao, Goa",
        google_map_url: "",
        possession: "Under construction",
        meta_title: "Amanta | Luxury Homes for Sale in Goa | RIO",
        meta_description:
          "Step into luxury with Amanta by RIO Luxury Homes, premium villas with private pool for sale in Saligao, Goa. For those who never settle.",
        development_status: "ongoing",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "7",
        canonical_url: "https://rioluxuryhomes.in/properties/amanta/",
        redirect_301: "n",
      },
      "rio-foresta": {
        property_url: "/properties/rio-foresta/",
        property_name: "RIO Foresta",
        main_image: "/assets/properties/rio-foresta-main.webp",
        property_tagline_1: "TROPICAL MODERN HOMES",
        property_tagline_1_img: "",
        property_tagline_2: "Where Modern Living Meets Nature",
        property_tagline_2_img: "/assets/properties/rio-foresta-main.webp",
        property_brief:
          "Indulge in the ultimate ecosystem of palatial aesthetics and a sanctuary of tranquility. With floor-to-ceiling glass walls, Foresta is a truly curated, bespoke home that combines global architectural inspiration with the best of contemporary aesthetics in the lap of nature.",
        property_brief_cover_img:
          "/assets/properties/rio-foresta-brief-cover.webp",
        specs_cover_image: "/assets/properties/rio-foresta-specs.webp",
        configuration: "4 BHK Villas",
        land_area: "",
        features:
          "Flat roofs, indoor-outdoor concept, natural light; Near Assagao, Siolim, and Moira",
        location: "Nachinola, Goa",
        google_map_url: "",
        possession: "Under construction",
        meta_title: "RIO Foresta | Premium Villas for Sale in Goa | RIO",
        meta_description:
          "Be extraordinary at RIO Foresta, luxury homes for sale in Nachinola, Goa. Bathed in natural light, near Assagao, Siolim, and Moira.",
        development_status: "ongoing",
        is_sold_out: "n",
        property_status: "a",
        sort_order: "8",
        canonical_url: "https://rioluxuryhomes.in/properties/rio-foresta/",
        redirect_301: "n",
      },
    };

    // Get property data or default to the-hills-estate
    const propertyData =
      properties[propertyName] || properties["the-hills-estate"];

    // Property gallery images
    const galleryImages = {
      "the-hills-estate": [
        {
          image_title: "External View",
          image_name:
            "/assets/properties/The_Hills_Estate_ Villa_External_1.jpg",
        },
        {
          image_title: "Bedroom",
          image_name: "/assets/properties/The_Hills_Estate_ bedroom.jpg",
        },
        {
          image_title: "External View",
          image_name: "/assets/properties/The_Hills_Estate_Villa_external.jpg",
        },
        {
          image_title: "Kitchen",
          image_name: "/assets/properties/The_Hills_Estate_Kitchen.jpg",
        },
        {
          image_title: "Overview",
          image_name: "/assets/properties/The_Hills_Estate_view.jpg",
        },
        {
          image_title: "Close Up",
          image_name:
            "/assets/properties/The_Hills_Estate_villa_close_up_2.jpg",
        },
        {
          image_title: "Close Up",
          image_name: "/assets/properties/The_Hills_Estate_Close_up.jpg",
        },
        {
          image_title: "Living Room",
          image_name: "/assets/properties/The_Hills_Estate_living.jpg",
        },
      ],
      "the-village": [
        {
          image_title: "Outdoor",
          image_name: "/assets/properties/1_The_Village_Villa_ outdoor.jpg",
        },
        {
          image_title: "Outdoor",
          image_name: "/assets/properties/2_The_Village_Villa_ outdoor.jpg",
        },
        {
          image_title: "Outdoor",
          image_name: "/assets/properties/3_The_Village_Villa_ outdoor.jpg",
        },
        {
          image_title: "Outdoor",
          image_name: "/assets/properties/4_The_Village_Villa_outdoor.jpg",
        },
        {
          image_title: "Outdoor",
          image_name: "/assets/properties/5_The_Village_Villa_outdoor.jpg",
        },
        {
          image_title: "Outdoor",
          image_name: "/assets/properties/6_The_Village_Villa_outdoor.jpg",
        },
        {
          image_title: "Outdoor",
          image_name: "/assets/properties/7_The_Village_Villa_outdoor.jpg",
        },
        {
          image_title: "Living Room",
          image_name: "/assets/properties/8_The_Village_Living.jpg",
        },
        {
          image_title: "Bathroom",
          image_name: "/assets/properties/9_The_Village_Bathroom.jpg",
        },
        {
          image_title: "Bedroom",
          image_name: "/assets/properties/10_The_Village_Bedroom.jpg",
        },
      ],
      "casa-brilhante": [
        {
          image_title: "POOL SIDE",
          image_name: "/assets/properties/Casa-Brilhante-Poolside.jpg",
        },
        {
          image_title: "FOYER",
          image_name: "/assets/properties/Casa-Brilhante-Foyer.jpg",
        },
        {
          image_title: "BALCONY",
          image_name: "/assets/properties/Casa-Brilhante-Balcony.jpg",
        },
        {
          image_title: "BEDROOM",
          image_name: "/assets/properties/Casa-Brilhante-Bedroom.jpg",
        },
      ],
      "rumah-hutan-1": [
        {
          image_title: "POOL SIDE",
          image_name: "/assets/properties/rumah_1-pool_deck.jpg",
        },
        {
          image_title: "BEDROOM",
          image_name:
            "/assets/properties/rumah-hutan-master-bedroom-2000x1000-1.webp",
        },
        {
          image_title: "KITCHEN",
          image_name: "/assets/properties/rumah-kitchen.jpg",
        },
      ],
      "rio-royale": [
        {
          image_title: "LIVING ROOM",
          image_name: "/assets/properties/RIO-Royale-Living-Room.jpg",
        },
        {
          image_title: "BATHROOM",
          image_name: "/assets/properties/RIO-Royale-Bathroom.jpg",
        },
        {
          image_title: "KITCHEN",
          image_name: "/assets/properties/RIO-Royale-Kitchen.jpg",
        },
      ],
      "rio-estilo": [
        {
          image_title: "POOL",
          image_name: "/assets/properties/RIO-Estilo-Main-Pool-Deck-1.jpg",
        },
        {
          image_title: "LIVING ROOM",
          image_name: "/assets/properties/RIO-Estilo-Living-Room.jpg",
        },
        {
          image_title: "DINING ROOM",
          image_name: "/assets/properties/RIO-Estilo-Dining-Room.jpg",
        },
        {
          image_title: "BATHROOM",
          image_name: "/assets/properties/RIO-Estilo-Bathroom.jpg",
        },
      ],
      "rio-foresta": [],
      "stone-wall": [],
      "rio-estado": [],
      "black-forest": [],
      "a-cappella": [],
      "6-assagao": [],
      amanta: [],
    };

    // Property villas data
    const villaData = {
      "casa-brilhante": [
        {
          villa_id: "OGxkcW52aFNEbUdUdFEyZEo1dm1TUT09",
          villa_name: "Casa Brilhante",
          daily_rent: "40,000",
          gross_monthly: {
            share_40: "4,80,000",
            share_60: "7,20,000",
            share_80: "9,60,000",
          },
          gross_yearly: {
            share_40: "57,60,000",
            share_60: "86,40,000",
            share_80: "1,15,20,000",
          },
        },
      ],
      "rumah-hutan-1": [
        {
          villa_id: "RXZDRDN3aFRHM040Q0xmakJEMno5dz09",
          villa_name: "Rumah Hutan Villa 1",
          daily_rent: "60,000",
          gross_monthly: {
            share_40: "7,20,000",
            share_60: "10,80,000",
            share_80: "14,40,000",
          },
          gross_yearly: {
            share_40: "86,40,000",
            share_60: "1,29,60,000",
            share_80: "1,72,80,000",
          },
        },
        {
          villa_id: "aWZueFdNTjJ5TGY2R2NmOFlVNGlYQT09",
          villa_name: "Rumah Hutan Villa 2",
          daily_rent: "30,000",
          gross_monthly: {
            share_40: "3,60,000",
            share_60: "5,40,000",
            share_80: "7,20,000",
          },
          gross_yearly: {
            share_40: "43,20,000",
            share_60: "64,80,000",
            share_80: "86,40,000",
          },
        },
        {
          villa_id: "dkg2K3BpUWZYYjE0Q2VneEJZRVVTdz09",
          villa_name: "Rumah Hutan Villa 3",
          daily_rent: "30,000",
          gross_monthly: {
            share_40: "3,60,000",
            share_60: "5,40,000",
            share_80: "7,20,000",
          },
          gross_yearly: {
            share_40: "43,20,000",
            share_60: "64,80,000",
            share_80: "86,40,000",
          },
        },
        {
          villa_id: "REdZU0Q1RHZ5dUhvcTMvQUdoUlROUT09",
          villa_name: "Rumah Hutan Villa 4",
          daily_rent: "40,000",
          gross_monthly: {
            share_40: "4,80,000",
            share_60: "7,20,000",
            share_80: "9,60,000",
          },
          gross_yearly: {
            share_40: "57,60,000",
            share_60: "86,40,000",
            share_80: "1,15,20,000",
          },
        },
        {
          villa_id: "V2hkclU5R1JUbDd6ay9Ta0dRVzdJQT09",
          villa_name: "Rumah Hutan Villa 5",
          daily_rent: "35,000",
          gross_monthly: {
            share_40: "4,20,000",
            share_60: "6,30,000",
            share_80: "8,40,000",
          },
          gross_yearly: {
            share_40: "50,40,000",
            share_60: "75,60,000",
            share_80: "1,00,80,000",
          },
        },
        {
          villa_id: "aG4xOGZYT2dkZnFZbjN0N2JVK1RlUT09",
          villa_name: "Rumah Hutan Villa 6",
          daily_rent: "35,000",
          gross_monthly: {
            share_40: "4,20,000",
            share_60: "6,30,000",
            share_80: "8,40,000",
          },
          gross_yearly: {
            share_40: "50,40,000",
            share_60: "75,60,000",
            share_80: "1,00,80,000",
          },
        },
        {
          villa_id: "NUlyTE5scUl5ZWVIb1hhbXhsenhBQT09",
          villa_name: "Rumah Hutan Villa 7",
          daily_rent: "35,000",
          gross_monthly: {
            share_40: "4,20,000",
            share_60: "6,30,000",
            share_80: "8,40,000",
          },
          gross_yearly: {
            share_40: "50,40,000",
            share_60: "75,60,000",
            share_80: "1,00,80,000",
          },
        },
        {
          villa_id: "TUZ0Qkd3TmoyeEd2eVM4QktqY1dwZz09",
          villa_name: "Rumah Hutan Villa 8",
          daily_rent: "35,000",
          gross_monthly: {
            share_40: "4,20,000",
            share_60: "6,30,000",
            share_80: "8,40,000",
          },
          gross_yearly: {
            share_40: "50,40,000",
            share_60: "75,60,000",
            share_80: "1,00,80,000",
          },
        },
      ],
      "rio-estado": [
        {
          villa_id: "ODVDeDQvOHhGdTZjckdRZlVlMlNRdz09",
          villa_name: "RIO ESTADO",
          daily_rent: "30,000",
          gross_monthly: {
            share_40: "3,60,000",
            share_60: "5,40,000",
            share_80: "7,20,000",
          },
          gross_yearly: {
            share_40: "43,20,000",
            share_60: "64,80,000",
            share_80: "86,40,000",
          },
        },
      ],
      "rio-royale": [
        {
          villa_id: "cTQzL2NyQWcwNDFWN0lNQ0N0ZVhhdz09",
          villa_name: "RIO ROYAL 1 BHK",
          daily_rent: "6,000",
          gross_monthly: {
            share_40: "72,000",
            share_60: "1,08,000",
            share_80: "1,44,000",
          },
          gross_yearly: {
            share_40: "8,64,000",
            share_60: "12,96,000",
            share_80: "17,28,000",
          },
        },
        {
          villa_id: "RFVSaTRmUWZNQXBmQWN3c0tHVUhvZz09",
          villa_name: "RIO ROYAL 2 BHK",
          daily_rent: "10,000",
          gross_monthly: {
            share_40: "1,20,000",
            share_60: "1,80,000",
            share_80: "2,40,000",
          },
          gross_yearly: {
            share_40: "14,40,000",
            share_60: "21,60,000",
            share_80: "28,80,000",
          },
        },
        {
          villa_id: "SitGREVpMFRoLzdVSjB0NWhiSnhaQT09",
          villa_name: "RIO ROYAL DUPLEXES",
          daily_rent: "12,000",
          gross_monthly: {
            share_40: "1,44,000",
            share_60: "2,16,000",
            share_80: "2,88,000",
          },
          gross_yearly: {
            share_40: "17,28,000",
            share_60: "25,92,000",
            share_80: "34,56,000",
          },
        },
        {
          villa_id: "c0hhVHhVS0NUZnRmQnZkMlB3eGtSQT09",
          villa_name: "RIO ROYAL 3BHK Penthouses",
          daily_rent: "15,000",
          gross_monthly: {
            share_40: "1,80,000",
            share_60: "2,70,000",
            share_80: "3,60,000",
          },
          gross_yearly: {
            share_40: "21,60,000",
            share_60: "32,40,000",
            share_80: "43,20,000",
          },
        },
      ],
      "black-forest": [
        {
          villa_id: "RGFjaDBNZlZjdHA3MlJwL0grMXo1Zz09",
          villa_name: "Black Forest",
          daily_rent: "60,000",
          gross_monthly: {
            share_40: "7,20,000",
            share_60: "10,80,000",
            share_80: "14,40,000",
          },
          gross_yearly: {
            share_40: "86,40,000",
            share_60: "1,29,60,000",
            share_80: "1,72,80,000",
          },
        },
      ],
      "rio-estilo": [
        {
          villa_id: "aFR1dko2UmpJV25mVTdSSGdya1YyZz09",
          villa_name: "RIO Estio 3 BHk",
          daily_rent: "30,000",
          gross_monthly: {
            share_40: "3,60,000",
            share_60: "5,40,000",
            share_80: "7,20,000",
          },
          gross_yearly: {
            share_40: "43,20,000",
            share_60: "64,80,000",
            share_80: "86,40,000",
          },
        },
      ],
      "rio-foresta": [],
      "the-hills-estate": [],
      "the-village": [],
      "stone-wall": [],
      "a-cappella": [],
      "6-assagao": [],
      amanta: [],
    };

    const dummyData = {
      status: "success",
      response_data: {
        property_details: propertyData,
        property_gallery: galleryImages[propertyName] || [],
        property_villas: villaData[propertyName] || [],
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
