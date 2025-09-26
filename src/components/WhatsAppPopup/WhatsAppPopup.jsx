"use client";
import { useEffect, useState } from "react";
import whatsappIcon from "../../assets/contact_us_form_image/whatsapp_black.webp"; // Path to your WhatsApp icon
import "./WhatsAppPopup.css";
const WhatsAppPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedContact");

    if (!hasVisitedBefore) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("hasVisitedContact", "true");
      }, 10000);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    } else {
      // User has visited before, show the icon immediately
      setIsVisible(true);
    }
  }, []);

  return (
    <div
      className={`whatsapp-floating ${isVisible ? "fade-in" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <a
        href="https://wa.me/918888900073"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={whatsappIcon.src || whatsappIcon} alt="WhatsApp" />
      </a>
    </div>
  );
};

export default WhatsAppPopup;
