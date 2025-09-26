"use client";
import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom"; // Removed for Next.js
import Image from "next/image";
import endpoints from "../../config/endpoints";
import { fetchDataPost } from "../../utils/fetchData";
import "./RentCalculator.css";

const RentCalculator = ({ propertiesURLId }) => {
  const [villas, setVillas] = useState([]); // State to hold villa data
  const [selectedVilla, setSelectedVilla] = useState("");
  const [estimatedRent, setEstimatedRent] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [selectedValue, setSelectedValue] = useState("40"); // Default to 40%
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null); // Reference for the image element

  // Update state based on screen size
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Create an intersection observer to detect when the image is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-image-active"); // Add active class when in view
        } else {
          entry.target.classList.remove("reveal-image-active"); // Remove active class when out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the image is in view
    );

    if (imageRef.current) {
      observer.observe(imageRef.current); // Start observing the image
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current); // Stop observing the image when component unmounts
      }
    };
  }, []);
  // Function to update estimates
  const updateEstimates = (villa, share) => {
    if (!villa || !share) {
      return;
    }

    // Safely access villa properties with fallbacks
    const dailyRent = Number(villa.daily_rent) || 0;
    const monthlyIncome = villa.gross_monthly?.[`share_${share}`] || 0;
    const yearlyIncome = villa.gross_yearly?.[`share_${share}`] || 0;

    setEstimatedRent(dailyRent);
    setMonthlyIncome(Number(monthlyIncome) || 0);
    setYearlyIncome(Number(yearlyIncome) || 0);
  };

  const handleVillaChange = (event) => {
    const selected = villas.find(
      (villa) => villa.villa_id === event.target.value
    );
    setSelectedVilla(selected);
    updateEstimates(selected, selectedValue); // Update estimates with default or selected share
  };

  const handleRangeItemClick = (value) => {
    setSelectedValue(value);
    if (selectedVilla) {
      updateEstimates(selectedVilla, value);
    }
  };

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const data = { property_url: `/properties/${propertiesURLId}/` };
        const url = `${endpoints.getPropertiesDetails}`;
        const response = await fetchDataPost(url, data);
        
        if (response && response.response_data && response.response_data.property_villas) {
          setVillas(response.response_data.property_villas);
        } else {
          console.warn("Property villas data not found or API endpoint not available");
          setVillas([]);
        }
      } catch (error) {
        console.error("Error fetching villas:", error);
        setVillas([]);
      }
    };

    fetchVillas();
  }, [propertiesURLId]);

  // Set initial estimates when villas are loaded and the default 40% is set
  useEffect(() => {
    if (villas.length > 0 && selectedValue === "40") {
      const defaultVilla = villas[0];
      setSelectedVilla(defaultVilla);
      updateEstimates(defaultVilla, "40");
    }
  }, [villas]);

  return (
    <section
      className="rent-calculator text-change bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Rumah Hutan"
    >
      <div className="top-blank-section h-10"></div>
      <div className="rent-calculator-container">
        <div className="left">
          <div
            className="image-container reveal-image reveal-image-active"
            ref={imageRef}
          >
            <Image src="/properties_image/rumah_1-bedroom_image.webp" alt="Bedroom" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className="right">
          <div className="rent-calculator-wrapper sb-custom sub-custom-rent-cal">
            <div className="calculator">
              <div className="col">
                <div className="col-left">
                  <div className="title-container">
                    <h3 className="title">Property Type</h3>
                  </div>
                </div>
                <div className="col-right">
                  <select
                    name="villaSelector"
                    id="villaSelector"
                    value={selectedVilla.villa_id || ""}
                    onChange={handleVillaChange}
                  >
                    <option value="">Select your villa</option>
                    {villas.map((villa, index) => (
                      <option key={`villa-${villa.villa_id || index}`} value={villa.villa_id}>
                        {villa.villa_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col noborder">
                <div className={`range-slider ${isDisabled ? "disabled" : ""}`}>
                  <div
                    className={`range-selector rolling-bar ${
                      isDisabled ? "disabled" : ""
                    }`}
                  >
                    <div
                      className={`range-item items a ${
                        selectedValue === "40" ? "selected active" : ""
                      }`}
                      data-value="40"
                      onClick={() => handleRangeItemClick("40")}
                    >
                      <span className="tooltip">40%</span>
                    </div>
                    <div
                      className={`range-item items b ${
                        selectedValue === "60" ? "selected active" : ""
                      }`}
                      data-value="60"
                      onClick={() => handleRangeItemClick("60")}
                    >
                      <span className="tooltip">60%</span>
                    </div>
                    <div
                      className={`range-item items c ${
                        selectedValue === "80" ? "selected active" : ""
                      }`}
                      data-value="80"
                      onClick={() => handleRangeItemClick("80")}
                    >
                      <span className="tooltip">80%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mg-t-30" id="estimates">
                <div className="col">
                  <div className="col-left">
                    <div className="title-container">
                      <h3 className="title">Estimated Rent</h3>
                    </div>
                  </div>
                  <div className="col-right">
                    <div className="price-col">
                      <div className="money-symb">₹</div>
                      <div className="amount rent estimatedRent">
                        {estimatedRent}
                      </div>
                      <div className="duration">/ night</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="col-left">
                    <div className="title-container">
                      <h3 className="title">Gross Monthly Income</h3>
                    </div>
                  </div>
                  <div className="col-right">
                    <div className="price-col">
                      <div className="money-symb">₹</div>
                      <div className="amount rent monthlyIncome">
                        {monthlyIncome}
                      </div>
                      <div className="duration">/ month</div>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="col-left">
                    <div className="title-container">
                      <h3 className="title">Gross Annual Income</h3>
                    </div>
                  </div>
                  <div className="col-right">
                    <div className="price-col">
                      <div className="money-symb">₹</div>
                      <div className="amount rent yearlyIncome">
                        {yearlyIncome}
                      </div>
                      <div className="duration">/ year</div>
                    </div>
                  </div>
                </div>
                <div className="col noborder">
                  <p className="alt">
                    <sup>*</sup> These are just estimates. Actual returns may
                    vary depending on a number of factors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentCalculator;
