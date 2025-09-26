"use client";
import goaVideo from "../../assets/invest_page_video/goa_video_invest.mp4";
import "./WhyInvestInGoa.css";

const WhyInvestInGoa = () => {
  // useEffect(() => {
  //   const logScreenDimensions = () => {
  //     console.log("Width:", window.innerWidth);
  //     console.log("Height:", window.innerHeight);
  //   };

  //   logScreenDimensions();

  //   window.addEventListener("resize", logScreenDimensions);

  //   return () => {
  //     window.removeEventListener("resize", logScreenDimensions);
  //   };
  // }, []);
  return (
    <section
      className="text-change why-invest bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Invest"
    >
      <div className="wrapper invest-wrapper">
        <div className="inner-container">
          <div className="title-container">
            <h2 className="title">Why Invest In Goa?</h2>
          </div>

          <div className="invest-in-video-container">
            <video
              src={goaVideo}
              alt="Goa Project Video"
              autoPlay
              loop
              muted
              className="responsive-video"
            />
          </div>

          <div className="why-container">
            <div className="why-col fadeup">
              <h3 className="title">Invest in Goa's Booming Economy</h3>
              <p className="desc why-invest-in-desc">
                Every year, Goa attracts millions of tourists who value comfort
                and quality in their stay. Tap into RIO's optimum investment
                opportunities through our exclusive selection of luxury
                apartments, bespoke homes, and villas in stunning locations
                across Goa. You can rent out your home to visitors and earn a
                steady income.
              </p>
            </div>
            <div className="why-col fadeup">
              <h3 className="title">Own a piece of paradise</h3>
              <p className="desc why-invest-in-desc">
                This is your chance to own your dream home. Experience the
                finest in coastal elegance, surrounded by the natural beauty,
                serene lifestyle, and vibrant culture that define this
                prestigious destination. Goa is not just a tourist hotspot; it
                is a haven for those who value refinement and an unparalleled
                standard of living. It's time to indulge.
              </p>
            </div>
            <div className="why-col fadeup">
              <h3 className="title">Invest in stability &amp; Development</h3>
              <p className="desc why-invest-in-desc">
                Goa is one of the fastest-growing and most stable markets in
                India, with favourable policies and incentives for property
                buyers. Reap the benefits from the rising demand, high returns,
                and security of owning a property in Goa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInvestInGoa;
