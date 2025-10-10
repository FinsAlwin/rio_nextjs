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
import ContactUsButton from "../../components/ContactUsButton/ContactUsButton";
import Footer from "../../components/Footer/Footer";
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
            // Scroll snap disabled
            // if (element && typeof window !== "undefined") {
            //   // Dynamic import to prevent SSR issues
            //   import("scroll-snap").then(({ default: createScrollSnap }) => {
            //     const snapInstance = createScrollSnap(element, {
            //       snapDestinationX: "0%",
            //       snapDestinationY: "100%",
            //       timeout: 100,
            //       duration: 300,
            //       threshold: 0.1,
            //     });
            //     if (element.style) {
            //       element.style.scrollSnapType = "y mandatory";
            //     }
            //     snapInstance.bind();
            //
            //     // Cleanup on component unmount or screen size change
            //     return () => {
            //       snapInstance.unbind();
            //     };
            //   }).catch((error) => {
            //     console.warn("ScrollSnap import error:", error);
            //   });
            // }
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
  const fetchPropertyData = async (propertyId) => {
    try {
      // Use fetch directly instead of the problematic fetchDataPost
      const response = await fetch('/api/get-property-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_url: `/properties/${propertyId}/`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.status === "success") {
        return data.response_data;
      } else {
        throw new Error(`API returned error status: ${data.status || 'unknown'}`);
      }
    } catch (error) {
      console.error("Error fetching property data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadPropertyData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPropertyData(propertiesURLId);
        setPropertyDetails(data.property_details);
        setPropertyGallery(data.property_gallery);
        setPropertyVillas(data.property_villas);
      } catch (error) {
        console.error("Error loading property data:", error);
        // Set fallback data or show error state
        setPropertyDetails(null);
        setPropertyGallery([]);
        setPropertyVillas([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (propertiesURLId) {
      loadPropertyData();
    }
  }, [propertiesURLId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!propertyDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist or has been removed.</p>
          <a 
            href="/properties" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View All Properties
          </a>
        </div>
      </div>
    );
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
          features={propertyDetails.features}
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
          <RentCalculator propertiesURLId={propertiesURLId} propertyVillas={propertyVillas} />
        </section>
      )}

          

      {/* <section data-logo-type="logo-dark-v" data-sidebar-title="">
          <RoamSection />
        </section> */}
      <section data-logo-type="logo-dark-v" data-sidebar-title="Overseas">
        <Projects />
      </section>

      <section data-logo-type="logo-dark-v" data-sidebar-title="Contact Us">
        {/* <PropertiesFooter /> */}
        <Footer />
      </section>
      <ContactUsButton />
      <WhatsAppPopup />
      <SliderBar sidebarTitle={sidebarTitle} backgroundType={backgroundType} />
    </>
  );
}

export default PropertiesContent;
