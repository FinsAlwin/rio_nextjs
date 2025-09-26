"use client";
import { useEffect, useState } from "react";
import ApplyNowForm from "../ApplyForm/ApplyForm";
import "./CareersSection.css";
// import M from "materialize-css"; // Removed for SSR compatibility
// import { Modal } from "react-responsive-modal"; // Temporarily disabled due to ESM compatibility issue
// import "react-responsive-modal/styles.css"; // Temporarily disabled due to ESM compatibility issue
const CareersSection = () => {
  // State to manage the open/close state of the accordion items
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // useEffect(() => {
  //   const modalElems = document.querySelectorAll(".modal");
  //   M.Modal.init(modalElems, {
  //     inDuration: 300,
  //     outDuration: 200,
  //     dismissible: true,
  //   });
  // }, []);

  // Function to open the modal and set the selected career
  // const handleApplyClick = (career) => {
  //   setSelectedCareer(career);
  //   const modal = M.Modal.getInstance(document.getElementById("apply-modal"));
  //   modal.open();
  // };
  const handleApplyClick = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCareer(null);
  };

  const careersData = [
    {
      title: "Customer Relationship Management",
      description:
        "At Rio, we prioritize building and enhancing customer relationships, making each interaction significant. Our CRM team offers a prime avenue for career growth in sales, a key role in our market expansion, and the chance to connect with distinguished clients globally.",
      applyLink: "#applynow1893",
    },
    {
      title: "Guest Relations",
      description:
        "Our focus is on ensuring our guests' complete satisfaction, aiming for a seamless and unforgettable experience. The Guest Relationship team has nurtured meaningful bonds with our guests through their approachable, organised demeanour and excellent communication, always striving to surpass guest comfort expectations.",
      applyLink: "#applynow1894",
    },
    {
      title: "Operations",
      description:
        "Rio’s operations team is dedicated to maintaining our properties' highest quality standards. Collaborating across departments, the role is central to refining operational systems and processes for efficiency and effectiveness. It's a rewarding challenge for those with analytical prowess.",
      applyLink: "#applynow1902",
    },
    {
      title: "Rental",
      description:
        "Rio enables homeowners to rent their properties, making hospitality management vital. The rental team's goal is to boost rental demand, cater to elite guests, and ensure memorable stays.",
      applyLink: "#applynow1903",
    },
    {
      title: "Marketing",
      description:
        "Our marketing targets the global top 1%, with strategies tailored for the luxury market. We seek communicative, luxury-focused, enthusiastic individuals skilled in social media, PR, event planning, and digital marketing.",
      applyLink: "#applynow1904",
    },
    {
      title: "Legal",
      description:
        "Our legal team collaborates with a range of stakeholders to build a solid legal framework and streamline documentation processes. Responsibilities include leading negotiations and managing legal documents, ensuring efficient team coordination.",
      applyLink: "#applynow1906",
    },
    {
      title: "Finance",
      description:
        "The Finance team creates financial solutions and structures to propel business growth and engage with investors, focusing on financial management strategies to maximize shareholder value.",
      applyLink: "#applynow1908",
    },
    {
      title: "Accounts",
      description:
        "We aim to expand our accounts team with professionals experienced in accounting and taxation. The role involves refining accounting practices to ensure accurate and timely financial reports.",
      applyLink: "#applynow1910",
    },
    {
      title: "Land and Permissions",
      description:
        "We carefully manage land acquisition and permissions to provide homeowners with a hassle-free purchase. Our team, split between on-site scouts and headquarters staff, focuses on securing quality land and streamlining purchasing processes for convenience.",
      applyLink: "#applynow1912",
    },
    {
      title: "Sales",
      description:
        "The Sales team at Rio is pivotal in driving growth by matching elite clientele with our luxury properties, understanding their requirements, using strategic insights and persuasive skills to not just meet, but exceed expectations.",
      applyLink: "#applynow1958",
    },
  ];

  return (
    <>
      <section
        id="top"
        className="text-change sidebar-container bgblack scroll-smooth sticky snap-scroll"
        data-sidebar-title="Careers"
      >
        <div className="wrapper">
          <div className="inner-container">
            <div className="top-blank-section h-10"></div>
            <div className="sidebar-wrapper">
              <div className="left">
                <div className="title-container">
                  <h1 className="title">Careers</h1>
                </div>
                <div className="content-container">
                  <p className="desc">
                    RIO is built on a foundation of excellence and we're looking
                    for individuals who share our unwavering commitment to
                    quality and innovation.
                  </p>
                  <p className="desc">
                    If you're ready to leave the mundane behind and embrace the
                    extraordinary, browse our current vacancies and see if you
                    have what it takes to join our ranks.
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="accordion-container careers sb-custom">
                  {careersData.map((item, index) => (
                    <div className="accordion-item" key={index}>
                      <div
                        className={`accordion-title ${
                          openAccordion === index ? "active" : ""
                        }`}
                        onClick={() => toggleAccordion(index)}
                      >
                        <div className="title">{item.title}</div>
                      </div>
                      <div
                        className="accordion-body"
                        style={{
                          display: openAccordion === index ? "block" : "none",
                        }}
                      >
                        <p>{item.description}</p>
                        <div className="btn-container">
                          <a
                            className="btn white careers-applynow modal-trigger"
                            data-target="apply-now-modal"
                            onClick={() => handleApplyClick(item)}
                          >
                            Apply Now
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="apply-modal" className="modal">
          <div className="modal-content">
            <ApplyNowForm selectedCareer={selectedCareer} />
          </div>
        </div> */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={handleCloseModal}
          >
            <div
              style={{
                background: "white",
                borderRadius: "8px",
                padding: "20px",
                maxWidth: "600px",
                width: "90%",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ApplyNowForm
                selectedCareer={selectedCareer}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default CareersSection;
