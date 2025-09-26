import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";

const ContactUsFooter = () => {
  return (
    <footer
      className="text-change bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Footer"
    >
      <div className="footer-container" data-sidebar-title="Footer">
        <div className="left">
          <div className="image-container reveal-image reveal-image-active">
            <img
              src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/02/contact-footer.jpg"
              alt="Footer"
            />
          </div>
          <div className="left-footer-bottom">
            <div className="left-col">
              <div className="copy">
                <p>@Copyright RIO 2024</p>
              </div>
            </div>
            <div className="right-col">
              <div className="links">
                <a
                  href="https://www.rioluxuryhomes.in/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="content-container">
            <div className="content">
              <div className="top">
                <div className="title-container">
                  <h3 className="title">NOT EVERYONE MAKES THE CUT</h3>
                </div>
              </div>
              <div className="middle">
                <div className="line"></div>
              </div>
              <div className="bottom">
                <div className="btn-container">
                  <a
                    href="https://www.rioluxuryhomes.in/contact-us/"
                    className="btn white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="right-footer-bottom">
            <div className="touch">
              <p className="title">Follow us on</p>
              <div className="icon">
                <a
                  href="https://www.facebook.com/rioluxuryhomes/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.youtube.com/@rioluxuryhomes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://www.instagram.com/rioluxuryhomesgoa/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://wa.me/918888900073/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactUsFooter;
