"use client";
import React, { useEffect } from "react";

const LocationDetails = () => {
  useEffect(() => {
    // Fix non-breaking spaces in phone numbers
    document.querySelectorAll(".phone-link a").forEach((link) => {
      link.href = link.href.replace(/\u00A0/g, ""); // Remove non-breaking space
      link.textContent = link.textContent.replace(/\u00A0/g, " ");
    });

    // Ensure displayed email matches mailto link
    document.querySelectorAll(".email-contact-us a").forEach((link) => {
      const email = link.href.replace("mailto:", "").trim();
      link.textContent = email; // Make sure displayed email matches href
    });
  }, []);

  return (
    <div className="location-details">
      {/* Location 1: Goa */}
      <div className="location-block">
        <h3 className="location-title">RIO, Goa</h3>
        <p className="location-address">
          Address - Aldeia Serenia, Block C, Bounta Vaddo, Mapusa Anjuna Main
          Road, Assagao, Goa - 403507
        </p>
        <p className="email-contact-us">
          <a href="mailto:sales@rioluxuryhomes.in" className="email-link">
            sales@rioluxuryhomes.in
          </a>
        </p>
        <p className="phone-link">
          <a href="tel:+918888900073">+91 88889 00073</a>
        </p>
      </div>

      {/* Location 2: Phuket */}
      <div className="location-block">
        <h3 className="location-title">RIO, Phuket</h3>
        <p className="location-address">
          Address: 5/50 The Plaza Surin, Unit G6 Moo 3, Cherngtalay
          Sub-district, Thalang District, Phuket 83110
        </p>
        <p className="email-contact-us">
          <a href="mailto:info@riophuket.com" className="email-link">
            info@riophuket.com
          </a>
        </p>
        <p className="phone-link">
          <a href="tel:+66855759222">+66 85575 9222</a>
        </p>
      </div>

      {/* Location 3: Dubai */}
      <div className="location-block">
        <h3 className="location-title">RIO, Dubai</h3>
        <p className="location-address">
          Address: 2105-2107, Bay View Tower, Marasi Drive, Above Mist Cafe /
          Opp. U-Bora Tower, Business Bay, Dubai, UAE
        </p>
        <p className="email-contact-us">
          <a href="mailto:info@riodubai.co" className="email-link">
            info@riodubai.co
          </a>
        </p>
      </div>
    </div>
  );
};

export default LocationDetails;
