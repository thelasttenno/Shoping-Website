import React, { Component } from "react";
import "./Shop.scss";
import SingleItem from "../SingleItem/SingleItem";
import SingleCollabItem from "../SingleCollabItem/SingleCollabItem";
class Shop extends Component {
  state = {
    status: null
  }
  updateStatus = (e) => {
    const { value } = e.target;
    this.setState({
      status: value,
    });
    console.log(e.target.value);
  };
  render() {


    return (
      <section className="Shop">
        <div className="Shop__head">
          <div className="hero-content">
            {/* <!-- <h1 class="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
          </div>
        </div>
        <div>
          <select
            type="text"
            name="ItemSelector"
            className="input select"
            placeholder="Please select"
            onChange={this.updateStatus}
          >
            <option value="all">Please Select</option>
            <option value="Colabs">Colabs</option>
            <option value="T-Shirt">T-Shirt</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Crop-Tops">Crop-Tops</option>
            <option value="Long-T">Long-T</option>
            <option value="Pants">Pants</option>
          </select>
        </div>
        <div className="Shop__header">
          <h2 className="Shop__title">All Products</h2>
          
          <div
            style={{
              display: this.state.status === "collab" || "all" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards Collabitems"
          >
            {this.props.Collabitems}
          </div>
          <div
            style={{
              display: this.state.status === "all" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards NotCollabitems"
          >
            {this.props.NotCollabitems}
          </div>
          <div
            style={{
              display: this.state.status === "T-Shirt" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards CollabitemsTShirt"
          >
            {this.props.CollabitemsTShirt}
          </div>
          <div
            style={{
              display: this.state.status === "T-Shirt" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards NotCollabitemsTShirt"
          >
            {this.props.NotCollabitemsTShirt}
          </div>
          <div
            style={{
              display: this.state.status === "Long-T" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards CollabitemsLongT"
          >
            {this.props.CollabitemsLongT}
          </div>
          <div
            style={{
              display: this.state.status === "Long-T" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards NotCollabitemsLongT"
          >
            {this.props.NotCollabitemsLongT}
          </div>
          <div
            style={{
              display: this.state.status === "Crop-Top" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards CollabitemsCropTop"
          >
            {this.props.CollabitemsCropTop}
          </div>
          <div
            style={{
              display: this.state.status === "Crop-Top" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards NotCollabitemsCropTop"
          >
            {this.props.NotCollabitemsCropTop}
          </div>
          <div
            style={{
              display: this.state.status === "Pants" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards CollabitemsPants"
          >
            {this.props.CollabitemsPants}
          </div>
          <div
            style={{
              display: this.state.status === "Pants" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards NotCollabitemsPants"
          >
            {this.props.NotCollabitemsPants}
          </div>
          <div
            style={{
              display: this.state.status === "Hoodies" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards CollabitemsHoodies"
          >
            {this.props.CollabitemsHoodies}
          </div>
          <div
            style={{
              display: this.state.status === "Hoodies" ? "flex" : "none",
              flexDirection: "column",
            }}
            className="cards NotCollabitemsHoodies"
          >
            {this.props.NotCollabitemsHoodies}
          </div>
        </div>
      </section>
    );
  }
}
export default Shop;
