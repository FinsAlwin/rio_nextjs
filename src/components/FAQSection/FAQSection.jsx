"use client";
import React, { useState } from "react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqItems = [
    { title: "01. WHAT’S THE OWNERSHIP STATUS?", body: "Freehold." },
    {
      title: "02. WHO CAN BUY PROPERTY?",
      body: "Any citizen of India can buy property. In the case of NRI’s, an OCI card is mandatory.",
    },
    {
      title: "03. WHY CANNOT PLOT SIZE BE MENTIONED IN THE AGREEMENT?",
      body: "The approved plans are passed by the Authorities as a project and community villas and not as individual villas. The said villa forms a part of a larger community. The land is for exclusive use only and cannot be partitioned and shall not be construed to be a sale of land based on the agreement.",
    },
    {
      title: "04. CAN THE PARTITION OF THE PLOT BE DONE IN THE SAID PROJECT?",
      body: "No. The partition cannot be done as it is part of the community and not an individual villa.",
    },
    {
      title: "05. IS CUSTOMISATION ALLOWED AT RIO?",
      body: "These are not custom-built homes, so we do not allow any customization.",
    },
    {
      title: "06. CAN WE MODIFY THE STRUCTURE IN THE FUTURE?",
      body: "No. Structural changes cannot be done. Only interiors of the villa/apartment can be changed provided prior permission is taken from the Builder/Society.",
    },
    {
      title: "07. IS THE PROJECT VASTU COMPLIANT?",
      body: "Since our projects are designed for all communities, they are not designed to be 100% Vastu compliant.",
    },
    {
      title: "08. WHY ARE THIRD-PARTY RENTALS NOT ALLOWED?",
      body: "Mainly due to safety and security reasons. Given that there is no control on the third party/agency subletting to questionable individuals or individuals indulging in questionable practices.",
    },
    {
      title:
        "09. HOW WILL THE BUILDER CURB OR ENSURE PEACEFUL SURROUNDINGS FOR RESIDENCE?",
      body: "As part of the rental agreement, the guest is not allowed to create any discord within the community and is bound by rules and regulations of tenancy.",
    },
    {
      title: "10. WHAT IF THE BUILDER HAS OBJECTIONS TO RENTING IN THE FUTURE?",
      body: "The builder shall have no objections to rentals through OWV.",
    },
    {
      title: "11. WHAT IF THE OTHER OWNERS IN THE COMMUNITY OBJECT TO RENTALS?",
      body: "The owners cannot stop the others from renting as the rental clause is mentioned in the Sale agreement/Sale deed.",
    },
    {
      title:
        "12. WILL THE MAINTENANCE OF THE PROPERTY BE TAKEN CARE OF BY THE DEVELOPER?",
      body: "Yes. The maintenance of the property will be taken care of by the developer until the owners wish to form a society.",
    },
    {
      title: "13. CONVEYANCE OR FORMATION OF SOCIETY?",
      body: "If the owners wish to form a society, then the majority members can come together to form a society. They must fill out the form and get registered under Goa Co-operative Societies Act before the Assistant Sub-Registrar of the Co-operative Societies, at which point the obligations of the builder to the project will end. Post formation of the society, the members can choose their own agency for the maintenance of the premises.",
    },
    {
      title: "14. WHAT IS COVERED UNDER MAINTENANCE?",
      body: "Maintenance covers common area maintenance, security, accountancy charges, gardening, common area electricity bills, cleaning materials, pool maintenance, etc.",
    },
    {
      title: "15. STRUCTURAL WARRANTIES AND FURNITURE AND WHITE GOODS?",
      body: "The warranty of the structure is specified in the warranties and guarantees in the Agreement to Sale.",
    },
    {
      title: "16. REGISTRATION PROCESS IN GOA?",
      body: "In Goa two documents are registered: (i) Sale Agreement without possession, i.e., when the property is under construction and (ii) Sale Deed with Possession, i.e., after the handover of the property. The registration process involves the document being uploaded to the NGDRS site for the Sub-Registrar's approval, which takes a minimum of 15-20 days. Once approved, an appointment is fixed after the payment of stamp duty and registration fees.",
    },
    {
      title: "17. CAN THE CLAUSES IN THE DRAFT BE ALTERED?",
      body: "The draft shared is a standard document for intimation purposes only. No changes are allowed, as all clients are bound by the same rules and regulations applicable to the entire project.",
    },
    {
      title: "18. CAN WE VIEW THE PROJECT-RELATED DOCUMENTS?",
      body: "These are confidential documents and can be shared only once the unit/villa has been confirmed after the payment of the booking amount. If a client wishes to view the documents before confirming the unit, they can do so in person at the office of RIO LUXURY HOMES PVT LTD. If, post-booking, the client finds any faults in the documents, the entire amount paid will be refunded with an interest of 18%.",
    },
    {
      title: "19. WHAT ARE THE CANCELLATION FEES?",
      body: "50% of the booking amount will be charged as a cancellation fee. In case of faults in our documentation, no cancellation charges will be applicable.",
    },
    {
      title: "20. CAN THE CLIENT EXIT IN BETWEEN?",
      body: "During construction, cancellation charges will apply. After construction but before executing the Sale Deed, cancellation charges will apply. Post-execution of the Sale Deed, once 100% payment is made, the client can avail the resale option.",
    },
  ];

  return (
    <section
      id="top"
      className="text-change sidebar-container bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="FAQ"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="top-blank-section h-10"></div>
          <div className="sidebar-wrapper">
            <div className="left">
              <div className="title-container">
                <h1 className="title">Frequently Asked Questions</h1>
              </div>
            </div>
            <div className="right">
              <div className="accordion-container sb-custom">
                {faqItems.map((item, index) => (
                  <div key={index} className="accordion-item">
                    <div
                      className="accordion-title"
                      onClick={() => toggleAccordion(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="title">{item.title}</div>
                    </div>
                    <div
                      className="accordion-body"
                      style={{
                        display: activeIndex === index ? "block" : "none",
                      }}
                    >
                      <p>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
