"use client";
import { useEffect, useRef, useState } from "react";
// import createScrollSnap from "scroll-snap"; // Conditional import to prevent SSR issues // Ensure this is working correctly
import endpoints from "../../config/endpoints";
import { fetchDataPost } from "../../utils/fetchData";
// import { useParams } from "react-router-dom"; // Removed for Next.js
import DynamicMeta from "../../components/DynamicMeta/DynamicMeta";
import Header from "../../components/Header/Header";
import PropertiesSection2 from "../../components/PropertiesSection2/PropertiesSection2";
import PropertiesSection1 from "../../components/PropertiesSection1/PropertiesSection1";
import GallerySlider from "../../components/GallerySlider/GallerySlider";
import PropertyDetails from "../../components/PropertyDetails/PropertyDetails";
import RentCalculator from "../../components/RentCalculator/RentCalculator";
import RoamSection from "../../components/RoamSection/RoamSection";
import Projects from "../../components/Projects/Projects";
import SliderBar from "../../components/SliderBar/SliderBar";
import PropertiesFooter from "../../components/PropertiesFooter/PropertiesFooter";
import PropertyDescription from "../../components/PropertyDescription/PropertyDescription";
import WhatsAppPopup from "../../components/WhatsAppPopup/WhatsAppPopup";
const stripHTMLTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};
function PropertiesContent({ propertiesURLId }) {
  const [logoType, setLogoType] = useState("logo-dark");
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [propertyGallery, setPropertyGallery] = useState([]);
  const [propertyVillas, setPropertyVillas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);
  const [sidebarTitle, setSidebarTitle] = useState("");
  const [backgroundType, setBackgroundType] = useState("");
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-logo-type]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust the threshold as needed
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sidebarTitle = entry.target.getAttribute("data-sidebar-title");

          setLogoType(entry.target.getAttribute("data-logo-type"));
          setSidebarTitle(sidebarTitle);

          if (sidebarTitle === "Selects") {
            setBackgroundType(currentSlide % 2 === 0 ? "bgwhite" : "bgdark");
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Apply scroll snap after the DOM has fully loaded using setTimeout to simulate $(document).ready
  useEffect(() => {
    const initializeScrollSnap = () => {
      if (containerRef.current && window.innerWidth > 768) {
        // Set a width threshold for larger screens
        const element = containerRef.current;
        console.log(element);

        // Initialize scroll snap on the container
        try {
          if (element && typeof window !== "undefined") {
            // Dynamic import to prevent SSR issues
            import("scroll-snap").then(({ default: createScrollSnap }) => {
              const snapInstance = createScrollSnap(element, {
                snapDestinationX: "0%",
                snapDestinationY: "100%",
                timeout: 100,
                duration: 300,
                threshold: 0.1,
              });
              if (element.style) {
                element.style.scrollSnapType = "y mandatory";
              }
              snapInstance.bind();

              // Cleanup on component unmount or screen size change
              return () => {
                snapInstance.unbind();
              };
            }).catch((error) => {
              console.warn("ScrollSnap import error:", error);
            });
          }
        } catch (error) {
          console.warn("ScrollSnap error:", error);
        }
      }
    };

    // Delay to ensure DOM is ready
    let timeoutId;
    if (typeof window !== "undefined") {
      timeoutId = setTimeout(() => {
        initializeScrollSnap();
      }, 200);
    }

    // Cleanup timer on component unmount
    return () => clearTimeout(timeoutId);
  }, [containerRef]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-logo-type]");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLogoType(entry.target.getAttribute("data-logo-type"));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  const getPropertyData = (propertyId) => {
    // Define different properties based on URL
    const properties = {
      "the-village": {
        id: 1,
        property_name: "The Village",
        location: "Goa, India",
        price: "₹3.8 Cr",
        main_image: "/homepage_images/rio-estado-master-bedroom_web.webp",
        description: "Experience luxury living in The Village, a premium residential development featuring modern villas with contemporary design and world-class amenities.",
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
        features_text: "Private Pool, Modern Kitchen, Master Bedroom Suite, Garden, Parking, 24/7 Security",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/rio-estado-master-bedroom_web.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief: "The Village represents the pinnacle of luxury living in Goa. Each villa is meticulously designed with contemporary architecture, featuring spacious layouts, premium finishes, and modern amenities. The development offers a perfect blend of privacy and community living, with beautifully landscaped gardens, recreational facilities, and round-the-clock security.",
        property_brief_cover_img: "/homepage_images/home_casa_rumah.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Where Luxury Meets Serenity",
        property_tagline_1_img: "/homepage_images/black_forest_image.webp",
        property_url: "/properties/the-village/",
        meta_title: "The Village | Luxury Villas in Goa | RIO Luxury Homes",
        meta_description: "Discover The Village - premium luxury villas in Goa with modern amenities, private pools, and world-class facilities.",
        canonical_url: "https://rioluxuryhomes.com/properties/the-village/",
      },
      "rio-estado-villa": {
        id: 2,
        property_name: "Rio Estado Villa",
        location: "Goa, India",
        price: "₹2.5 Cr",
        main_image: "/homepage_images/rio-estado-master-bedroom_web.webp",
        description: "Luxury villa with modern amenities and stunning views in the heart of Goa.",
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
        features_text: "Private Pool, Garden, Parking, Security, Modern Kitchen, Master Bedroom",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/rio-estado-master-bedroom_web.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief: "Rio Estado Villa offers an exceptional living experience in the heart of Goa. This beautifully designed villa combines modern architecture with traditional Goan charm, featuring spacious interiors, premium amenities, and stunning views of the surrounding landscape.",
        property_brief_cover_img: "/homepage_images/rio-estado-master-bedroom_web.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Modern Living in Traditional Goa",
        property_tagline_1_img: "/homepage_images/home_casa_rumah.webp",
        property_url: "/properties/rio-estado-villa/",
        meta_title: "Rio Estado Villa | Luxury Villa in Goa",
        meta_description: "Experience luxury living in Rio Estado Villa, Goa. Modern amenities, stunning views, and premium location.",
        canonical_url: "https://rioluxuryhomes.com/properties/rio-estado-villa/",
      },
      "casa-rumah": {
        id: 3,
        property_name: "Casa Rumah",
        location: "Goa, India",
        price: "₹3.2 Cr",
        main_image: "/homepage_images/home_casa_rumah.webp",
        description: "Premium villa with pool and garden, offering the perfect blend of luxury and comfort.",
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
        features_text: "Private Pool, Premium Kitchen, Master Suite, Garden, Parking, Security",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/home_casa_rumah.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief: "Casa Rumah embodies the essence of luxury living in Goa. This exquisite villa features contemporary design elements, premium finishes, and thoughtfully planned spaces that maximize comfort and functionality. The property offers a perfect retreat for families seeking both privacy and community living.",
        property_brief_cover_img: "/homepage_images/home_casa_rumah.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Premium Living Redefined",
        property_tagline_1_img: "/homepage_images/card_image_3.webp",
        property_url: "/properties/casa-rumah/",
        meta_title: "Casa Rumah | Premium Villa in Goa | RIO Luxury Homes",
        meta_description: "Discover Casa Rumah - premium villa with pool and garden in Goa. Luxury living with modern amenities.",
        canonical_url: "https://rioluxuryhomes.com/properties/casa-rumah/",
      },
      "black-forest": {
        id: 4,
        property_name: "Black Forest",
        location: "Goa, India",
        price: "₹4.1 Cr",
        main_image: "/homepage_images/black_forest_image.webp",
        description: "Exclusive villa in forest setting, offering privacy and tranquility in nature's embrace.",
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
        features_text: "Private Pool, Forest View, Master Suite, Garden, Parking, Security",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/black_forest_image.webp",
        google_map_url: "https://maps.google.com/?q=Goa,India",
        // Additional fields for PropertyDescription component
        property_brief: "Black Forest offers a unique living experience surrounded by nature's beauty. This exclusive villa provides the perfect escape from city life while maintaining all modern conveniences. The property features expansive spaces, premium amenities, and breathtaking views of the surrounding forest landscape.",
        property_brief_cover_img: "/homepage_images/black_forest_image.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Nature's Luxury Retreat",
        property_tagline_1_img: "/homepage_images/card_image_1.webp",
        property_url: "/properties/black-forest/",
        meta_title: "Black Forest | Exclusive Villa in Goa | RIO Luxury Homes",
        meta_description: "Experience Black Forest - exclusive villa in forest setting. Privacy and tranquility in Goa.",
        canonical_url: "https://rioluxuryhomes.com/properties/black-forest/",
      },
      "phuket-resort": {
        id: 5,
        property_name: "Rio Phuket Resort",
        location: "Phuket, Thailand",
        price: "₹5.8 Cr",
        main_image: "/homepage_images/phuket_image.webp",
        description: "Beachfront luxury resort offering unparalleled ocean views and world-class amenities in the heart of Phuket.",
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
        features_text: "Private Beach Access, Ocean View, Master Suite, Garden, Parking, Security",
        possession: "Ready to Move In",
        specs_cover_image: "/homepage_images/phuket_image.webp",
        google_map_url: "https://maps.google.com/?q=Phuket,Thailand",
        // Additional fields for PropertyDescription component
        property_brief: "Rio Phuket Resort represents the ultimate in beachfront luxury living. This magnificent villa offers direct beach access, panoramic ocean views, and world-class amenities. Experience the perfect blend of tropical paradise and modern luxury in one of Thailand's most prestigious locations.",
        property_brief_cover_img: "/homepage_images/phuket_image.webp",
        // Additional fields for PropertiesSection2 component
        property_tagline_1: "Beachfront Paradise Awaits",
        property_tagline_1_img: "/homepage_images/phuket_image.webp",
        property_url: "/properties/phuket-resort/",
        meta_title: "Rio Phuket Resort | Beachfront Luxury Resort | RIO Luxury Homes",
        meta_description: "Experience Rio Phuket Resort - beachfront luxury resort with ocean views and world-class amenities in Phuket.",
        canonical_url: "https://rioluxuryhomes.com/properties/phuket-resort/",
      },
    };

    // Get property data or default to Rio Estado Villa
    const propertyData = properties[propertyId] || properties["rio-estado-villa"];

    return {
      property_details: propertyData,
      property_gallery: propertyData.gallery_images.map((image, index) => {
        const roomTitles = [
          "MASTER BEDROOM",
          "LIVING ROOM", 
          "KITCHEN",
          "BATHROOM",
          "GARDEN VIEW"
        ];
        return {
          id: index + 1,
          image_url: image,
          image_name: image,
          image_title: roomTitles[index] || `Room ${index + 1}`,
          alt_text: `${propertyData.property_name} - ${roomTitles[index] || `Image ${index + 1}`}`,
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
          price: `₹${parseInt(propertyData.price.replace(/[₹,Cr]/g, "")) + 0.5} Cr`,
          image: propertyData.gallery_images[1] || propertyData.main_image,
        },
      ],
    };
  };

  useEffect(() => {
    // Use dummy data instead of API call
    const data = getPropertyData(propertiesURLId);
    setPropertyDetails(data.property_details);
    setPropertyGallery(data.property_gallery);
    setPropertyVillas(data.property_villas);
    setIsLoading(false);
  }, [propertiesURLId]);

  if (isLoading) {
    return <div>Loading property details...</div>;
  }

  if (!propertyDetails) {
    return <div>Property details not found.</div>;
  }

  const description = propertyDetails?.meta_description
    ? stripHTMLTags(propertyDetails.meta_description).slice(0, 160)
    : "No description available for this property.";
  const title = propertyDetails?.meta_title;
  const canonicalUrl = propertyDetails?.canonical_url;

  return (
    <>
      <DynamicMeta
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
      />
      <Header logoType={logoType} />
      <section
        data-logo-type="logo-dark"
        data-sidebar-title={propertyDetails.property_name}
      >
        <PropertiesSection1
          property_name={propertyDetails.property_name}
          main_image={propertyDetails.main_image}
        />
      </section>
      {propertyDetails.property_tagline_1?.trim() &&
        propertyDetails.property_tagline_1_img?.trim() && (
          <section
            data-logo-type="logo-dark"
            data-sidebar-title={propertyDetails.property_name}
          >
            <PropertiesSection2
              property_tagline_1={propertyDetails.property_tagline_1}
              property_tagline_1_img={propertyDetails.property_tagline_1_img}
            />
          </section>
        )}
      <section
        data-logo-type="logo-dark-v"
        data-sidebar-title={propertyDetails.property_name}
      >
        <PropertyDetails
          configuration={propertyDetails.configuration}
          features={propertyDetails.features_text}
          google_map_url={propertyDetails.google_map_url}
          land_area={propertyDetails.land_area}
          location={propertyDetails.location}
          possession={propertyDetails.possession}
          specs_cover_image={propertyDetails.specs_cover_image}
        />
      </section>
      {propertyDetails.property_brief &&
        propertyDetails.property_brief.trim() !== "" &&
        propertyDetails.property_name &&
        propertyDetails.property_name.trim() !== "" &&
        propertyDetails.property_brief_cover_img &&
        propertyDetails.property_brief_cover_img.trim() !== "" && (
          <section
            data-logo-type="logo-dark"
            data-sidebar-title={propertyDetails.property_name}
          >
            <PropertyDescription
              property_brief={propertyDetails.property_brief}
              property_name={propertyDetails.property_name}
              property_brief_cover_img={
                propertyDetails.property_brief_cover_img
              }
            />
          </section>
        )}
      {propertyGallery && propertyGallery.length > 0 && (
        <section
          data-logo-type="logo-dark"
          data-sidebar-title={propertyDetails.property_name}
        >
          <GallerySlider propertyGallery={propertyGallery} />
        </section>
      )}

      {propertyVillas && propertyVillas.length > 0 && (
        <section
          data-logo-type="logo-dark-v"
          data-sidebar-title={propertyDetails.property_name}
        >
          <RentCalculator propertiesURLId={propertiesURLId} />
        </section>
      )}

      {/* <section data-logo-type="logo-dark-v" data-sidebar-title="">
          <RoamSection />
        </section> */}
      <section data-logo-type="logo-dark-v" data-sidebar-title="Overseas">
        <Projects />
      </section>

      <section data-logo-type="logo-dark" data-sidebar-title="">
        <PropertiesFooter />
      </section>
      <WhatsAppPopup />
      <SliderBar sidebarTitle={sidebarTitle} backgroundType={backgroundType} />
    </>
  );
}

export default PropertiesContent;
