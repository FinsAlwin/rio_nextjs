// import goaVideo from "../../assets/invest_page_video/invest_in_goa.mp4"; // Moved to public directory
import "./InvestUs2.css";

const InvestUs2 = () => {
  return (
    <section
      className="text-change cta full-height bgblack scroll-smooth sticky snap-scroll"
      data-sidebar-title="Invest"
    >
      <div className="cta-container new-set-video">
        <div className="image-container reveal-image reveal-image-active">
          <video
            className="video-item desktop"
            id="videoPlayerDesktop"
            loop
            muted
            autoPlay
            playsInline
            // poster={thumbnailImage}
          >
            <source src="/invest_in_goa.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="cta-content-container invest-us-section-new">
          <div className="content">
            <div className="why-container">
              <div className="title-container">
                <h2 className="title">Why Invest With Us?</h2>
              </div>
              <div className="why-col fadeup">
                <h3 className="title">
                  INVEST IN LOCATIONS WITH A BOOMING ECONOMY
                </h3>
                <span className="line"></span>
                <p className="desc why-invest-in-desc">
                  RIO offers investment opportunities in premium tourist
                  destinations that attract millions of tourists who value
                  comfort and quality in their stay. Tap into RIO's optimum
                  investment opportunities through our exclusive selection of
                  luxury apartments, bespoke homes, and villas in stunning,
                  picturesque locations. You can rent your home and guarantee a
                  consistent revenue stream.
                </p>
              </div>
              <div className="why-col fadeup">
                <h3 className="title">Own a Piece of Paradise </h3>
                <span className="line"></span>
                <p className="desc why-invest-in-desc">
                  This is your opportunity to own your dream home. Experience
                  the finest in sophisticated elegance, surrounded by natural
                  beauty, a serene lifestyle, and vibrant cultures. A niche of
                  havens, handpicked for those who value refinement and an
                  unparalleled standard of living. It's time to indulge.
                </p>
              </div>
              <div className="why-col fadeup">
                <h3 className="title">Invest in Stability &amp; Development</h3>
                <span className="line"></span>
                <p className="desc why-invest-in-desc">
                  Carefully chosen fast-growing locations and the most stable
                  markets in India and overseas, with favorable policies and
                  incentives for property buyers. Reap the benefits of rising
                  demand, high returns, and the security of owning a home away
                  from home
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestUs2;
