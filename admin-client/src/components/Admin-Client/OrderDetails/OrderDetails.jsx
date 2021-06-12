import React from "react";
import axios from "axios";
import "./OrderDetails.scss";
import backArrow from "../../../assets/Icons/arrow_back-24px.svg";
import edit from "../../../assets/Icons/edit-25px.svg";
import { Link } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";

class orderDetails extends React.Component {
  state = {
    order: null,
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/orders/${this.props.parentProps.match.params.orderId}`
      )
      .then((response) => {
        this.setState({
          order: response,
        });
      });
  }
  render() {
    if (this.state.order !== null) {
      const singleorder = this.state.order;
      return (
        <div className="details">
          <div className="details__namearrow">
            <Link className="details__link" to={"/orders"}>
              <div className="details__box">
                <img
                  className="details__arrow"
                  alt="back arrow"
                  src={backArrow}
                />
                <p className="details__name">{singleorder.data.name}</p>
              </div>
            </Link>
            <Link
              className="details__button"
              to={`/orders/${singleorder.data.id}/edit-order`}
            >
              <div className="details__button-box">
                <img src={edit} alt={"more"} className="details__button-edit" />
              </div>
              <p className="details__button-name">Edit</p>
            </Link>
          </div>
          <div className="details__namearrow">
            <AddressCard orderData={singleorder} />
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
export default orderDetails;
