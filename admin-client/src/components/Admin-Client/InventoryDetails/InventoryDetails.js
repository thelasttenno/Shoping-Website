import React, { Component } from "react";
// import axios from 'axios';
import "./InventoryDetails.scss";
import backArrow from "../../../assets/Icons/arrow_back-24px.svg";
import edit from "../../../assets/Icons/edit-25px.svg";
import { Link } from "react-router-dom";
import axios from "axios";

class InventoryDetails extends Component {
  state = {
    item: null,
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/${this.props.match.params.orderId}/inventory/${this.props.match.params.inventoryId}`
      )
      .then((response) => {
        this.setState({
          item: response.data,
        });
      });
  }
  render() {
    if (this.state.item !== null) {
      const singleInventory = this.state.item;
      const stock =
        singleInventory.status === "In Stock" ? (
          <p className="details2-product__in">In Stock</p>
        ) : (
          <p className="details2-product__out">Out Of Stock</p>
        );
      return (
        <div className="details2">
          <div className="details2__namearrow">
            <Link to={"/admin/inventory"} className="details__link">
              <div className="details2__box">
                <img className="details2__arrow" src={backArrow} alt="" />
                <p className="details2__name">{singleInventory.itemName}</p>
              </div>
            </Link>
            <Link
              className="details2__button"
              to={`/admin/inventory/${singleInventory.id}/edit-inventory`}
            >
              <div className="details2__button-box">
                <img
                  src={edit}
                  alt={"more"}
                  className="details2__button-edit"
                />
              </div>
              <p className="details2__button-name">Edit</p>
            </Link>
          </div>
          <div className="details2__namearrow">
            <div className="details2-product">
              <div className="details2-product__container1">
                <div className="details2-product__body">
                  <p className="details2-product__subtitle">ITEM DESCRIPTION</p>
                  <p className="details2-product__info">
                    {singleInventory.description}
                  </p>
                </div>
                <div className="details2-product__body">
                  <p className="details2-product__subtitle">CATEGORY</p>
                  <p className="details2-product__info">
                    {singleInventory.category}
                  </p>
                </div>
              </div>
              <div className="details2-product__container2">
                <div className="details2-product__body">
                  <p className="details2-product__subtitle">STATUS</p>
                  <div className="details2-product__instock">{stock}</div>
                  <div className="details2-product__body">
                    <p className="details2-product__subtitle">price</p>
                    <p className="details2-product__info">
                      {singleInventory.price}
                    </p>
                  </div>
                </div>
                <div className="details2-product__body-qnt">
                  <p className="details2-product__subtitle">QUANTITY</p>
                  <p className="details2-product__info">
                    {singleInventory.quantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }
  }
}
export default InventoryDetails;
