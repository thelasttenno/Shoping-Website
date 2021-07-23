import React from "react";
import pic from "../../../assets/photos/Mockups/b_roll/ManWearingFuckitShirt.png";
// import "./Home.scss";
// class SingleItem extends Component {

//   render() {
//   return (
//     <div className="card">
//       <div id="product-component-1613869961817">
//         {" "}
//         <img src={pic} alt="" width="360" />
//         <h1>{this.props.Item.itemName}</h1>
//         <p>{this.props.Item.description}</p>
//         <p>{this.props.Item.price}</p>
//         <p>{this.props.Item.category}</p>
//         <button>Add to cart</button>
//       </div>
//     </div>
//   );
// }}
// export default SingleItem;

export default function SingleItem(props) {
  return (
    <div className="card">
      <div id="product-component-1613869961817">
        {" "}
        <img src={pic} alt="" width="360" />
        <h1>{props.Item.itemName}</h1>
        <p>{props.Item.description}</p>
        <p>{props.Item.price}</p>
        <p>{props.Item.category}</p>
        {/* If not in shopping cart show add button, else remove  */}
        {props.shoppingCart.includes("product-component-1613869961817") ? (
          <button
            onClick={() => {
              props.removeFromCart("product-component-1613869961817");
            }}
          >
            Remove from cart
          </button>
        ) : (
          <button
            onClick={() => {
              props.addToCart("product-component-1613869961817");
            }}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
