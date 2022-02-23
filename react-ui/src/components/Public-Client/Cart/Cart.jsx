import React, { Component } from "react";
import SingleCartItem from "../SingleCartItem/SingleCartItem";
import { Link } from "react-router-dom";
import "./Cart.scss";
import axios from "axios";
export default function Cart(props) {
  const createStripeCheckoutSession = (cart) => {
    if (cart.length !== 0) {
      cart.forEach((item) => {
        delete item.ImgaeBase64;
      });
      axios({
        method: "post",
        url: "http://localhost:4242/payments/createSession",
        headers: {
          // "Content-Type": "application/json; charset=UTF-8",
        },
        params: { shoppingCart: cart },
      })
        .then((response) => {
          // handle success
          console.log(response);
          console.log(response.data.url);
          if (response.data.url) {
            window.location.assign(response.data.url);
          }
        })
        .catch((err) => {
          // handle error
          console.log(err);
        });
    } else {
      console.log("EMPTY CART");
    }
  };

  return (
    <section className="Cart">
      <div className="Cart__head"></div>
      <div className="Cart__header">
        <h2 className="Cart__title">Cart</h2>
      </div>
      <div>
        {props.shoppingCart &&
          props.shoppingCart.map((item) => (
            <div className="cartBorder">
              <div className="cart" key={item.id}>
                <SingleCartItem {...props} item={item} />
              </div>
            </div>
          ))}
        <div
          style={{
            visibility: props.shoppingCart.length !== 0 ? undefined : "hidden",
          }}
        >
          <button
            onClick={() => {
              createStripeCheckoutSession(props.shoppingCart);
            }}
            className=""
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </section>
  );
}
