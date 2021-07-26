import React, { Component } from "react";
import pic from "../../../assets/photos/Mockups/b_roll/ManWearingFuckitShirt.png";
import "./Home.scss";
import SingleItem from "../SingleItem/SingleItem";
import SingleCollabItem from "../SingleCollabItem/SingleCollabItem";
class Home extends Component {
  render() {
    var size = 6;
    return (
      <section className="Home">
        <div className="Home__head"></div>
        <div className="Home__header">
          <div className="HeaderIntro">
            <h2>About Us</h2>
            <p>who we are</p>
          </div>
          <div>
            <h2 className="Home__title">New Products</h2>
            <div className="cards">
              {/* {this.props.megaState.NotCollabitems.map((Item) => (
                <SingleItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))} */}
            </div>
            <div className="cards">
              {this.props.megaState.Collabitems.map((Item) => (
                <SingleCollabItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Home;
