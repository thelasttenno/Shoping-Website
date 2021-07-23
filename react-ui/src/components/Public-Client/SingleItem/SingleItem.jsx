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


export default function SingleItem(){
  return (
    <div className="card">
      <div id="product-component-1613869961817">
        {" "}
        <img src={pic} alt="" width="360" />
        <h1>{this.props.Item.itemName}</h1>
        <p>{this.props.Item.description}</p>
        <p>{this.props.Item.price}</p>
        <p>{this.props.Item.category}</p>
        <button>Add to cart</button>
      </div>
    </div>
  );
}
