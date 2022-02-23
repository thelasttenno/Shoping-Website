import React, { Component, useState } from "react";
import pic from "../../../assets/photos/Mockups/b_roll/ManWearingFuckitShirt.png";
import { Link } from "react-router-dom";
export default function SingleCollabItem(props) {
  const [quantity, setQuantity] = useState(props.Item.quantity || 1);
  const [data, setData] = useState(props.Item.ImgaeBase64.data)
  return (
    <div className="card">
      <div id={props.Item.id}>
        <img src={`data:image/jpeg;base64,${data}`} alt="" width="360" />
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
// import React, { useEffect, useState } from 'react';

// const formatPrice = ({ amount, currency, quantity }) => {
//   const numberFormat = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency,
//     currencyDisplay: 'symbol',
//   });
//   const parts = numberFormat.formatToParts(amount);
//   let zeroDecimalCurrency = true;
//   for (let part of parts) {
//     if (part.type === 'decimal') {
//       zeroDecimalCurrency = false;
//     }
//   }
//   amount = zeroDecimalCurrency ? amount : amount / 100;
//   const total = (quantity * amount).toFixed(2);
//   return numberFormat.format(total);
// };

// const SingleCollabItem = () => {
//   const [quantity, setQuantity] = useState(1);
//   const [amount, setAmount] = useState(0);
//   const [currency, setCurrency] = useState('USD');

//   useEffect(() => {
//     async function fetchConfig() {
//       // Fetch config from our backend.
//       const {
//         unitAmount,
//         currency
//       } = await fetch('/config').then(r => r.json());
//       setAmount(unitAmount);
//       setCurrency(currency);
//     }
//     fetchConfig();
//   }, []);

//   return (
//     <div className="sr-root">
//       <div className="sr-main">
//         <section className="container">
//           <div>
//             <h1>Single photo</h1>
//             <h4>Purchase a Pasha original photo</h4>
//             <div className="pasha-image">
//               <img
//                 alt="Random asset from Picsum"
//                 src="https://picsum.photos/280/320?random=4"
//                 width="140"
//                 height="160"
//               />
//             </div>
//           </div>
//           <form action="/create-checkout-session" method="POST">
//             <div className="quantity-setter">
//               <button
//                 className="increment-btn"
//                 disabled={quantity === 1}
//                 onClick={() => setQuantity(quantity - 1)}
//                 type="button"
//               >
//                 -
//               </button>
//               <input
//                 type="number"
//                 id="quantity-input"
//                 min="1"
//                 max="10"
//                 value={quantity}
//                 name="quantity"
//                 readOnly
//               />
//               <button
//                 className="increment-btn"
//                 disabled={quantity === 10}
//                 onClick={() => setQuantity(quantity + 1)}
//                 type="button"
//               >
//                 +
//               </button>
//             </div>
//             <p className="sr-legal-text">Number of copies (max 10)</p>

//             <button role="link" id="submit" type="submit">
//               Buy {formatPrice({amount, currency, quantity})}
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default SingleCollabItem;
