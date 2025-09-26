"use client";
import { useEffect, useState } from "react";
import PropertyItem from "../PropertyItem/PropertyItem";
import endpoints from "../../config/endpoints";
import { fetchDataPost } from "../../utils/fetchData";

const PropertiesListing = () => {
  const [completedProperties, setCompletedProperties] = useState([]);
  const [ongoingProperties, setOngoingProperties] = useState([]);
  const [upcomingProperties, setUpcomingProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [activeTab, setActiveTab] = useState("tab2");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const fetchProperties = async () => {
    try {
      const url = `${endpoints.getProperties}`;
      const response = await fetchDataPost(url);

      if (response && response.status === "success" && response.response_data) {
        const { properties } = response.response_data;
        setCompletedProperties(properties.completed || []);
        setOngoingProperties(properties.ongoing || []);
        setUpcomingProperties(properties.upcoming || []);
        setAllProperties(properties.all_properties || []);
      } else {
        console.error("Failed to fetch properties or API endpoint not available");
        // Set empty arrays to prevent crashes
        setCompletedProperties([]);
        setOngoingProperties([]);
        setUpcomingProperties([]);
        setAllProperties([]);
      }
    } catch (e) {
      console.error("Error fetching properties:", e);
      // Set empty arrays to prevent crashes
      setCompletedProperties([]);
      setOngoingProperties([]);
      setUpcomingProperties([]);
      setAllProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <section
      id="properties-listing"
      className="catagories text-change bgwhite scroll-smooth sticky snap-scroll categories-tabs"
      data-sidebar-title="Properties"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="catagories-tabs">
            <div className="tabs-container">
              <div className="tabs">
                <div
                  className={`tab ${activeTab === "tab4" ? "active" : ""}`}
                  data-tab="tab4"
                  tabIndex="0"
                  onClick={() => handleTabClick("tab4")}
                >
                  All Properties
                </div>
                <div
                  className={`tab ${activeTab === "tab1" ? "active" : ""}`}
                  data-tab="tab1"
                  tabIndex="0"
                  onClick={() => handleTabClick("tab1")}
                >
                  Completed
                </div>
                <div
                  className={`tab ${activeTab === "tab2" ? "active" : ""}`}
                  data-tab="tab2"
                  tabIndex="0"
                  onClick={() => handleTabClick("tab2")}
                >
                  Ongoing
                </div>
                <div
                  className={`tab ${activeTab === "tab3" ? "active" : ""}`}
                  data-tab="tab3"
                  tabIndex="0"
                  onClick={() => handleTabClick("tab3")}
                >
                  Upcoming
                </div>
              </div>

              <div className="tab-content-wrapper">
                <div
                  className={`tab-content ${
                    activeTab === "tab4" ? "active" : ""
                  }`}
                  id="tab4"
                >
                  <div className="tab-body">
                    <div className="catagories-container">
                      {allProperties.map((property, index) => (
                        <PropertyItem
                          key={index}
                          title={property.property_name || "Property"}
                          imageUrl={property.main_image || "/placeholder.jpg"}
                          status={property.development_status}
                          propertiesURLId={property.property_url || "/properties/"}
                          is_sold_out={property.is_sold_out}
                          configuration={property.configuration || ""}
                          location={property.location || ""}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Completed Properties */}
                <div
                  className={`tab-content ${
                    activeTab === "tab1" ? "active" : ""
                  }`}
                  id="tab1"
                >
                  <div className="tab-body">
                    <div className="catagories-container">
                      {completedProperties.map((property, index) => (
                        <PropertyItem
                          key={index}
                          title={property.property_name || "Property"}
                          imageUrl={property.main_image || "/placeholder.jpg"}
                          status={property.development_status}
                          propertiesURLId={property.property_url || "/properties/"}
                          is_sold_out={property.is_sold_out}
                          configuration={property.configuration || ""}
                          location={property.location || ""}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ongoing Properties */}
                <div
                  className={`tab-content ${
                    activeTab === "tab2" ? "active" : ""
                  }`}
                  id="tab2"
                >
                  <div className="tab-body">
                    <div className="catagories-container">
                      {ongoingProperties.map((property, index) => (
                        <PropertyItem
                          key={index}
                          title={property.property_name || "Property"}
                          imageUrl={property.main_image || "/placeholder.jpg"}
                          status={property.development_status}
                          propertiesURLId={property.property_url || "/properties/"}
                          is_sold_out={property.is_sold_out}
                          configuration={property.configuration || ""}
                          location={property.location || ""}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upcoming Properties */}
                <div
                  className={`tab-content ${
                    activeTab === "tab3" ? "active" : ""
                  }`}
                  id="tab3"
                >
                  <div className="tab-body">
                    <div className="catagories-container">
                      {upcomingProperties.map((property, index) => (
                        <PropertyItem
                          key={index}
                          title={property.property_name || "Property"}
                          imageUrl={property.main_image || "/placeholder.jpg"}
                          status={property.development_status}
                          propertiesURLId={property.property_url || "/properties/"}
                          is_sold_out={property.is_sold_out}
                          configuration={property.configuration || ""}
                          location={property.location || ""}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesListing;
