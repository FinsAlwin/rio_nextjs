/* eslint-disable react/prop-types */
import Link from "next/link";
import Image from "next/image";

const PropertyItem = ({
  title,
  imageUrl,
  is_sold_out,
  propertiesURLId,
  location,
  configuration,
}) => {
  return (
    <Link
      href={propertiesURLId || "/properties/"}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="catagory-item zoomin">
        <div className="image-container">
          <Image 
            src={typeof imageUrl === 'string' ? imageUrl : (imageUrl?.src || '/placeholder.jpg')} 
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
        </div>
        {is_sold_out === "y" && (
          <div className="soldout-container">
            <p>Sold Out</p>
          </div>
        )}
        <div className="bottom">
          <div className="title-container">
            <h3 className="title">{title}</h3>
          </div>
          <div className="configuration-title">
            <span>{configuration}</span>
          </div>
          <div className="location-property-title">
            <span>{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyItem;
