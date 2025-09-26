"use client";
import { useEffect, useRef, useState } from "react";
import { fetchDataPost } from "../../utils/fetchData";
import endpoints from "../../config/endpoints";
import { showToastError, showToastSuccess } from "../../utils/toast";
import PhoneInput from "../PhoneInput/PhoneInput";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Image from "next/image";
import "./ContactForm.css";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    yourName: "",
    phone: "",
    email: "",
    investment: "50 - 70 MB",
    hearAboutUs: "",
    countryCode: "in",
    dialingCode: "+91",
    agreeToTerms: false,
    gps_coordinates: "",
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
              // Don't show error toast for denied permissions - user may have intentionally denied
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
    // Validate fields locally
    const newErrors = {};
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
      newErrors.phone = phoneError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToastError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const data = {
        ...formData,
      };
      const url = endpoints.contact;
      const response = await fetchDataPost(url, data, false);
      const { status, message } = response;

      if (status === "success") {
        setFormData({
          yourName: "",
          phone: "",
          email: "",
          investment: "50 - 70 MB",
          hearAboutUs: "",
          countryCode: "in",
          dialingCode: "+91",
          agreeToTerms: false,
          gps_coordinates: "",
        });
        showToastSuccess("Form submitted successfully!");
        setErrors({});
        setTimeout(() => {
          if (response.redirect) {
            window.location.href = response.redirect;
          }
        }, 2000);
      } else if (status === "failed") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: message,
        }));
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
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 1366);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <section
      id="contactform"
      className="contactform-container text-change bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Contact Form"
    >
      <div className="dual-container flip new-contact-form-set">
        <div className="left">
          <div className="content-container">
            <div className="contact-form sb-custom">
              <form
                onSubmit={handleSubmit}
                aria-label="Contact form"
                noValidate
              >
                <div className="form-container">
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
                          className="form-item-input phone-input-contact"
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
                      <div className="form-item-label">
                        <p>
                          Contact No.<sup>*</sup>
                        </p>
                      </div>

                      <div>
                        <PhoneInput onCountryChange={handleCountryChange} />
                        <input
                          size="40"
                          className="form-item-input input-contact-textfield phone-input-contact"
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
                      <div className="form-item-label">
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
                    <div className="form-col dual-items">
                      <div className="form-item-label invest-new-set-form-bracket">
                        <p>Investment Bracket</p>
                      </div>
                      <div className="form-item-inner-col">
                        <div className="investment-bracket-container">
                          <label className="investment-option">
                            <input
                              type="radio"
                              name="investment"
                              value="50 - 70 MB"
                              checked={formData.investment === "50 - 70 MB"}
                              onChange={handleChange}
                              className="radio-investment-btn"
                            />
                            50 - 70 MB
                          </label>
                          <label className="investment-option">
                            <input
                              type="radio"
                              name="investment"
                              value="71 - 90 MB"
                              className="radio-investment-btn"
                              checked={formData.investment === "71 - 90 MB"}
                              onChange={handleChange}
                            />
                            71 - 90 MB
                          </label>
                          <label className="investment-option">
                            <input
                              type="radio"
                              name="investment"
                              value="91+ MB"
                              className="radio-investment-btn"
                              checked={formData.investment === "91+ MB"}
                              onChange={handleChange}
                            />
                            91+ MB
                          </label>
                        </div>
                        {errors.investment &&
                          (isSmallScreen ? (
                            !isFormSubmitted &&
                            showToastError(errors.investment)
                          ) : (
                            <p className="error-message">
                              {errors.investment}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-col">
                      <div className="form-item-label">
                        <p>
                          How did you hear about us? <sup>*</sup>
                        </p>
                      </div>
                      <div className="form-item-inner-col">
                        <p>
                          <select
                            className="wpcf7-form-control"
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
                  <div className="form-row btn-container align-right">
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
        <div className="right">
          <div
            className="image reveal-image reveal-image-active"
            ref={imageRef}
          >
                <Image src="/contact_us_form_image/contact_form_image_web.webp" alt="" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
