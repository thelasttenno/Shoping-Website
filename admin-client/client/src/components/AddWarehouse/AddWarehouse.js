import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import arrow from "../../assets/Icons/arrow_back-24px.svg";
import errorIcon from "../../assets/Icons/error-24px.svg";

import { Link } from "react-router-dom";
import "./AddWarehouse.scss";

export default class AddWarehouse extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.form = React.createRef();
  }

  state = {
    nameError: false,
    addressError: false,
    cityError: false,
    countryError: false,
    contactNameError: false,
    positionError: false,
    contactPhoneError: false,
    emailError: false,
    isValidPhoneNumber: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name + "Error"]: e.target.value ? false : true,
    });
  };

  // Alert div after validation:

  // Alert = () => (
  //   <div className="add-warehouse__error-validation">
  //     <img src={errorIcon} alt="error" className="input--error-img" />
  //     <span className="input--error-msg">This field is required </span>
  //   </div>
  // );

  // Alert div for phonenumber:

  // AlertPhoneNumber = () => (
  //   <div className="add-warehouse__error-validation">
  //     <img
  //       src={errorIcon}
  //       alt="error"
  //     />
  //     <span>
  //       Required format +1 (123) 123-1234{" "}
  //     </span>
  //   </div>
  // );
  // Alert div (invisible)

  // AlertInvisible = () => (
  //   <div className="input--errorContainer-invisible">
  //     <img src={errorIcon} alt="error" className="input--error-img" />
  //     <span className="input--error-msg">This field is required </span>
  //   </div>
  // );

  // Phone number validation:

  // checkPhoneNumber = () => {
  //   let phoneRegex = /^\+1?\s\(\d{3}\)\s\d{3}-\d{4}$/;
  //   if (this.state.contactPhone.match(phoneRegex)) {
  //     return true;
  //   } else {
  //     this.setState({ isValidPhoneNumber: false });
  //     return false;
  //   }
  // };
  // isFormValid = () => {
  //   if (
  //     this.state.nameError ||
  //     this.state.addressError ||
  //     this.state.cityError ||
  //     this.state.countryError ||
  //     this.state.contactNameError ||
  //     this.state.contactPositionError ||
  //     this.state.contactPhoneError ||
  //     this.state.contactEmailError ||
  //     !this.checkValidEmail() ||
  //     !this.checkPhoneNumber()
  //   ) {
  //     this.setState({ isValid: false });
  //     return false;
  //   } else {
  //     this.setState({ isValid: true });
  //     return true;
  //   }
  // };

  submitHandler = (e) => {
    e.preventDefault();

    //HAVE THE VALUE FROM THE FORM

    const id = uuidv4();
    const name = this.form.current.name.value;
    const address = this.form.current.address.value;
    const city = this.form.current.city.value;
    const country = this.form.current.country.value;
    const contactName = this.form.current.contactName.value;
    const position = this.form.current.position.value;
    const contactPhone = this.form.current.contactPhone.value;
    const email = this.form.current.email.value;

    //VALIDATE THE DATA FIRST
    if (
      id &&
      name &&
      address &&
      city &&
      country &&
      contactName &&
      position &&
      contactPhone &&
      email
    ) {
      //POST THE NEW WAREHOUSE INFO TO OUR BACKEND
      axios
        .post("http://localhost:8080/warehouses", {
          id: id,
          name: name,
          address: address,
          city: city,
          country: country,
          contact: {
            name: contactName,
            position: position,
            phone: contactPhone,
            email: email,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("There is something wrong..", err);
        });

      this.setState({ nameError: false });
      this.setState({ addressError: false });
      this.setState({ cityError: false });
      this.setState({ countryError: false });
      this.setState({ contactError: false });
      this.setState({ positionError: false });
      this.setState({ contactPhoneError: false });
      this.setState({ emailError: false });

      window.alert("Warehouse successfully added");

      //RESET THE FORM
      e.target.reset();
    } else {
      //NEET TO ADD ERROR HERE>>
      if (!name) this.setState({ nameError: true });
      if (!address) this.setState({ addressError: true });
      if (!city) this.setState({ cityError: true });
      if (!country) this.setState({ countryError: true });
      if (!contactName) this.setState({ contactNameError: true });
      if (!position) this.setState({ positionError: true });
      if (!contactPhone) this.setState({ contactPhoneError: true });
      if (!email) this.setState({ emailError: true });

      window.alert("please fill in all the information required.");
    }
  };

  render() {
    return (
      <form
        ref={this.form}
        className="add-warehouse"
        onSubmit={this.submitHandler}
      >
        <div className="add-warehouse__heading-arrow-container">
          <Link to="/warehouses">
            <img className="add-warehouse__arrow" src={arrow} alt="arrow" />
          </Link>
          <h1 className="add-warehouse__heading">Add New Warehouse</h1>
        </div>
        <div className="add-warehouse__details-contact-container">
          {/* details section */}
          <div className="add-warehouse__warehouse-details">
            <h3 className="add-warehouse__subheading">Warehouse Details</h3>
            <label htmlFor="name" className="input-label">
              Warehouse Name
            </label>
            <input
              type="text"
              name="name"
              className="add-warehouse__name"
              placeholder="Warehouse Name"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              // checking this part
              style={{ display: this.state.nameError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>

            <label htmlFor="address" className="input-label">
              Street Address
            </label>
            <input
              type="text"
              name="address"
              className="add-warehouse__address"
              placeholder="Warehouse Address"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              style={{ display: this.state.addressError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>

            <label htmlFor="city" className="input-label">
              City
            </label>
            <input
              type="text"
              name="city"
              className="add-warehouse__city"
              placeholder="City"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              // checking this part
              style={{ display: this.state.cityError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>

            <label htmlFor="country" className="input-label">
              Country
            </label>
            <input
              type="text"
              name="country"
              className="add-warehouse__country"
              placeholder="Country"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              // checking this part
              style={{ display: this.state.countryError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>
          </div>
          {/* contact section */}

          <div className="add-warehouse__contact-details">
            <h3 className="add-warehouse__subheading">Contact Details</h3>
            <label htmlFor="contactName" className="input-label">
              Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              className="add-warehouse__contact"
              placeholder="Contact Name"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              // checking this part
              style={{ display: this.state.contactNameError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>

            <label htmlFor="position" className="input-label">
              Position
            </label>
            <input
              type="text"
              name="position"
              className="add-warehouse__position"
              placeholder="Position"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              // checking this part
              style={{ display: this.state.positionError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>

            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <input
              type="tel"
              name="contactPhone"
              className="add-warehouse__number"
              placeholder="number"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              // checking this part
              style={{
                display: this.state.contactPhoneError ? "flex" : "none",
              }}

            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>
            {/* //added */}
            {/* {this.state.contactPhoneError? this.Alert(): '' } */}
            {/* {this.state.isValidPhoneNumber
              ? this.AlertInvisible()
              : this.AlertPhoneNumber()} */}

            <label htmlFor="email" className="input-label">
              Email{" "}
            </label>
            <input
              type="email"
              name="email"
              className="add-warehouse__email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <div
              className="add-warehouse__error-validation"
              // checking this part
              style={{ display: this.state.emailError ? "flex" : "none" }}
            >
              <img src={errorIcon} alt="error" />
              This field is required
            </div>
          </div>
        </div>
        <div className="add-warehouse__btn-container">
          <Link to="/warehouses">
            <button className="button button--white add-warehouse__cancle-btn">
              Cancle
            </button>
          </Link>
          <button
            type="submit"
            className="button button--indigo add-warehouse__save-btn"
          >
            {" "}
            + Add Warehouse
          </button>
        </div>
      </form>
    );
  }
}
