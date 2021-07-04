import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import arrow from "../../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../../assets/Icons/error-24px.svg";
import { Link } from "react-router-dom";
import "./AddOrder.scss";
let dateHolder = new Date();
export default class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.submitHandler.bind(this);
    this.form = React.createRef();
  }

  state = {
    dateError: false,
    nameError: false,
    addressError: false,
    paymentError: false,
    emailError: false,
    countryError: false,
    cityError: false,
    //item one
    itemIdError: false,
    quantityNameError: false,
    item2Error: false, // tag for item two to show
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
    const date = e.target.date.value;
    const address = e.target.address.value;
    const payment = e.target.payment.value;
    const email = e.target.email.value;
    const country = e.target.country.value;
    const city = e.target.city.value;
    const itemId = e.target.itemId.value;
    const quantityName = e.target.quantityName.value;
    const item2 = e.target.item2.value;

    //VALIDATE THE DATA FIRST
    if (
      id &&
      name &&
      date &&
      address &&
      payment &&
      email &&
      country &&
      city &&
      itemId &&
      quantityName &&
      item2
    ) {
      //POST THE NEW Inventory INFO TO OUR BACKEND
      console.log(name);
      axios
        .post("http://localhost:5000/orders", {
          id: id,
          date: date,
          name: name,
          address: address,
          payment: payment,
          email: email,
          country: country,
          city: city,
          items: [itemId, quantityName]
          
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("There is something wrong..", err);
        });

      this.setState({ nameError: false });
      this.setState({ dateError: false });
      this.setState({ addressError: false });
      this.setState({ paymentError: false });
      this.setState({ emailError: false });
      this.setState({ countryError: false });
      this.setState({ cityError: false });
      this.setState({ itemIdError: false });
      this.setState({ quantityNameError: false });
      this.setState({ item2Error: false });

      window.alert("New Inventory item successfully added");

      //RESET THE FORM
      e.target.reset();
    } else {
      if (!name) this.setState({ nameError: true });
      if (!date) this.setState({ dateError: true });
      if (!address) this.setState({ addressError: true });
      if (!payment) this.setState({ paymentError: true });
      if (!email) this.setState({ emailError: true });
      if (!country) this.setState({ countryError: true });
      if (!city) this.setState({ cityError: true });
      if (!itemId) this.setState({ itemIdError: true });
      if (!quantityName) this.setState({ quantityNameError: true });
      if (!item2) this.setState({ item2Error: true });
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
          <Link to="/admin/orders">
            <img src={arrow} alt="arrow" className="add-inventory__icon" />
          </Link>
          <h1 className="add-inventory__heading">Add New Order</h1>
        </div>
        <div className="add-inventory__details-form-wrapper">
          <div className="add-inventory__details-container">
            <h3 className="add-inventory__subheading">Order Details</h3>
            <div>
              <label htmlFor="date" className="input-label">
                date
              </label>
              <input
                type="text"
                name="date"
                className={`add-inventory__name input ${
                  this.state.dateError ? "input--error" : ""
                }`}
                placeholder={dateHolder}
                onChange={this.handleChange}
              />
              <div
                className="add-inventory__error-validation"
                style={{ display: this.state.dateError ? "flex" : "none" }}
              >
                <img src={errorIcon} alt="error" />
                This field is required!
              </div>
            </div>

            <div>
              <label htmlFor="name" className="input-label">
                Name
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
            </div>
            <div>
              <label htmlFor="address" className="input-label">
                address
              </label>
              <input
                type="text"
                name="address"
                className={`add-inventory__name input ${
                  this.state.addressError ? "input--error" : ""
                }`}
                placeholder="Item Name"
                onChange={this.handleChange}
              />
              <div
                className="add-inventory__error-validation"
                style={{ display: this.state.addressError ? "flex" : "none" }}
              >
                <img src={errorIcon} alt="error" />
                This field is required!
              </div>
            </div>
            <div>
              {" "}
              <label htmlFor="payment" className="input-label">
                payment
              </label>
              <input
                type="text"
                name="payment"
                className={`add-inventory__name input ${
                  this.state.paymentError ? "input--error" : ""
                }`}
                placeholder="Item Name"
                onChange={this.handleChange}
              />
              <div
                className="add-inventory__error-validation"
                style={{ display: this.state.paymentError ? "flex" : "none" }}
              >
                <img src={errorIcon} alt="error" />
                This field is required!
              </div>
            </div>
            <div>
              {" "}
              <label htmlFor="email" className="input-label">
                email
              </label>
              <input
                type="text"
                name="email"
                className={`add-inventory__name input ${
                  this.state.emailError ? "input--error" : ""
                }`}
                placeholder="Item Name"
                onChange={this.handleChange}
              />
              <div
                className="add-inventory__error-validation"
                style={{ display: this.state.emailError ? "flex" : "none" }}
              >
                <img src={errorIcon} alt="error" />
                This field is required!
              </div>
            </div>
            <div>
              {" "}
              <label htmlFor="country" className="input-label">
                country
              </label>
              <input
                type="text"
                name="country"
                className={`add-inventory__name input ${
                  this.state.countryError ? "input--error" : ""
                }`}
                placeholder="Item Name"
                onChange={this.handleChange}
              />
              <div
                className="add-inventory__error-validation"
                style={{ display: this.state.countryError ? "flex" : "none" }}
              >
                <img src={errorIcon} alt="error" />
                This field is required!
              </div>
            </div>
            <div>
              {" "}
              <label htmlFor="city" className="input-label">
                city
              </label>
              <input
                type="text"
                name="city"
                className={`add-inventory__name input ${
                  this.state.cityError ? "input--error" : ""
                }`}
                placeholder="Item Name"
                onChange={this.handleChange}
              />
              <div
                className="add-inventory__error-validation"
                style={{ display: this.state.cityError ? "flex" : "none" }}
              >
                <img src={errorIcon} alt="error" />
                This field is required!
              </div>
            </div>
          </div>

          {/* AVAILABILITY */}
          <div className="add-inventory__availability-container">
            <h3 className="add-inventory__subheading">Item Availability</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
               <label
              htmlFor="itemId"
              className="input-label"
              // style={{ display: this.state.categoryError ? "flex" : "none" }}
            >
              Item
            </label>
            <select
              type="text"
              name="itemId"
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

              <label htmlFor="quantityName" className="input-label">
                Quantity
              </label>
              <input
                type="text"
                name="quantityName"
                className="add-inventory__quantity"
                placeholder="0"
                onChange={this.handleChange}
              />
            </div>
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
                    addItem
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
                flexDirection: "column",
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
              <label
              htmlFor="item2"
              className="input-label"
              // style={{ display: this.state.categoryError ? "flex" : "none" }}
            >
              Item
            </label>
            <select
              type="text"
              name="item2"
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
            </div>
          </div>
        </div>

        <div className="add-inventory__btn-container">
          <a href="/admin/orders" className="link button button--white">
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
