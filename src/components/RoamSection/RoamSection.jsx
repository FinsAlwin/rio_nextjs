import ruhan from "../../assets/properties_image/ruhan-wutan.webp";
import "./RoamSection.css";
const RoamSection = () => {
  return (
    <section
      className="text-change roam bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Rumah Hutan"
    >
      <div className="top-blank-section"></div>
      <div className="roam-container">
        <div className="title-container fadeup">
          <h2 className="title">Unparalleled access to spaces</h2>
        </div>
        <div className="image-container scaleup">
            <img src={ruhan.src || ruhan} alt="" className="image-zoom" />
        </div>
      </div>
    </section>
  );
};

export default RoamSection;
