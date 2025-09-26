import Link from "next/link";
import "./ProjectSingle.css";

const ProjectSingle = () => {
  return (
    <section
      className=" text-change bgblack scroll-smooth zindex-10 sticky snap-scroll"
      data-sidebar-title="Rumah Hutan"
    >
      <div className="projects-dual bgblack">
        <div className="projects-container">
          <div className="left">
            <div
              className="content-container fadeup"
              style={{
                visibility: "visible",
                opacity: 1,
                transform:
                  "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                transition:
                  "all, opacity 0.8s ease-in-out, transform 0.8s ease-in-out",
              }}
            >
              <div className="content align-left">
                <h2 className="title uppercase">SOAK IN THE SUBLIME</h2>
                <div className="image-container">
                  <img
                    src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2023/12/pro-rumah-4.jpg"
                    alt="Project Image"
                  />
                </div>
                <div className="btn-container verticle">
                  <div className="left-line">
                    <div className="glyph2">
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                    <div className="vline"></div>
                  </div>

                  <a
                    // href="https://www.rioluxuryhomes.in/contact-us/#contactform"
                    className="btn white"
                  >
                    <Link
                      href={"/contact-us/#contactform"}
                      className="text-indulge"
                      //   style={{ color: "#fff", textDecoration: "none" }}
                    >
                      Indulge
                    </Link>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="image reveal-image reveal-image-active">
              <img
                src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2023/12/rumah_3-pool_deck.jpg"
                alt="Pool Deck"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSingle;
