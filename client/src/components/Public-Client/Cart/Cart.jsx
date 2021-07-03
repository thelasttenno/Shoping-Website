import React, { Component } from "react";
import SingleCartItem from "../SingleCartItem/SingleCartItem";
import { Link } from "react-router-dom";
import "./Cart.scss"
//////
let BuyList = [
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
];
//////////////////////
class Cart extends Component {
  render() {
    return (
      <section className="Cart">
        <div className="Cart__head">

        </div>
        <div className="Cart__header">
          <h2 className="Cart__title">Cart</h2>
        </div>
        <div>
          {BuyList &&
            BuyList.map((item) => {
              return (
                <div className="cartBorder">
                  <div className="cart" key={item.id}>
                    <SingleCartItem {...this.props} inventory={item} />
                  </div>
                </div>
              );
            })}
          <Link to={`/checkout`} className="">
            CHECKOUT
          </Link>
        </div>
      </section>
    );
  }
}
export default Cart;
