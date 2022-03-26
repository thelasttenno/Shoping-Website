import React, {useState} from "react";

export default function SingleItem(props) {
  console.log(props);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="card">
      <div id="product-component-1613869961817">
        {" "}
        {/* <img src={`data:image/jpeg;base64,${data}`} alt="" width="360" /> */}
        <img src={props.Item.images[0]} alt="" width="360" />
        <h1>{props.Item.itemName}</h1>
        <p>{props.Item.description}</p>
        <p>{props.Item.price}</p>
        <p>{props.Item.category}</p>
        {/* If not in shopping cart show add button, else remove  */}
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
        )}
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
      </div>
    </div>
  );
}
