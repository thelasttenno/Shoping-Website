import React, { Component } from "react";
import "./Shop.scss";
import SingleItem from "../SingleItem/SingleItem";
import SingleCollabItem from "../SingleCollabItem/SingleCollabItem";
import Inventory from "../../../pages/Inventory/Inventory";
class Shop extends Component {
  state = {
    status: "All Items",
  };
  updateStatus = (e) => {
    const { value } = e.target;
    this.setState({
      status: value,
    });
    console.log(e.target.value);
  };
  render() {
    console.log(this.props); 
    if (this.props.isFetching === false) {
      return (
        <section className="Shop">
          <div className="Shop__head">
            <div className="hero-content">
              {/* <!-- <h1 className="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
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
              <option value="All Items">Please Select</option>
              <option value="Colabs">Colabs</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Hoodies">Hoodies</option>
              <option value="Crop-Tops">Crop-Tops</option>
              <option value="Long-T">Long-T</option>
              <option value="Pants">Pants</option>
            </select>
          </div>
          <div className="Shop__header">
            <h2 className="Shop__title">{this.state.status}</h2>
            <div
              style={{
                display:
                  this.state.status === "collab" || "all" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards Collabitems"
            >
              {this.props.megaState.Collabitems.map((Item) => (
                <SingleCollabItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                  key={Item.id}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "all" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitems"
            >
              {this.props.megaState.NotCollabitems.map((Item) => (
                <SingleItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                  key={Item.id}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "T-Shirt" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsTShirt"
            >
              {this.props.megaState.CollabitemsTShirt.map((Item) => (
                <SingleCollabItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "T-Shirt" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsTShirt"
            >
              {this.props.megaState.NotCollabitemsTShirt.map((Item) => (
                <SingleItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Long-T" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsLongT"
            >
              {this.props.megaState.CollabitemsLongT.map((Item) => (
                <SingleCollabItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Long-T" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsLongT"
            >
              {this.props.megaState.NotCollabitemsLongT.map((Item) => (
                <SingleItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Crop-Top" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsCropTop"
            >
              {this.props.megaState.CollabitemsCropTop.map((Item) => (
                <SingleCollabItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Crop-Top" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsCropTop"
            >
              {this.props.megaState.NotCollabitemsCropTop.map((Item) => (
                <SingleItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Pants" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsPants"
            >
              {this.props.megaState.CollabitemsPants.map((Item) => (
                <SingleCollabItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Pants" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsPants"
            >
              {this.props.megaState.NotCollabitemsPants.map((Item) => (
                <SingleItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Hoodies" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsHoodies"
            >
              {this.props.megaState.CollabitemsHoodies.map((Item) => (
                <SingleCollabItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                />
              ))}
            </div>
            <div
              style={{
                display: this.state.status === "Hoodies" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsHoodies"
            >
              {this.props.megaState.NotCollabitemsHoodies.map((Item) => (
                <SingleItem
                  Item={Item}
                  shoppingCart={this.props.shoppingCart}
                  addToCart={this.props.addToCart}
                />
              ))}
            </div>
          </div>
        </section>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
export default Shop;
