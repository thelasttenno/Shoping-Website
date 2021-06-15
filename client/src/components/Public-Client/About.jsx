import React from "react";
import "./css/main.scss";
import KaiPic from "../../assets/photos/Photoshoot/Kai_looking_Good.JPG"


function About() {
  return (
    <div>
      <section class="hero">
        <div class="hero-content">
          {/* <!-- <h1 class="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
          {/* <!-- <h1 class="hero-content__title">WELCOME TO $KRILLA-GANG'S WORK IN PROGRESS WEBSITE!</h1>
    <p class="hero-content__blurb">OFFICAL LAUNCH OF WEBSITE AND FIRST CLOTHING DROP IS FEB. 20TH.</p>
    <p>if your here before the launch, thanks for the support and for sales inquirys you can hit us up over at our
      <a href="https://www.facebook.com/skrillagangco">facebook</a> or our <a
        href="https://www.instagram.com/skrilla__gang/">Instagram</a>
    </p>
    <p>or email us at <a href="mailto:sales@skrillagang.com">sales@skrillagang.com</a>
    </p> --> */}
          {/* <!-- <a class="hero-content__button button" href="/shop/">Shop Now</a> --> */}
        </div>
      </section>
      <section class="bio">
        <div class="bio__img">
          <img src={KaiPic} alt="" />
        </div>
        <div class="bio__content">
          <h3>Welcome To Skrilla Gang Clothing</h3>
          <p>
            We are a small startup company based in Kelowna, British Columbia.
            We’ve been working really hard on our merchandise, and are stoked to
            share it with everyone! Our website is run by a team of unique,
            talented people, eager to meet your needs and answer any questions.
          </p>
        </div>
      </section>
    </div>
  );
}
export default About;
