const UpcomingProjectPropSection = () => {
  return (
    <section
      className="text-change upcoming bgwhite scroll-smooth sticky snap-scroll"
      data-sidebar-title="Projects"
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
              <div className="image-container scaleup">
                <a
                  // href="https://www.rioluxuryhomes.in/phuket-coming-soon/"
                  className="uni-link"
                ></a>
                <img
                  src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/05/projects-phuket-1000x1000-1.webp"
                  alt="Phuket Project"
                />
              </div>

              <div className="image-container scaleup">
                <a
                  // href="https://www.rioluxuryhomes.in/dubai-coming-soon/"
                  className="uni-link"
                ></a>
                <img
                  src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/05/projects-dubai-1000x1000-1.webp"
                  alt="Dubai Project"
                />
              </div>
            </div>

            <div className="header flip">
              <div className="title-container">
                <h3 className="title">Now coming soon in PHUKET &amp; DUBAI</h3>
              </div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProjectPropSection;
