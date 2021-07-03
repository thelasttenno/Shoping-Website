import React from "react";
import pic from "../../../assets/photos/Mockups/b_roll/ManWearingFuckitShirt.png";
import "./Home.scss";
import SingleItem from "../SingleItem/SingleItem";
import SingleCollabItem from "../SingleCollabItem/SingleCollabItem";
function Home() {
  return (
    <section class="Home">
      <div class="Home__head">
        <div class="hero-content">
          {/* <!-- <h1 class="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
          {/* <!-- <p class="hero-content__blurb">OFFICAL LAUNCH OF WEBSITE AND FIRST CLOTHING DROP IS FEB. 20TH.</p>
      <p>if your here before the launch, thanks for the support and for sales inquirys you can hit us up over at our
        <a href="https://www.facebook.com/skrillagangco">facebook</a> or our <a
          href="https://www.instagram.com/skrilla__gang/">Instagram</a>
      </p>
      <p>or email us at <a href="mailto:sales@skrillagang.com">sales@skrillagang.com</a>
      </p> --> */}
          {/* <!-- <a class="hero-content__button button" href="/shop/">Shop Now</a> --> */}
        </div>
      </div>
      <div class="Home__header">
        <h2 class="Home__title">New Products</h2>

        <div class="cards">
          <SingleItem />
          <SingleItem />
          <SingleItem />
          <SingleItem />
        </div>
        <div class="cards">
          <SingleCollabItem />
          <SingleCollabItem />
          <SingleCollabItem />
          <SingleCollabItem />
        </div>
      </div>
    </section>
  );
}
export default Home;
