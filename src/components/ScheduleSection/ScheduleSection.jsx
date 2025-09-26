const ScheduleSection = () => {
  return (
    <section
      className="schedule text-change bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Invest"
    >
      <div className="schedule-inner">
        <div className="left"></div>
        <div className="right">
          <div className="schedule-top">
            <div className="image-container reveal-image reveal-image-active">
              <img
                src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2024/02/invest-cta.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="schedule-bottom">
            <div className="header">
              <div className="title-container">
                <h3 className="title">Turn your money into wealth</h3>
              </div>
              <div className="line"></div>
              <div className="btn-container">
                <a
                  href="https://www.rioluxuryhomes.in/invest/"
                  className="btn white"
                >
                  Invest with us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
