"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { showToastError, showToastSuccess } from "../../utils/toast";
import endpoints from "../../config/endpoints";
import { fetchDataPost } from "../../utils/fetchData";
import PhoneInput from "../PhoneInput/PhoneInput";
import "./ApplyFormModal.css";
import Link from "next/link";

import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
} from "libphonenumber-js";
import { getLocalStorage, setLocalStorage } from "../../utils/localStorage";
function ApplyFormModal() {
  const [formData, setFormData] = useState({
    yourName: "",
    phone: "",
    email: "",
    investment: "1-5 CR",
    countryCode: "in",
    dialingCode: "+91",
    agreeToTerms: false,
    gps_coordinates: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    const { phone, dialingCode, countryCode } = formData;

    // If dialingCode is provided directly in the formData, use it.
    let fullPhoneNumber = `${dialingCode}${phone}`;

    // If dialingCode is not provided, use the countryCode to get the dialing code dynamically
    if (!dialingCode && countryCode) {
      try {
        const countryDialingCode = getCountryCallingCode(countryCode); // Fetch dialing code dynamically
        fullPhoneNumber = `${countryDialingCode}${phone}`;
      } catch (error) {
        return "Invalid country code.";
      }
    }

    const phoneNumber = parsePhoneNumberFromString(
      fullPhoneNumber,
      countryCode
    );

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.yourName) {
      newErrors.yourName = "Please enter your name.";
    }
    if (!formData.phone) {
      newErrors.phone = "Please enter your phone number.";
    }
    if (!formData.email) {
      newErrors.email = "Please enter your email.";
    }
    if (!formData.investment) {
      newErrors.investment = "Please select an investment bracket.";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions.";
    }
    if (!formData.hearAboutUs) {
      // Add this validation check for the "How did you hear about us?" field
      newErrors.hearAboutUs = "Please select how you heard about us.";
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
      const { status, redirect, message } = response;
      if (status === "success") {
        setFormData({
          yourName: "",
          phone: "",
          email: "",
          investment: "1-5 CR",
          countryCode: "in",
          dialingCode: "+91",
          agreeToTerms: false,
          hearAboutUs: "",
          gps_coordinates: "", // Reset this field as well
        });
        showToastSuccess("Form submitted successfully!");
        setErrors({});
        setTimeout(() => {
          if (redirect && redirect !== "") {
            window.location.href = redirect;
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
    }
  };

  return (
    <div className="footer-container " data-sidebar-title="Footer">
      <div className="right">
        <div className="content-container">
          <div className="content">
            <div className="top">
              <div className="title-container">
                <h3 className="title">CONTACT US</h3>
              </div>
            </div>
            <div className="middle middle-margin">
              <div className="footer-contact-form">
                <div className="contact-form sb-custom sub-custom-2">
                  <form
                    action="/property/rumah-hutan/#wpcf7-f1929-o1"
                    method="post"
                    className="wpcf7-form init"
                    aria-label="Contact form"
                    onSubmit={handleSubmit}
                  >
                    <div style={{ display: "none" }}>
                      <input type="hidden" name="_wpcf7" value="1929" />
                      <input
                        type="hidden"
                        name="_wpcf7_version"
                        value="5.8.7"
                      />
                      <input type="hidden" name="_wpcf7_locale" value="en_US" />
                      <input
                        type="hidden"
                        name="_wpcf7_unit_tag"
                        value="wpcf7-f1929-o1"
                      />
                      <input
                        type="hidden"
                        name="_wpcf7_container_post"
                        value="0"
                      />
                      <input
                        type="hidden"
                        name="_wpcf7_posted_data_hash"
                        value=""
                      />
                    </div>
                    <div className="form-container new-form-set-properties">
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
                              className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-item-input yourName-input contact-form-modal-input"
                              aria-required="true"
                              placeholder="Please enter your full name"
                              type="text"
                              name="yourName"
                              value={formData.yourName}
                              onChange={handleChange}
                            />
                            {errors.yourName && (
                              <p className="error-message">{errors.yourName}</p>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="form-row active">
                        <div className="form-col">
                          <div className="form-item-label">
                            <p>
                              Contact No.<sup>*</sup>
                            </p>
                          </div>
                          <div>
                            <div>
                              <PhoneInput
                                onCountryChange={handleCountryChange}
                              />

                              <input
                                size="40"
                                className="form-item-input yourName-input phone-input-contact contact-form-modal-input contact-properties-input"
                                aria-required="true"
                                placeholder="Enter a 10-digit mobile number"
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                onKeyDown={handleKeyDown}
                              />
                            </div>
                            {errors.phone && (
                              <p className="error-message">{errors.phone}</p>
                            )}
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
                              className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email form-item-input yourName-input contact-form-modal-input"
                              aria-required="true"
                              placeholder="Please enter your e-mail"
                              type="email"
                              name="email" // Match this with the formData object
                              value={formData.email}
                              onChange={handleEmailChange}
                            />
                            {errors.email && (
                              <p className="error-message">{errors.email}</p>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="form-row property-sec">
                        <div className="form-col dual-items">
                          <div className="form-item-label">
                            <p>Investment Bracket</p>
                          </div>

                          <div className="form-item-inner-col">
                            <p>
                              <span
                                className="custom-radio-group"
                                data-name="investment"
                              >
                                <label
                                  className={`custom-radio ${
                                    formData.investment === "1-5 CR"
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="investment"
                                    value="1-5 CR"
                                    checked={formData.investment === "1-5 CR"}
                                    onChange={handleChange}
                                  />
                                  <span className="">1-5 CR</span>
                                </label>
                                <label
                                  className={`custom-radio ${
                                    formData.investment === "5-15 CR"
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="investment"
                                    value="5-15 CR"
                                    checked={formData.investment === "5-15 CR"}
                                    onChange={handleChange}
                                  />
                                  <span className="">10-15 CR</span>
                                </label>
                                <label
                                  className={`custom-radio ${
                                    formData.investment === "15+ CR"
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="investment"
                                    value="15+ CR"
                                    checked={formData.investment === "15+ CR"}
                                    onChange={handleChange}
                                  />
                                  <span className="">15+ CR</span>
                                </label>
                                {/* <label
                                  className={`custom-radio ${
                                    formData.investment === "20+ CR"
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name="investment"
                                    value="20+ CR"
                                    checked={formData.investment === "20+ CR"}
                                    onChange={handleChange}
                                  />
                                  <span className="">20+ CR</span>
                                </label> */}
                              </span>
                            </p>
                            {errors.investment && (
                              <p className="error-message">
                                {errors.investment}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-col">
                          <div className="form-item-label">
                            <p>
                              How did you hear about us?<sup>*</sup>
                            </p>
                          </div>
                          <div className="form-item-inner-col">
                            <p>
                              <select
                                className="wpcf7-form-control select-update"
                                aria-required="true"
                                name="hearAboutUs"
                                value={formData.hearAboutUs}
                                onChange={handleChange}
                              >
                                <option value="">
                                  —Please choose an option—
                                </option>
                                <option value="Google">Google</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Outdoor media">
                                  Outdoor media
                                </option>
                                <option value="Press">Press</option>
                                <option value="Other">Other</option>
                              </select>
                              {errors.hearAboutUs && (
                                <p className="error-message">
                                  {errors.hearAboutUs}
                                </p>
                              )}
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
                          className="styled-checkbox new-checkbox-properties"
                        />
                        <span className="checkbox-text">
                          I authorise RIO & its representatives to contact me
                          with updates and notifications via
                          Email/SMS/WhatsApp/Call. This will override DND/NDNC.
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="error-message">{errors.agreeToTerms}</p>
                      )}

                      <div className="form-row">
                        <p className="alt">
                          <sup>*</sup>Indicates mandatory fields
                        </p>
                      </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyFormModal;
