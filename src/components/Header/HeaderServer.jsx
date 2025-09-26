import Link from "next/link";
import Image from "next/image";
import whiteLogo from "../../assets/homepage_images/logo-white-2.svg";
import darkLogo from "../../assets/homepage_images/logo-dark.svg";

// Server Component for static header content
export default function HeaderServer({ logoType = "logo-dark" }) {
  return (
    <header>
      <div className="wrapper">
        <div className="left">
          <div className="logo-container">
            <div className={`logo ${logoType}`}>
              <Link href={"/"} className="uni-link">
                <Image 
                  src={whiteLogo.src || whiteLogo} 
                  alt="RIO Luxury Homes Logo" 
                  className="logo-white"
                  width={120}
                  height={40}
                  priority
                />
                <Image 
                  src={darkLogo.src || darkLogo} 
                  alt="RIO Luxury Homes Logo" 
                  className="logo-dark"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </header>
  );
}