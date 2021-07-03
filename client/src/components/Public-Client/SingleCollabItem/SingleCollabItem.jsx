import React from "react";
import pic from "../../../assets/photos/Mockups/b_roll/ManWearingFuckitShirt.png";
import { Link } from "react-router-dom";
// import "./Home.scss";
function SingleItem() {
  return (
    <div class="card">
      <div id="product-component-1613869961817">
        {" "}
        <img src={pic} alt="" width="360" />
        <h1>title</h1>
        <p>description</p>
        <p>price</p>
        <button>Buy ME</button>
        <Link to={"/Collabs"}>
          <p>Collab</p>
        </Link>
      </div>
    </div>
  );
}
export default SingleItem;
