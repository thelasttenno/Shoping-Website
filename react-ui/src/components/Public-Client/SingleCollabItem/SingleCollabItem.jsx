import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function SingleCollabItem(props) {
  const [quantity, setQuantity] = useState(props.Item.quantity || 1);
  return (
    <div className="card">
      <div id={props.Item.id}>
        <img src={props.Item.images[0]} alt="" width="360" />
        <h1>{props.Item.itemName}</h1>
        <p>{props.Item.description}</p>
        <p>{props.Item.price}</p>
        <p>{props.Item.category}</p>
        {props.shoppingCart.includes(props.Item) ? (
          <button
            onClick={() => {
              props.removeFromCart(props.Item);
            }}
          >
            Remove from cart
          </button>
        ) : (
          <button
            onClick={() => {
              props.addToCart(props.Item);
            }}
          >
            Add to cart
          </button>
        )}{" "}
        {props.shoppingCart.includes(props.Item) ? (
          <div className="quantity-setter">
            <button
              className="increment-btn"
              disabled={quantity === 1}
              onClick={() => {
                setQuantity(quantity - 1);
                props.removeSingleItemFromCart(props.Item);
              }}
              type="button"
            >
              -
            </button>
            <input
              type="number"
              id="quantity-input"
              min="1"
              max="10"
              value={quantity}
              name="quantity"
              readOnly
            />
            <button
              className="increment-btn"
              disabled={quantity === 10}
              onClick={() => {
                setQuantity(quantity + 1);
                props.addSingleItemToCart(props.Item);
              }}
              type="button"
            >
              +
            </button>
            <p className="sr-legal-text">Number of copies (max 10)</p>
          </div>
        ) : (
          ""
        )}
        <Link to={"/Collabs"}>
          <p>Collab</p>
        </Link>
      </div>
    </div>
  );
}
