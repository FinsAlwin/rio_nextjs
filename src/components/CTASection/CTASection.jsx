const CTASection = () => {
  return (
    <section
      className="text-change cta full-height bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Invest"
    >
      <div className="cta-container">
        <div className="image-container reveal-image reveal-image-active">
          <img
            src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2023/12/black_forest-exterior_5.jpg"
            alt="Black Forest Exterior"
            className=""
          />
        </div>
        <div className="cta-content-container">
          <div className="content">
            <div className="top">
              <div className="title-container">
                <h3 className="title">WHY INVEST IN US?</h3>
              </div>
            </div>
            <div className="middle">
              <div className="line"></div>
            </div>
            <div className="bottom">
              <div className="btn-container">
                <a
                  href="https://www.rioluxuryhomes.in/invest/"
                  className="btn white"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
