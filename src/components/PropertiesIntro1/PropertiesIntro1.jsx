// Make sure to have your CSS ready

const PropertiesIntro1 = () => {
  return (
    <section
      className="text-change intro-image bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Properties"
    >
      <div className="intro-image-container">
        <div
          className="image-container hero-zoom"
          style={{
            translate: "none",
            rotate: "none",
            scale: "none",
            transform: "translate3d(0px, 0px, 0px) scale(1.0967, 1.0967)",
          }}
        >
          <img
            src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2023/12/black_forest-aerial.jpg"
            alt=""
            className="zoomout"
            data-sr-id="62"
            style={{
              visibility: "visible",
              opacity: 1,
              transform:
                "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
              transition: "all, opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          />
        </div>
        <div className="scroll-down-wrapper">
          <div className="scroll-down-container">
            <div className="scroll-down-icon"></div>
          </div>
        </div>
      </div>
      <div className="intro-image-footer bgblack">
        <div className="wrapper">
          <div className="inner-container ">
            <div
              className="left zoomout"
              data-sr-id="63"
              style={{
                visibility: "visible",
                opacity: 1,
                transform:
                  "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                transition:
                  "all, opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              <div className="logo">
                <img
                  src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/01/logo-white.svg"
                  alt=""
                  className="logo-white"
                />
                <img
                  src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/01/logo-dark.svg"
                  alt=""
                  className="logo-dark"
                />
              </div>
            </div>
            <div
              className="center zoomout"
              data-sr-id="64"
              style={{
                visibility: "visible",
                opacity: 0,
                transform:
                  "matrix3d(1.2, 0, 0, 0, 0, 1.2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
              }}
            ></div>
            <div
              className="right zoomout"
              data-sr-id="65"
              style={{
                visibility: "visible",
                opacity: 1,
                transform:
                  "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                transition:
                  "all, opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              <h3 className="title">// SINGULAR SELECT</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesIntro1;
