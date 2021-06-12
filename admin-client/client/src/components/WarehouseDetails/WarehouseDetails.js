import React from "react";
import axios from "axios";
import "./warehouseDetails.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import edit from "../../assets/Icons/edit-25px.svg";
import { Link } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";

class WarehouseDetails extends React.Component {
  state = {
    warehouse: null,
  };
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/warehouses/${this.props.parentProps.match.params.warehouseId}`
      )
      .then((response) => {
        this.setState({
          warehouse: response,
        });
      });
  }
  render() {
    if (this.state.warehouse !== null) {
      const singleWarehouse = this.state.warehouse;
      return (
        <div className="details">
          <div className="details__namearrow">
            <Link className="details__link" to={"/warehouses"}>
              <div className="details__box">
                <img
                  className="details__arrow"
                  alt="back arrow"
                  src={backArrow}
                />
                <p className="details__name">{singleWarehouse.data.name}</p>
              </div>
            </Link>
            <Link
              className="details__button"
              to={`/warehouses/${singleWarehouse.data.id}/edit-warehouse`}
            >
              <div className="details__button-box">
                <img src={edit} alt={"more"} className="details__button-edit" />
              </div>
              <p className="details__button-name">Edit</p>
            </Link>
          </div>
          <div className="details__namearrow">
            <AddressCard warehouseData={singleWarehouse} />
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
export default WarehouseDetails;
