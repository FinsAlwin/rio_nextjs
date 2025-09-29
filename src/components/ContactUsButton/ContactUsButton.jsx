"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./ContactUsButton.css";

const ContactUsButton = () => {
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
      className={`contact-us-floating ${isVisible ? "fade-in" : ""}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <Link href="/contact-us" className="contact-us-button">
        Contact Us
      </Link>
    </div>
  );
};

export default ContactUsButton;