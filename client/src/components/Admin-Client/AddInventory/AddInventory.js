import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import arrow from "../../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../../assets/Icons/error-24px.svg";

import { Link } from "react-router-dom";
import "./AddInventory.scss";

export default class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.submitHandler.bind(this);
    this.form = React.createRef();
  }

  state = {
    nameError: false,
    descriptionError: false,
    categoryError: false,
    statusError: false,
    quantityNameError: false,
    orderError: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name + "Error"]: e.target.value ? false : true,
    });
  };
  updateStatus = (e) => {
    const { value } = e.target;
    this.setState({
      status: value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    //HAVE THE VALUE FROM THE FORM

    const id = uuidv4();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const size = e.target.size.value;
    const status = e.target.status.value;
    const quantity = e.target.quantity.value;
    const price = e.target.price.value;

    //VALIDATE THE DATA FIRST
    if (
      id &&
      name &&
      description &&
      category &&
      size &&
      status &&
      quantity &&
      price 
    ) {
      //POST THE NEW Inventory INFO TO OUR BACKEND
      console.log(name);
      axios
        .post("http://localhost:8080/orders/inventory", {
          id: id,
          name: name,
          description: description,
          category: category,
          size: size,
          status: status,
          quantity: quantity,
          price: price,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("There is something wrong..", err);
        });

      this.setState({ nameError: false });
      this.setState({ descriptionError: false });
      this.setState({ categoryError: false });
      this.setState({ sizeError: false });
      this.setState({ statusError: false });
      this.setState({ quantityError: false });
      this.setState({ priceError: false });

      window.alert("New Inventory item successfully added");

      //RESET THE FORM
      e.target.reset();
    } else {
      if (!name) this.setState({ nameError: true });
      if (!description) this.setState({ descriptionError: true });
      if (!category) this.setState({ categoryError: true });
      if (!size) this.setState({ sizeError: true });
      if (!status) this.setState({ statusError: true });
      if (!quantity) this.setState({ quantityError: true });
      if (!price) this.setState({ priceError: true });
    }
  };
  render() {
    return (
      <form
        ref={this.form}
        onSubmit={this.submitHandler}
        className="add-inventory"
      >
        <div className="add-inventory__header-container">
          <Link to="/admin/inventory">
            <img src={arrow} alt="arrow" className="add-inventory__icon" />
          </Link>
          <h1 className="add-inventory__heading">Add New Inventory Item</h1>
        </div>
        <div className="add-inventory__details-form-wrapper">
          <div className="add-inventory__details-container">
            <h3 className="add-inventory__subheading">Item Details</h3>
            <label htmlFor="name" className="input-label">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              className={`add-inventory__name input ${
                this.state.nameError ? "input--error" : ""
              }`}
              placeholder="Item Name"
              onChange={this.handleChange}
            />
            <div
              className="add-inventory__error-validation"
              style={{ display: this.state.nameError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="price" className="input-label">
              Item Price
            </label>
            <input
              type="text"
              name="price"
              className={`add-inventory__name input ${
                this.state.nameError ? "input--error" : ""
              }`}
              placeholder="Item Price"
              onChange={this.handleChange}
            />
            <div
              className="add-inventory__error-validation"
              style={{ display: this.state.nameError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label htmlFor="name" className="input-label">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              className={`add-inventory__description input ${
                this.state.descriptionError ? "input--error" : ""
              }`}
              placeholder="Please enter a brief item description..."
              onChange={this.handleChange}
            />
            <div
              className="add-inventory__error-validation"
              style={{ display: this.state.descriptionError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required!
            </div>

            <label
              htmlFor="name"
              className="input-label"
              // style={{ display: this.state.categoryError ? "flex" : "none" }}
            >
              Category
            </label>
            <select
              type="text"
              name="category"
              className="input select"
              placeholder="Please select"
              onChange={this.handleChange}
            >
              <option>Please Select</option>
              <option value="Hoodie">Hoodie</option>
              <option value="T-Shirt">T-Shirt</option>
              <option value="Long-T">Long-T</option>
              <option value="Crop-Top">Crop-Top</option>
              <option value="Pants">Pants</option>
            </select>

            <label
              htmlFor="name"
              className="input-label"
              // style={{ display: this.state.categoryError ? "flex" : "none" }}
            >
              Size
            </label>
            <select
              type="text"
              name="size"
              className="input select"
              placeholder="Please select"
              onChange={this.handleChange}
            >
              <option>Please Select</option>
              <option value="Electronics">S</option>
              <option value="Gear">M</option>
              <option value="Apparel">L</option>
              <option value="Accessories">XL</option>
            </select>
          </div>

          {/* AVAILABILITY */}
          <div className="add-inventory__availability-container">
            <h3 className="add-inventory__subheading">Item Availability</h3>
            <div className="add-inventory__status-container">
              <label htmlFor="status" className="input-label">
                Status
              </label>
              <div className="add-inventory__radio-btn-container">
                <div className="add-inventory__status-instock-radio">
                  <input
                    type="radio"
                    name="status"
                    className="input radio add-inventory__status-radio-in"
                    value="In Stock"
                    onClick={this.updateStatus}
                  />

                  <label
                    htmlFor="status"
                    className="add-inventory__status-label radio-label"
                  >
                    In Stock
                  </label>
                </div>
                <div className="add-inventory__status-outstock-radio">
                  <input
                    type="radio"
                    name="status"
                    className="input radio add-inventory__status-radio-out"
                    value="Out of stock"
                    onClick={this.updateStatus}
                  />
                  <label
                    htmlFor="status"
                    className="add-inventory__status-label"
                  >
                    Out of Stock
                  </label>
                </div>
              </div>
            </div>

            <div
              className="add-inventory__error-validation"
              // style={{ display: this.state.statusError ? "flex" : "none" }}
            >
              {/* <img src={errorIcon} alt="error" />
              This field is required! */}
            </div>

            <div
              style={{
                display: this.state.status === "In Stock" ? "flex" : "none",
                flexDirection:"column",
              }}
            >
              <label htmlFor="quantity" className="input-label">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                className="add-inventory__quantity"
                placeholder="0"
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>

        <div className="add-inventory__btn-container">
          <a href="/admin/inventory" className="link button button--white">
            Cancel
          </a>
          <button
            type="submit"
            className=" button button--indigo button--addItem "
          >
            + Add Item
          </button>
        </div>
      </form>
    );
  }
}
