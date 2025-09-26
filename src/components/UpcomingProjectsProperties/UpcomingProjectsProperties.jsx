const UpcomingProjectsProperties = () => {
  return (
    <section
      className="text-change upcoming bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Rumah Hutan"
    >
      <div className="wrapper">
        <div className="inner-container">
          <div className="upcoming-container">
            <div className="header">
              <div className="title-container">
                <h3 className="title">SUMMON WHAT YOU SEEK</h3>
              </div>
              <div className="line"></div>
            </div>
            <div className="upcoming-projects-container">
              <div
                className="image-container scaleup"
                style={{
                  visibility: "visible",
                  opacity: 1,
                  transform:
                    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                  transition: "all, opacity 0.8s, transform 0.8s",
                }}
              >
                <a
                  href="https://www.rioluxuryhomes.in/phuket-coming-soon/"
                  className="uni-link"
                ></a>
                <img
                  src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/05/projects-phuket-1000x1000-1.webp"
                  alt=""
                />
              </div>
              <div
                className="image-container scaleup"
                style={{
                  visibility: "visible",
                  opacity: 1,
                  transform:
                    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                  transition: "all, opacity 0.8s, transform 0.8s",
                }}
              >
                <a
                  href="https://www.rioluxuryhomes.in/dubai-coming-soon/"
                  className="uni-link"
                ></a>
                <img
                  src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/05/projects-dubai-1000x1000-1.webp"
                  alt=""
                />
              </div>
            </div>
            <div className="header flip">
              <div className="title-container">
                <h3 className="title">Now coming soon in Phuket & Dubai</h3>
              </div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectsProperties;
