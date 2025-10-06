import Link from "next/link";
import Image from "next/image";
import "animate.css";
const PropertiesSection1 = ({ property_name, main_image }) => {
  return (
    <section
      id="top"
      className={`text-change intro-image property-intro-image full-height bgblack scroll-smooth sticky snap-scroll `}
      data-sidebar-title=""
    >
      <div className="intro-image-container">
        <div className="image-container hero-zoom">
          <Image
            src={main_image.src || main_image}
            alt={property_name || "Property Image"}
            fill
            priority
            quality={90}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className="left-box">
        <div className="title-container">
          <h2 className="title">{property_name}</h2>
        </div>
        <div className="goback">
          <Link
            href={"/properties/"}
            className="goback-btn"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Properties</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertiesSection1;
