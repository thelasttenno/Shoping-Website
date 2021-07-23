import React, { Component } from "react";
import pic from "../../../assets/photos/Mockups/b_roll/ManWearingFuckitShirt.png";
import { Link } from "react-router-dom";
// import "./Home.scss";
// class SingleCollabItem extends Component {
//   render() {
//     console.log(this.props);
//     return (
//       <div className="card">
//         <div id="product-component-1613869961817">
//           {" "}
//           <img src={pic} alt="" width="360" />
//           <h1>{this.props.Item.itemName}</h1>
//           <p>{this.props.Item.description}</p>
//           <p>{this.props.Item.price}</p>
//           <p>{this.props.Item.category}</p>
//           <button>Buy ME</button>
//           <Link to={"/Collabs"}>
//             <p>Collab</p>
//           </Link>
//         </div>
//       </div>
//     );
//   }
// }
// export default SingleCollabItem;

export default function SingleCollabItem(props) {
  // console.log(itemName, description, price, category);
  return (
    <div className="card">
      <div id={props.Item.id}>
        <img src={pic} alt="" width="360" />
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
        <Link to={"/Collabs"}>
          <p>Collab</p>
        </Link>
      </div>
    </div>
  );
}
