"use client";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { fetchDataPost } from "../../utils/fetchData";
import endpoints from "../../config/endpoints";
import { showToastError, showToastSuccess } from "../../utils/toast";
import "./ApplyForm.css";
import PhoneInput from "../PhoneInput/PhoneInput";

const ApplyNowForm = ({ selectedCareer }) => {
  const [formData, setFormData] = useState({
    jobProfile: selectedCareer ? selectedCareer.title : "",
    yourName: "",
    phone: "",
    email: "",
    cvFile: null,
    message: "",
    countryCode: "in",
    dialingCode: "+91",
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (selectedCareer) {
      setFormData((prevData) => ({
        ...prevData,
        jobProfile: selectedCareer.title,
      }));
    }
  }, [selectedCareer]);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFormData({ ...formData, cvFile: selectedFile });
  };

  const handleCountryChange = (country_code, dialing_code) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      countryCode: country_code,
      dialingCode: dialing_code,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const newErrors = {};

    if (!formData.yourName) {
      showToastError("Please enter your name.");
      return;
    }
    if (!formData.phone) {
      showToastError("Please enter your phone number.");
      return;
    }
    if (!formData.email) {
      showToastError("Please enter your email.");
      return;
    }
    if (!formData.jobProfile) {
      showToastError("Please select a job profile.");
      return;
    }
    if (!formData.message) {
      showToastError("Please enter a message.");
      return;
    }
    if (!formData.cvFile) {
      showToastError("Please upload your CV.");
      return;
    }

    setLoading(true);
    try {
      const fullPhoneNumber = `${formData.dialingCode}${formData.phone}`;
      const data = new FormData();
      data.append("yourName", formData.yourName);
      data.append("phone", fullPhoneNumber);
      data.append("email", formData.email);
      data.append("cvFile", formData.cvFile);
      data.append("message", formData.message);
      data.append("jobProfile", formData.jobProfile);

      const url = endpoints.getCareerJobs;
      const response = await fetchDataPost(url, data, true);

      const { status, redirect, message } = response;
      if (status === "success") {
        setFormData({
          jobProfile: selectedCareer ? selectedCareer.title : "",
          yourName: "",
          phone: "",
          email: "",
          cvFile: null,
          message: "",
          countryCode: "in",
          dialingCode: "+91",
        });
        setFile(null);
        // Clear the file input manually
        document.getElementById("fileInput").value = "";

        showToastSuccess(response.message);
        setErrors({});
        setTimeout(() => {
          if (redirect && redirect !== "") {
            window.location.href = "/";
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
      showToastError("Error submitting application:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setFormData({ ...formData, cvFile: droppedFile });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 1366);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="mfp-wrap mfp-close-btn-in mfp-auto-cursor my-mfp-slide-bottom mfp-ready"
      tabIndex="-1"
      style={{ overflow: "hidden" }}
    >
      <div className="mfp-container mfp-inline-holder">
        <div className="mfp-content">
          <div
            id="applynow1902"
            className="form-popup zoom-anim-dialog career-form"
          >
            <div className="popup-inner-container">
              <div className="top">
                <h2 className="title">Apply Now For</h2>

                {selectedCareer ? (
                  <h4 className="job-title">{selectedCareer.title}</h4>
                ) : (
                  <h4 className="job-title">Loading...</h4> // Fallback message
                )}
              </div>
              <div className="form-section">
                <form className="wpcf7-form" onSubmit={handleSubmit}>
                  <div className="form-container">
                    {/* Name */}
                    <div className="form-row form-row-career">
                      <div className="form-col">
                        <input
                          className="form-item-input"
                          type="text"
                          name="yourName" // Changed from name to yourName
                          placeholder="Your Full Name *"
                          value={formData.yourName}
                          onChange={handleChange}
                        />
                        {errors.yourName &&
                          (isSmallScreen ? (
                            !isFormSubmitted && showToastError(errors.yourName)
                          ) : (
                            <p className="error-message">{errors.yourName}</p>
                          ))}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="form-row form-row-career">
                      <div className="form-col">
                        <div>
                          <PhoneInput onCountryChange={handleCountryChange} />

                          <input
                            className="form-item-input yourName-input phone-input-contact"
                            type="tel"
                            name="phone"
                            placeholder="Phone Number *"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.phone &&
                          (isSmallScreen ? (
                            !isFormSubmitted && showToastError(errors.phone)
                          ) : (
                            <p className="error-message">{errors.phone}</p>
                          ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="form-row form-row-career">
                      <div className="form-col">
                        <input
                          className="form-item-input"
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email &&
                          (isSmallScreen ? (
                            !isFormSubmitted && showToastError(errors.email)
                          ) : (
                            <p className="error-message">{errors.email}</p>
                          ))}
                      </div>
                    </div>

                    {/* CV Upload */}
                    <div className="form-row dual-items form-row-cv-career">
                      <div className="form-item-label">
                        <p>Upload CV *</p>
                      </div>
                      <div className="form-item-inner-col">
                        <div
                          className="codedropz-upload-wrapper"
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                        >
                          <div className="codedropz-upload-handler">
                            <div className="codedropz-upload-inner">
                              <h3>Drag & Drop File Here</h3>
                              <span>or</span>
                              <div className="codedropz-btn-wrap">
                                <a
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document
                                      .getElementById("fileInput")
                                      .click();
                                  }}
                                >
                                  Browse File
                                </a>
                                <input
                                  id="fileInput"
                                  type="file"
                                  name="cvFile" // Changed from resume to cvFile
                                  className="d-none"
                                  accept=".pdf"
                                  onChange={handleFileSelect}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {file && (
                        <span className="dnd-upload-success">
                          {file.name} ({(file.size / 1024).toFixed(2)} KB)
                          attached
                        </span>
                      )}

                      {errors.cvFile &&
                        (isSmallScreen ? (
                          !isFormSubmitted && showToastError(errors.cvFile)
                        ) : (
                          <p className="error-message">{errors.cvFile}</p>
                        ))}
                    </div>

                    {/* Message */}
                    <div className="form-row dual-items form-row-career">
                      <div className="form-item-label">
                        <p>Message</p>
                      </div>
                      <div className="form-item-inner-col">
                        <input
                          className="form-item-input"
                          type="text"
                          name="message"
                          placeholder="Type your message here"
                          value={formData.message}
                          onChange={handleChange}
                        />

                        {errors.message &&
                          (isSmallScreen ? (
                            !isFormSubmitted && showToastError(errors.message)
                          ) : (
                            <p className="error-message">{errors.message}</p>
                          ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-row btn-container align-right">
                      <div className="form-col new-form-set-career">
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
  );
};
ApplyNowForm.propTypes = {
  selectedCareer: PropTypes.shape({
    jobProfile: PropTypes.string, // Add validation for jobProfile
  }).isRequired,
};
export default ApplyNowForm;
