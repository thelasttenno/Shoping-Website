import React, { Component } from "react";
import pic from "../../../assets/photos/Mockups/b_roll/ManWearingFuckitShirt.png";
import { Link } from "react-router-dom";
// import "./Home.scss";
class SingleCollabItem extends Component {
  render() {
    console.log(this.props);
    return (
      <div class="card">
        <div id="product-component-1613869961817">
          {" "}
          <img src={pic} alt="" width="360" />
          <h1>{this.props.Item.itemName}</h1>
          <p>{this.props.Item.description}</p>
          <p>{this.props.Item.price}</p>
          <button>Buy ME</button>
          <Link to={"/Collabs"}>
            <p>Collab</p>
          </Link>
        </div>
      </div>
    );
  }
}
export default SingleCollabItem;
