import { memo } from "react";

import PageTransitionProvider from "../../../components/page-transition";

import "./About.scss";

const AboutPage = () => {
  return (
    <PageTransitionProvider>
      <section>
        <div className="container about__container">
          <div className="about">
            <div className="about__us">
              <h4>Our mision</h4>
              <h1>
                Creating valuable content for creatives all around the world
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
            <div className="about__us">
              <h4>Our mision</h4>
              <h1>
                Creating valuable content for creatives all around the world
              </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

const MemoAboutPage = memo(AboutPage);

export default MemoAboutPage;
