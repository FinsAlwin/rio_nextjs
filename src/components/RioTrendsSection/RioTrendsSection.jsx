"use client";
import { useState } from "react";
import graph1 from "../../assets/invest_page_image/graph_1.webp";
import graph2 from "../../assets/capital-investment/rumah-hutan_casa-brilhante.png";
import graph3 from "../../assets/capital-investment/rumah-hutan_casa-brilhante.png";
import graph4 from "../../assets/capital-investment/rio-royale.png";
import graph5 from "../../assets/capital-investment/rio-estilo.png";
import graph6 from "../../assets/capital-investment/rio-estado.png";
import graph7 from "../../assets/capital-investment/black-forest.png";
import graph8 from "../../assets/capital-investment/the-hills-estate.png";
import graph9 from "../../assets/capital-investment/a-capella.png";
import graph10 from "../../assets/capital-investment/6-assagao.png";

const RoiTrendsSection = () => {
  const [selectedProperty, setSelectedProperty] = useState("#opt-2");

  const handleSelectChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const graphImages = {
    "#opt-1": graph1,
    "#opt-2": graph2,
    "#opt-3": graph3,
    "#opt-4": graph4,
    "#opt-5": graph5,
    "#opt-6": graph6,
    "#opt-7": graph7,
    "#opt-8": graph8,
    "#opt-9": graph9,
    "#opt-10": graph10,
  };

  const graphDetails = {
    "#opt-1": [],
    "#opt-2": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "25%" },
      { label: "Under Construction", value: "50%" },
      { label: "Completion", value: "100%" },
      { label: "Rent Calculator", value: "Yes" },
      { label: "RERA", value: "Yes" },
    ],
    "#opt-3": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "25%" },
      { label: "Under Construction", value: "50%" },
      { label: "Completion", value: "100%" },
      { label: "Rent Calculator", value: "Yes" },
      { label: "RERA", value: "Yes" },
    ],
    "#opt-4": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "15%" },
      { label: "Under Construction", value: "40%" },
      { label: "Completion", value: "60%" },
      { label: "Rent Calculator", value: "Yes" },
      { label: "RERA", value: "Yes" },
    ],
    "#opt-5": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "20%" },
      { label: "Under Construction", value: "40%" },
      { label: "Completion", value: "60%" },
      { label: "Rent Calculator", value: "Yes" },
      { label: "RERA", value: "RERA NOT REQUIRED" },
    ],
    "#opt-6": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "20%" },
      { label: "Under Construction", value: "50%" },
      { label: "Completion", value: "100%" },
      { label: "Rent Calculator", value: "Yes" },
      { label: "RERA", value: "Yes" },
    ],
    "#opt-7": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "15%" },
      { label: "Under Construction", value: "50%" },
      { label: "Completion", value: "100%" },
      { label: "Rent Calculator", value: "Yes" },
      { label: "RERA", value: "RERA NOT REQUIRED" },
    ],
    "#opt-8": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "20%" },
      { label: "Under Construction", value: "40%" },
      { label: "Completion", value: "60% expected" },
      { label: "Rent Calculator", value: "No" },
      { label: "RERA", value: "No" },
    ],
    "#opt-9": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "15%" },
      { label: "Under Construction", value: "40%" },
      { label: "Completion", value: "60% expected" },
      { label: "Rent Calculator", value: "No" },
      { label: "RERA", value: "No" },
    ],
    "#opt-10": [
      { label: "Pre Launch", value: "0" },
      { label: "Launch", value: "15%" },
      { label: "Under Construction", value: "25%" },
      { label: "Completion", value: "30%-40% expected" },
      { label: "Rent Calculator", value: "No" },
      { label: "RERA", value: "RERA NOT REQUIRED" },
    ],
  };

  return (
    <section
      className="text-change rio-trends new-set-trends bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="ROI Trends"
    >
      <div className="wrapper">
        <div className="top-blank-section h-10 top-right">
          <div className="title-container">
            <h2>ROI Trends</h2>
          </div>
        </div>
        <div className="inner-container">
          <div className="rio-trends-container">
            <div className="invest-graph">
              <div className="graph-images-item mobile">
                <select
                  id="graph-images-mob"
                  value={selectedProperty}
                  onChange={handleSelectChange}
                >
                  <option value="#opt-1" data-image="#opt-1">
                    Select Property
                  </option>
                  <option value="#opt-2" data-image="#opt-2">
                    Casa Brilhante
                  </option>
                  <option value="#opt-3" data-image="#opt-3">
                    Rumah Hutan
                  </option>
                  <option value="#opt-4" data-image="#opt-4">
                    Rio Royale
                  </option>
                  <option value="#opt-5" data-image="#opt-5">
                    Rio Estilo
                  </option>
                  <option value="#opt-6" data-image="#opt-6">
                    Rio Estado
                  </option>
                  <option value="#opt-7" data-image="#opt-7">
                    Black Forest
                  </option>
                  <option value="#opt-8" data-image="#opt-8">
                    The Hills Estate
                  </option>
                  <option value="#opt-9" data-image="#opt-9">
                    A Cappella
                  </option>
                  <option value="#opt-10" data-image="#opt-10">
                    6 Assagao
                  </option>
                </select>
              </div>
              <div className="graph-container">
                <div className="graph-image-container">
                  {Object.keys(graphImages).map((key) => (
                    <div
                      key={key}
                      className={`graph-image-item ${selectedProperty === key ? "active" : ""
                        }`}
                      data-item={key}
                    >
                      <img src={graphImages[key].src || graphImages[key]} alt="" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="graph-details-container">
                <div className="graph-images-item desktop">
                  <select
                    id="graph-images"
                    value={selectedProperty}
                    onChange={handleSelectChange}
                  >
                    <option value="#opt-1" data-image="#opt-1">
                      Select Property
                    </option>
                    <option value="#opt-2" data-image="#opt-2">
                      Casa Brilhante
                    </option>
                    <option value="#opt-3" data-image="#opt-3">
                      Rumah Hutan
                    </option>
                    <option value="#opt-4" data-image="#opt-4">
                      Rio Royale
                    </option>
                    <option value="#opt-5" data-image="#opt-5">
                      Rio Estilo
                    </option>
                    <option value="#opt-6" data-image="#opt-6">
                      Rio Estado
                    </option>
                    <option value="#opt-7" data-image="#opt-7">
                      Black Forest
                    </option>
                    <option value="#opt-8" data-image="#opt-8">
                      The Hills Estate
                    </option>
                    <option value="#opt-9" data-image="#opt-9">
                      A Cappella
                    </option>
                    <option value="#opt-10" data-image="#opt-10">
                      6 Assagao
                    </option>
                  </select>
                </div>
                {Object.keys(graphDetails).map((key) => (
                  <div
                    key={key}
                    className={`graph-details ${selectedProperty === key ? "active" : ""
                      }`}
                    data-item={key}
                  >
                    {graphDetails[key].map((detail, index) => (
                      <div key={index} className="graph-details-item">
                        <div className="col">{detail.label}</div>
                        <div className="col">{detail.value}</div>
                      </div>
                    ))}
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

export default RoiTrendsSection;
