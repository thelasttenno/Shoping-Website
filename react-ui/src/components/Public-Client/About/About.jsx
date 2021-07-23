import React from "react";
import KaiPic from "../../../assets/photos/Photoshoot/Kai_looking_Good.JPG";
import coverpic from "../../../assets/photos/Photoshoot/4_inarow.JPG";
import "./About.scss";

function About() {
  return (
    <section className="About">
      <div className="About__head">
        <div className="hero-content">
          {/* <!-- <h1 className="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
          {/* <!-- <h1 className="hero-content__title">WELCOME TO $KRILLA-GANG'S WORK IN PROGRESS WEBSITE!</h1>
    <p className="hero-content__blurb">OFFICAL LAUNCH OF WEBSITE AND FIRST CLOTHING DROP IS FEB. 20TH.</p>
    <p>if your here before the launch, thanks for the support and for sales inquirys you can hit us up over at our
      <a href="https://www.facebook.com/skrillagangco">facebook</a> or our <a
        href="https://www.instagram.com/skrilla__gang/">Instagram</a>
    </p>
    <p>or email us at <a href="mailto:sales@skrillagang.com">sales@skrillagang.com</a>
    </p> --> */}
          {/* <!-- <a className="hero-content__button button" href="/shop/">Shop Now</a> --> */}
        </div>
      </div>
      <div className="About__header">
        <div className="Aboutimg">
          <img src={KaiPic}  alt="" />
          <img src={KaiPic}  alt="" />
        </div>
        <div className="Content">
          <div className="Content__Bio">
            <h2 className="ContentBio__Title">About</h2>
            <h3>Welcome To Skrilla Gang Clothing</h3>
            <p>
              We are a small startup company based in Kelowna, British Columbia.
              We’ve been working really hard on our merchandise, and are stoked
              to share it with everyone! Our website is run by a team of unique,
              talented people, eager to meet your needs and answer any
              questions.
            </p>
          </div>
          <div className="Content__ContactInfo">
            <h2>Contact</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
