import React, { Component } from "react";
import "./Home.scss";
class Home extends Component {
  render() {
    return (
      <section className="Home">
        <div className="Home__head">
          <div className="hero-content">
            {/* <!-- <h1 className="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
            {/* <!-- <p className="hero-content__blurb">OFFICAL LAUNCH OF WEBSITE AND FIRST CLOTHING DROP IS FEB. 20TH.</p>
      <p>if your here before the launch, thanks for the support and for sales inquirys you can hit us up over at our
        <a href="https://www.facebook.com/skrillagangco">facebook</a> or our <a
          href="https://www.instagram.com/skrilla__gang/">Instagram</a>
      </p>
      <p>or email us at <a href="mailto:sales@skrillagang.com">sales@skrillagang.com</a>
      </p> --> */}
            {/* <!-- <a className="hero-content__button button" href="/shop/">Shop Now</a> --> */}
          </div>
        </div>
        <div className="Home__header">
          <h2 className="Home__title">New Products</h2>

          {/* <div className="cards">
            {this.props.megaState.Inventory.data.slice(0, size).map((Item) => {
              console.log(Item);
              return <SingleItem {...this.props} Item={Item}/>;
            })}
          </div> */}
          <div className="cards"></div>
        </div>
      </section>
    );
  }
}
export default Home;
