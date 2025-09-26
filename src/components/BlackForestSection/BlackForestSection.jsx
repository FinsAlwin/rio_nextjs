const BlackForestSection = () => {
  return (
    <section
      className="project-single text-change bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Locations"
    >
      <div className="projects-dual flip bgblack">
        <div className="projects-container">
          <div className="left">
            <div className="content-container">
              <div
                className="content scaleup"
                style={{
                  visibility: "visible",
                  opacity: 1,
                  transform:
                    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
                  transition: "all 0.8s, opacity 0.8s, transform 0.8s",
                }}
              >
                <h2 className="title uppercase">BLACK FOREST</h2>
                <div className="image-container">
                  <img
                    src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/01/blackforest2.jpg"
                    alt="Black Forest"
                  />
                </div>
                <h3 className="desc uppercase">SUMMON WHAT YOU SEEK</h3>
                <div className="btn-container center">
                  <a
                    // href="https://www.rioluxuryhomes.in/property/black-forest/"
                    className="btn white"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="image reveal-image reveal-image-active">
              <img
                src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/01/blackforest1.jpg"
                alt="Black Forest"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlackForestSection;
