import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./singleWarehouse.scss";
import DeleteModule from "../DeleteModule/DeleteModule";
import chevron_right from "../../assets/images/chevron_right.svg";
import edit from '../../assets/images/edit.svg';
class SingleWarehouse extends Component {
  state = {
    display: false,
  };

  renderDeleteModule = () => {
    this.setState({
      display: true,
    });
  };

  cancelDeleteModule = () => {
    this.setState({
      display: false,
    });
  };

  removeDeleteModule = () => {
    this.setState({
        display: false,
    })

    axios.delete('http://localhost:8080/warehouses/'+ this.props.warehouse.id).then(
        window.location.reload()
    );
}

  render() {
    return (
        <div className="warehouse__card">
          <div className="warehouse__data warehouse--order-warehouse">
            <h4 className="warehouse__data-header">Warehouse</h4>
            <Link
              to={`/${this.props.warehouse.id}/inventory`}
              className="warehouse__data-item"
            >
              <p>{this.props.warehouse.name}</p>
              <img
                className="warehouse__data-item-icon"
                src={chevron_right}
                alt=""
              />
            </Link>
          </div>

          

          <div className="warehouse__data warehouse--order-contactName">
            <h4 className="warehouse__data-header">contact name</h4>
            <p className="warehouse__data-category">{this.props.warehouse.contact.name}</p>
          </div>
           
          <div className="warehouse__data warehouse--order-address">
            <h4 className="warehouse__data-header">address</h4>
            <p
              className="warehouse__data-address"
              data-status={this.props.warehouse.address}
            >
              {this.props.warehouse.address}
            </p>
            <p
              className="warehouse__data-address"
              data-status={this.props.warehouse.address}
            >
              {this.props.warehouse.city},{this.props.warehouse.country}
            </p>
          </div>
          
          <div className="warehouse__data warehouse--order-contactInfo">
            <h4 className="warehouse__data-header">contact information</h4>
            <p className="warehouse__data-qty">{this.props.warehouse.contact.phone}</p>
            <p className="warehouse__data-qty">{this.props.warehouse.contact.email}</p>
          </div>

          <div className="warehouse-icon warehouse--order-icon">
            <input
              onClick={this.renderDeleteModule}
              type="button"
              className="delete_icon"
            />
            {this.state.display && (
              <DeleteModule
                warehouse={this.props.warehouse}
                removeDeleteModule={this.removeDeleteModule}
                cancelDeleteModule={this.cancelDeleteModule}
              />
            )}

            <Link
              to={`/warehouses/${this.props.warehouse.id}/edit-warehouse`}
              className=""
            >
              <img src={edit} alt=""/>
            </Link>
          </div>
        </div>
    );
  }
}

export default SingleWarehouse;