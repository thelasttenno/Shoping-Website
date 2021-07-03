import React, { Component } from "react";
import "./Shop.scss";
import SingleItem from "../SingleItem/SingleItem";
import SingleCollabItem from "../SingleCollabItem/SingleCollabItem";
class Shop extends Component {
  render() {
    return (
      <section className="Shop">
        <div className="Shop__head">
          <div className="hero-content">
            {/* <!-- <h1 class="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
          </div>
        </div>
        {/* <!-- <section class="sub">
  <nav class="subNav">
    <ul class="subNav__list">
      <li><a class="subNav__link" href="">tops</a></li>
      |
      <li><a class="subNav__link" href="">bottoms</a></li>
      |
      <li><a class="subNav__link" href="">other</a></li>
    </ul>
  </nav>
</section> --> */}
        <div className="Shop__header">
          <h2 className="Shop__title">All Products</h2>
          <div className="cards">
            {this.props.Inventory.forEach((Item) => {
              console.log(Item);
              if(Item.Collab === true){
                <SingleCollabItem {...this.props}Item = {Item} />
              }else{
                <SingleItem {...this.props}Item = {Item} />
              }
            })}
          </div>
        </div>
      </section>
    );
  }
}
export default Shop;
