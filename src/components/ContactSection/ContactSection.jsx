import { RxDoubleArrowDown } from "react-icons/rx";
const ContactSection = () => {
  return (
    <section
      id="top"
      className="text-change intro-image bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Contact us"
    >
      <div className="intro-image-container">
        <div className="image-container hero-zoom">
          <img
            src="/contact_us_form_image/contact_landing_img.webp"
            alt=""
            className="zoomout animate__animated animate__zoomIn animate__slow"
          />
        </div>
        <div className="scroll-down-wrapper ">
          <div className="scroll-down-container">
            <div className="scroll-down-icon">
              <RxDoubleArrowDown className="animated-arrow" />
            </div>
          </div>
        </div>
      </div>
      <div className="intro-image-footer bgblack">
        <div className="wrapper">
          <div className="inner-container">
            <div className="left zoomout">
              <div className="logo">
                <img src="/homepage_images/logo-white-2.svg" alt="Logo White" className="logo-white" />
                <img src="/homepage_images/logo-dark.svg" alt="Logo Dark" className="logo-dark" />
              </div>
            </div>
            <div className="center zoomout"></div>
            <div className="right zoomout">
              <h3 className="title">// SINGULAR SELECT</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
