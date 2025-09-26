"use client";
import { useEffect, useRef, useState } from "react";

import endpoints from "../../config/endpoints";
import { showToastError, showToastSuccess } from "../../utils/toast";
import formImage from "../../assets/contact_us_form_image/contact_form_image_web.webp";
import PhoneInput from "../PhoneInput/PhoneInput";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "./InvestContact.css";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
import { fetchDataPost } from "../../utils/fetchData";
const InvestContact = () => {
  const [formData, setFormData] = useState({
    yourName: "",
    phone: "",
    email: "",
    investment: "1-5 CR",
    hearAboutUs: "",
    countryCode: "in",
    dialingCode: "+91",
    agreeToTerms: false,
    gps_coordinates: "",
    investment_time: "",
    investment_type: "",
    location_options: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  // Request location permission on component mount

  useEffect(() => {
    const savedLocation = getLocalStorage("gps_coordinates");
    if (savedLocation) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        gps_coordinates: savedLocation,
      }));
      setLocationPermission(true);
    } else if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          fetchLocation();
        } else {
          // Request location directly without waiting for the user to approve the prompt manually
          navigator.geolocation.getCurrentPosition(
            (position) => {
              fetchLocation(position);
            },
            (error) => {
              console.warn("Location access denied:", error);
              setLocationPermission(false);
            }
          );
        }
      }).catch((error) => {
        console.warn("Geolocation permission query failed:", error);
        setLocationPermission(false);
      });
    }
  }, []);

  const fetchLocation = (position = null) => {
    if (position) {
      const { latitude, longitude } = position.coords;
      const gpsCoordinates = `${latitude},${longitude}`;

      setFormData((prevFormData) => ({
        ...prevFormData,
        gps_coordinates: gpsCoordinates,
      }));

      setLocalStorage("gps_coordinates", gpsCoordinates);
      setLocationPermission(true);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocation(position);
        },
        (error) => {
          console.warn("Error fetching location:", error);
          setLocationPermission(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Additional options
      );
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEmailChange = (e) => {
    const validCharacters = /^[a-zA-Z0-9@._-]*$/;
    if (validCharacters.test(e.target.value)) {
      setFormData({
        ...formData,
        email: e.target.value,
      });
    } else {
      e.preventDefault(); // Prevent invalid characters from being entered
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      agreeToTerms: e.target.checked,
    });
  };

  // Handle Radio Button Change
  const handleRadioChangeInvest = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  // Handle Checkbox Change (Convert to comma-separated string)
  const handleCheckboxChangeInvest = (event, fieldName) => {
    const { value, checked } = event.target;

    let updatedValue = formData[fieldName]
      ? formData[fieldName].split(", ")
      : [];

    if (checked) {
      updatedValue.push(value);
    } else {
      updatedValue = updatedValue.filter((item) => item !== value);
    }

    setFormData({
      ...formData,
      [fieldName]: updatedValue.length > 0 ? updatedValue.join(", ") : "", // Convert array to comma-separated string
    });
  };

  const handleCountryChange = (country_code, dialing_code) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      countryCode: country_code,
      dialingCode: dialing_code,
    }));
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone: phoneNumber,
    }));
  };

  const validatePhoneNumber = () => {
    const { phone, dialingCode } = formData;

    // Combine dialing code and phone number
    const fullPhoneNumber = `${dialingCode}${phone}`;
    const phoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Enter a valid phone number.";
    }

    return null;
  };
  const [dynamicStyle, setDynamicStyle] = useState({
    position: "relative",
    top: "-13px",
    right: "100px",
  });

  useEffect(() => {
    const updateStyle = () => {
      if (window.innerWidth === 1336) {
        setDynamicStyle({
          position: "relative",
          top: "-15px",
          right: "71px",
          fontSize: "12px",
        });
      } else {
        setDynamicStyle({
          position: "relative",
          top: "-15px",
          right: "69px",
          fontSize: "12px",
        });
      }
    };

    updateStyle(); // Set style initially
    window.addEventListener("resize", updateStyle);

    return () => window.removeEventListener("resize", updateStyle);
  }, []);
  const handleKeyDown = (e) => {
    // Allow only numeric inputs, backspace, delete, and arrow keys
    if (
      !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key) &&
      !/^\d$/.test(e.key)
    ) {
      e.preventDefault();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    const newErrors = {};
    // Validate form fields and display toast messages for each missing field
    if (!formData.yourName) {
      showToastError("Please enter your name.");
      return; // Stop form submission on error
    }
    if (!formData.phone) {
      showToastError("Please enter your phone number.");
      return; // Stop form submission on error
    }
    if (!formData.email) {
      showToastError("Please enter your email.");
      return; // Stop form submission on error
    }
    if (!formData.hearAboutUs) {
      showToastError("Please fill out this field.");
      return; // Stop form submission on error
    }
    if (!formData.investment) {
      showToastError("Please select an investment bracket.");
      return; // Stop form submission on error
    }
    if (!formData.agreeToTerms) {
      showToastError("You must agree to the terms and conditions.");
      return; // Stop form submission on error
    }

    const phoneError = validatePhoneNumber();
    if (phoneError) {
      showToastError(phoneError);
      return; // Stop form submission on error
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToastError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const data = { ...formData };
      const url = endpoints.contact;
      const response = await fetchDataPost(url, data, false);
      const { status, message } = response;

      if (status === "success") {
        setFormData({
          yourName: "",
          phone: "",
          email: "",
          investment: "1-5 CR",
          hearAboutUs: "",
          countryCode: "in",
          dialingCode: "+91",
          agreeToTerms: false,
          gps_coordinates: "",
          investment_time: "",
          investment_type: "",
          location_options: "",
        });
        showToastSuccess("Form submitted successfully!");
        setErrors({});
        setTimeout(() => {
          if (response.redirect) {
            window.location.href = response.redirect;
          }
        }, 2000);
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, general: message }));
        showToastError(message);
      }
    } catch (error) {
      showToastError("Error sending enquiry:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const imageRef = useRef(null);
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

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 1920);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section
      id="contactform"
      className="contactform-container invest-form text-change bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Contact Form"
    >
      <div className="dual-container flip invest-grid-lay">
        <div className="left">
          <div className="content-container new-content-container-invest">
            <div className="contact-form sb-custom new-invest-form">
              <form
                onSubmit={handleSubmit}
                aria-label="Contact form"
                noValidate
              >
                <div className="form-container new-invest-form-container">
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-item-label">
                        <p>
                          Name<sup>*</sup>
                        </p>
                      </div>
                      <p>
                        <input
                          size="40"
                          className="form-item-input new-contact-form-input phone-input-contact"
                          aria-required="true"
                          placeholder="Please enter your full name"
                          type="text"
                          name="yourName"
                          value={formData.yourName}
                          onChange={handleChange}
                        />
                        {errors.yourName &&
                          (isSmallScreen ? (
                            !isFormSubmitted && showToastError(errors.yourName)
                          ) : (
                            <p className="error-message">{errors.yourName}</p>
                          ))}
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-item-label contact-label">
                        <p>
                          Contact No.<sup>*</sup>
                        </p>
                      </div>

                      <div>
                        <PhoneInput onCountryChange={handleCountryChange} />
                        <input
                          size="40"
                          className="form-item-input phone-input-contact new-contact-form-input"
                          aria-required="true"
                          placeholder="Enter a 10-digit mobile number"
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          onKeyDown={handleKeyDown}
                        />
                        {errors.phone &&
                          (isSmallScreen ? (
                            !isFormSubmitted && showToastError(errors.phone)
                          ) : (
                            <p className="error-message">{errors.phone}</p>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-item-label email-label">
                        <p>
                          E-mail ID<sup>*</sup>
                        </p>
                      </div>
                      <p>
                        <input
                          size="40"
                          className="form-item-input phone-input-contact"
                          aria-required="true"
                          placeholder="Please enter your e-mail"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleEmailChange}
                        />

                        {errors.email &&
                          (isSmallScreen ? (
                            !isFormSubmitted && showToastError(errors.email)
                          ) : (
                            <p className="error-message">{errors.email}</p>
                          ))}
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col dual-items invest-form-label">
                      <div className="form-item-label investment-bracket-label">
                        <p>Investment Bracket</p>
                        {errors.investment &&
                          (isSmallScreen ? (
                            !isFormSubmitted &&
                            showToastError(errors.investment)
                          ) : (
                            <p className="error-message">{errors.investment}</p>
                          ))}
                      </div>

                      <div className="form-item-inner-col ">
                        <p>
                          <label className="new-set-label-form new-set-form-investmentlabel">
                            <input
                              type="radio"
                              name="investment"
                              value="1-5 CR"
                              onChange={handleChange}
                              className="radio-investment-btn"
                            />
                            <span style={dynamicStyle}>1-5 CR</span>
                          </label>
                          <label className="new-set-label-form new-set-form-investmentlabel new-form-investment-rb">
                            <input
                              type="radio"
                              name="investment"
                              value="5-15 CR"
                              className="radio-investment-btn"
                              onChange={handleChange}
                            />
                            <span style={dynamicStyle}>5-15 CR</span>
                          </label>
                          <label className="new-set-label-form new-set-form-investmentlabel">
                            <input
                              type="radio"
                              name="investment"
                              value="15+ CR"
                              className="radio-investment-btn"
                              onChange={handleChange}
                            />
                            <span style={dynamicStyle}>15+ CR</span>
                          </label>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* New Fields */}
                  {/* Investment Timeline */}
                  <div className="form-row">
                    <div className="form-col dual-items invest-form-label">
                      <div className="form-item-label invest-heading">
                        <p>
                          Investment Timeline<sup>*</sup>
                        </p>
                      </div>
                      <div className="invest-tab-line">
                        <label className="investment-timeline-labels">
                          <input
                            type="radio"
                            name="investment_time"
                            aria-required="true"
                            value="Immediate"
                            checked={formData.investment_time === "Immediate"}
                            onChange={(e) =>
                              handleRadioChangeInvest(e, "investment_time")
                            }
                            className="investment-timeline-input-label"
                          />
                          <span>Immediate</span>
                        </label>
                        <label className="investment-timeline-labels">
                          <input
                            type="radio"
                            name="investment_time"
                            aria-required="true"
                            value="Within 2 months"
                            checked={
                              formData.investment_time === "Within 2 months"
                            }
                            onChange={(e) =>
                              handleRadioChangeInvest(e, "investment_time")
                            }
                            className="investment-timeline-input-label"
                          />
                          <span>Within 2 months</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Investment Type */}
                  <div className="form-row">
                    <div className="form-col dual-items invest-form-label">
                      <div className="form-item-label invest-heading">
                        <p>
                          Investment Type<sup>*</sup>
                        </p>
                      </div>
                      <div className="invest-tab-line">
                        {["Joint Venture", "Bulk Buy", "Buy Back"].map(
                          (option) => (
                            <label
                              key={option}
                              className="investment-timeline-labels"
                            >
                              <input
                                type="checkbox"
                                name="investment_type"
                                aria-required="true"
                                value={option}
                                checked={formData.investment_type.includes(
                                  option
                                )}
                                onChange={(e) =>
                                  handleCheckboxChangeInvest(
                                    e,
                                    "investment_type"
                                  )
                                }
                                className="investment-timeline-input-label"
                              />
                              {option}
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Location Options */}
                  <div className="form-row">
                    <div className="form-col dual-items invest-form-label">
                      <div className="form-item-label invest-heading">
                        <p>
                          Location Options<sup>*</sup>
                        </p>
                      </div>
                      <div className="invest-tab-line">
                        {["Goa", "Phuket", "Dubai"].map((option) => (
                          <label
                            key={option}
                            className="investment-timeline-labels"
                          >
                            <input
                              type="checkbox"
                              name="location_options"
                              aria-required="true"
                              value={option}
                              checked={formData.location_options.includes(
                                option
                              )}
                              onChange={(e) =>
                                handleCheckboxChangeInvest(
                                  e,
                                  "location_options"
                                )
                              }
                              className="investment-timeline-input-label"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* New Fields */}

                  <div className="form-row">
                    <div className="form-col invest-form-label">
                      <div className="form-item-label hear-about-us">
                        <p>
                          How did you hear about us? <sup>*</sup>
                        </p>
                      </div>
                      <div className="form-item-inner-col">
                        <p>
                          <select
                            className="wpcf7-form-control choose-option-select"
                            aria-required="true"
                            name="hearAboutUs"
                            value={formData.hearAboutUs}
                            onChange={handleChange}
                            required
                          >
                            <option value="">
                              — Please choose an option —
                            </option>
                            <option value="Google">Google</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Outdoor media">Outdoor media</option>
                            <option value="Press">Press</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.hearAboutUs &&
                            (isSmallScreen ? (
                              !isFormSubmitted &&
                              showToastError(errors.hearAboutUs)
                            ) : (
                              <p className="error-message">
                                {errors.hearAboutUs}
                              </p>
                            ))}
                        </p>
                      </div>
                    </div>
                  </div>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleCheckboxChange}
                      className="styled-checkbox"
                    />
                    <span className="checkbox-text">
                      I authorise RIO & its representatives to contact me with
                      updates and notifications via Email/SMS/WhatsApp/Call.
                      This will override DND/NDNC.
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="error-message">{errors.agreeToTerms}</p>
                  )}
                  <div className="form-row btn-container align-right investment-button">
                    <div className="form-col">
                      <p>
                        <button
                          className="wpcf7-submit btn"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner"></span>
                            </>
                          ) : (
                            <span
                              style={{
                                letterSpacing: "1px",
                                fontSize: "14px",
                                textTransform: "uppercase",
                              }}
                              className="white"
                            >{`Submit`}</span>
                          )}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="right image-invest-contact">
          <div
            className="image reveal-image reveal-image-active"
            ref={imageRef}
          >
                <img src={formImage.src || formImage} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestContact;
