"use client";
import { useState, useEffect } from "react";
import "./ContactDetails.css"; // Add this to handle fade-out effect

const ContactDetails = () => {
  const [hasVisitedContact, setHasVisitedContact] = useState(false);
  const [showWhatsAppIcon, setShowWhatsAppIcon] = useState(false);
  useEffect(() => {
    // Set flag in localStorage when the user visits the contact section
    localStorage.setItem("contactVisited", "true");
  }, []);
  // Check if the contact section has already been visited in this session
  useEffect(() => {
    const visited = sessionStorage.getItem("hasVisitedContact");
    if (visited) {
      setHasVisitedContact(true);
    }
  }, []);

  // When the user visits the contact section, mark it as visited
  const handleContactSectionView = () => {
    if (!hasVisitedContact) {
      setHasVisitedContact(true);
      sessionStorage.setItem("hasVisitedContact", "true");

      // Show WhatsApp icon for 10 seconds
      setShowWhatsAppIcon(true);
      setTimeout(() => {
        setShowWhatsAppIcon(false);
      }, 4000);
    }
  };

  return (
    <section
      className="contact-details text-change bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Contact us"
      onMouseEnter={handleContactSectionView} // This ensures the section has been visited
    >
      <div className="wrapper wrapper-2">
        <div className="inner-container">
          <div className="contact-details-container">
            <div className="left-col">
              <div className="image-container reveal-image reveal-image-active">
                <img src="/contact_us_form_image/contact_office_facade.webp" alt="Contact Office Facade" />
              </div>
            </div>
            <div className="right-col">
              <div className="address-details-container">
                <div className="main-title-container">
                  <h3 className="title">Contact Us</h3>
                </div>
                <div className="contact-us">
                  <div className="address-col">
                    <div className="left">
                      <h4 className="title">Address</h4>
                    </div>
                    <div className="right">
                      <div className="address-detail">
                        Aldeia Serenia, Block C, Bounta Vaddo, Mapusa Anjuna
                        Main Road, Assagao, Goa - 403507
                      </div>
                    </div>

                    <div className="left">
                      <div className="business-type">
                        {`// Real Estate and Investment`}
                      </div>
                    </div>
                    <div className="right">
                      <div className="contact-info">
                        <a
                          href="mailto:sales@rioluxuryhomes.in"
                          className="email"
                        >
                          sales@rioluxuryhomes.in
                        </a>
                        <div className="phone">+91 88889 00073</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Created on 11-th March */}
              <div className="contact-team-details">
                <div className="contact-grid">
                  {/* Left Column - Business Types */}
                  <div className="left">
                    <div className="business-type">{`// Press and Collabs`}</div>
                    <div className="business-type">{`// Purchase`}</div>
                    <div className="business-type">{`// Careers`}</div>
                  </div>

                  {/* Right Column - Contact Details */}
                  <div className="right">
                    <div className="contact-info">
                      <a
                        href="mailto:marketing@rioluxuryhomes.in"
                        className="email"
                      >
                        marketing@rioluxuryhomes.in
                      </a>
                      <div className="phone">+91 87999 15197</div>
                    </div>
                    <div className="contact-info">
                      <a
                        href="mailto:purchase@rioluxuryhomes.in"
                        className="email"
                      >
                        purchase@rioluxuryhomes.in
                      </a>
                      <div className="phone">+91 92250 96994</div>
                    </div>
                    <div className="contact-info">
                      <a href="mailto:hr@rioluxuryhomes.in" className="email">
                        hr@rioluxuryhomes.in
                      </a>
                      <div className="phone">+91 87999 15195</div>
                    </div>
                  </div>
                </div>
                {/* Created on 11-th March  for mobile view*/}
                <div className="mobile-contact-info">
                  <div className="mobile-business-type">{`// Press and Collabs`}</div>
                  <div className="mobile-details">
                    <a
                      href="mailto:marketing@rioluxuryhomes.in"
                      className="email"
                    >
                      marketing@rioluxuryhomes.in
                    </a>
                    <div className="phone">+91 87999 15197</div>
                  </div>
                </div>
                <div className="mobile-contact-info">
                  <div className="mobile-business-type">{`// Purchase`}</div>
                  <div className="mobile-details">
                    <a
                      href="mailto:purchase@rioluxuryhomes.in"
                      className="email"
                    >
                      purchase@rioluxuryhomes.in
                    </a>
                    <div className="phone">+91 92250 96994</div>
                  </div>
                </div>
                <div className="mobile-contact-info">
                  <div className="mobile-business-type">{`// Careers`}</div>
                  <div className="mobile-details">
                    <a href="mailto:hr@rioluxuryhomes.in" className="email">
                      hr@rioluxuryhomes.in
                    </a>
                    <div className="phone">+91 87999 15195</div>
                  </div>
                </div>
                {/* Created on 11-th March  for mobile view*/}
              </div>

              {/* Created on 11-th March */}
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3842.986543966663!2d73.77008467604219!3d15.592367785020175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfebb547ba216d%3A0xa41dfffcac9f7894!2sAldeia%20Serenia%2C%20Aldeia%20Serenia%2C%20Behind%20Indian%20Story%20Boutique%2C%20Bounta%20Vaddo%2C%2C%20Mapusa%20-%20Anjuna%20-%20Chapora%20Rd%2C%20Bouta%20Waddo%2C%20Assagao%2C%20Goa%20403507!5e0!3m2!1sen!2sin!4v1700464828098!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* WhatsApp Icon Overlay */}
      {showWhatsAppIcon && (
        <div className="whatsapp-floating">
          <a
            href="https://wa.me/918888900073"
            target="_blank"
            rel="noopener noreferrer"
          >
                <img src="/contact_us_form_image/whatsapp_black.webp" alt="WhatsApp" />
          </a>
        </div>
      )}
    </section>
  );
};

export default ContactDetails;
