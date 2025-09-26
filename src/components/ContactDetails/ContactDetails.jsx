"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
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
                <Image 
                  src="/contact_us_form_image/contact_office_facade.webp" 
                  alt="Contact Office Facade" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
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
                      <h4 className="title">Office Address</h4>
                    </div>
                    <div className="right">
                      <div className="address-detail">
                        5/50 The Plaza Surin, Unit G6 – Ground Floor Moo 3, Cherngtalay Sub-district, Thalang District, Phuket 83110
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
                          href="mailto:info@riophuket.com"
                          className="email"
                        >
                          info@riophuket.com
                        </a>
                        <div className="phone">+66 (0) 85 575 9222</div>
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
                        href="mailto:marketing@riophuket.com"
                        className="email"
                      >
                        marketing@riophuket.com
                      </a>
                      <div className="phone">+66 (0) 85 575 9222</div>
                    </div>
                    <div className="contact-info">
                      <a
                        href="mailto:purchase@riophuket.com"
                        className="email"
                      >
                        purchase@riophuket.com
                      </a>
                      <div className="phone">+66 (0) 85 575 9222</div>
                    </div>
                    <div className="contact-info">
                      <a href="mailto:hr@riophuket.com" className="email">
                        hr@riophuket.com
                      </a>
                      <div className="phone">+66 (0) 85 575 9222</div>
                    </div>
                  </div>
                </div>
                {/* Created on 11-th March  for mobile view*/}
                <div className="mobile-contact-info">
                  <div className="mobile-business-type">{`// Press and Collabs`}</div>
                  <div className="mobile-details">
                    <a
                      href="mailto:marketing@riophuket.com"
                      className="email"
                    >
                      marketing@riophuket.com
                    </a>
                    <div className="phone">+66 (0) 85 575 9222</div>
                  </div>
                </div>
                <div className="mobile-contact-info">
                  <div className="mobile-business-type">{`// Purchase`}</div>
                  <div className="mobile-details">
                    <a
                      href="mailto:purchase@riophuket.com"
                      className="email"
                    >
                      purchase@riophuket.com
                    </a>
                    <div className="phone">+66 (0) 85 575 9222</div>
                  </div>
                </div>
                <div className="mobile-contact-info">
                  <div className="mobile-business-type">{`// Careers`}</div>
                  <div className="mobile-details">
                    <a href="mailto:hr@riophuket.com" className="email">
                      hr@riophuket.com
                    </a>
                    <div className="phone">+66 (0) 85 575 9222</div>
                  </div>
                </div>
                {/* Created on 11-th March  for mobile view*/}
              </div>

              {/* Created on 11-th March */}
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.1234567890123!2d98.3456789012345!3d7.890123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30502c8c8c8c8c8c%3A0x1234567890abcdef!2s5%2F50%20The%20Plaza%20Surin%2C%20Unit%20G6%20Moo%203%2C%20Cherngtalay%20Sub-district%2C%20Thalang%20District%2C%20Phuket%2083110!5e0!3m2!1sen!2sth!4v1700464828098!5m2!1sen!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location - Phuket Office"
            ></iframe>
          </div>
        </div>
      </div>

      {/* WhatsApp Icon Overlay */}
      {showWhatsAppIcon && (
        <div className="whatsapp-floating">
          <a
            href="https://wa.me/66855759222"
            target="_blank"
            rel="noopener noreferrer"
          >
                <Image 
                  src="/contact_us_form_image/whatsapp_black.webp" 
                  alt="WhatsApp" 
                  width={60}
                  height={60}
                  priority
                />
          </a>
        </div>
      )}
    </section>
  );
};

export default ContactDetails;
