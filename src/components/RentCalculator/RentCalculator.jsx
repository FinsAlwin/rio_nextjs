"use client";
import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom"; // Removed for Next.js
import Image from "next/image";
import "./RentCalculator.css";

const RentCalculator = ({ propertiesURLId, propertyVillas = [] }) => {
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
  // Function to parse comma-separated numbers
  const parseNumber = (value) => {
    if (typeof value === 'string') {
      return Number(value.replace(/,/g, '')) || 0;
    }
    return Number(value) || 0;
  };

  // Function to format numbers with commas
  const formatNumber = (value) => {
    return value.toLocaleString('en-IN');
  };

  // Function to update estimates
  const updateEstimates = (villa, share) => {
    if (!villa || !share) {
      return;
    }

    // Safely access villa properties with fallbacks
    const dailyRent = parseNumber(villa.daily_rent);
    const monthlyIncome = parseNumber(villa.gross_monthly?.[`share_${share}`]);
    const yearlyIncome = parseNumber(villa.gross_yearly?.[`share_${share}`]);

    setEstimatedRent(dailyRent);
    setMonthlyIncome(monthlyIncome);
    setYearlyIncome(yearlyIncome);
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
    // Use villa data passed as prop instead of fetching
    if (propertyVillas && propertyVillas.length > 0) {
      setVillas(propertyVillas);
    } else {
      setVillas([]);
    }
  }, [propertyVillas]);

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
            className="image-container"
            ref={imageRef}
            style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}
          >
            <Image 
              src="/properties_image/rumah_1-bedroom_image.webp" 
              alt="Bedroom" 
              width={800}
              height={600}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
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
                        {formatNumber(estimatedRent)}
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
                        {formatNumber(monthlyIncome)}
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
                        {formatNumber(yearlyIncome)}
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
