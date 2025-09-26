import Link from "next/link";

const PropertiesScheduleSection = () => {
  return (
    <section
      className="schedule text-change bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Rumah Hutan"
    >
      <div className="schedule-inner">
        <div className="left"></div>
        <div className="right">
          <div className="schedule-top">
            <div className="image-container reveal-image reveal-image-active">
              <img
                src="https://www.rioluxuryhomes.in/v2/wp-content/uploads/2023/12/rumah_1-lounge.jpg"
                alt="Lounge"
              />
            </div>
          </div>
          <div className="schedule-bottom">
            <div className="header">
              <div className="title-container">
                <h3 className="title">SCHEDULE A MEETING</h3>
              </div>
              <div className="line"></div>
              <div className="btn-container">
                <Link href={"/contact-us"} style={{ textDecoration: "none" }} className="btn white">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesScheduleSection;
