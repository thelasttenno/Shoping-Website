import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteModule from "../DeleteModule/DeleteModule";
import chevron_right from "../../../assets/images/chevron_right.svg";
import edit from '../../../assets/images/edit.svg';
class Singleorder extends Component {
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

    axios.delete('/orders/'+ this.props.order.id).then(
        window.location.reload()
    );
}

  render() {
    return (
        <div className="order__card">
          <div className="order__data order--order-order">
            <h4 className="order__data-header">order</h4>
            <Link
              to={`/admin/${this.props.order.id}/inventory`}
              className="order__data-item"
            >
              <p>{this.props.order.date}</p>
              <img
                className="order__data-item-icon"
                src={chevron_right}
                alt=""
              />
            </Link>
          </div>

          

          <div className="order__data order--order-contactName">
            <h4 className="order__data-header">contact name</h4>
            <p className="order__data-category">{this.props.order.name}</p>
          </div>
           
          <div className="order__data order--order-address">
            <h4 className="order__data-header">address</h4>
            <p
              className="order__data-address"
              data-status={this.props.order.address}
            >
              {this.props.order.address}
            </p>
            <p
              className="order__data-address"
              data-status={this.props.order.address}
            >
              {this.props.order.city},{this.props.order.country}
            </p>
          </div>
          
          <div className="order__data order--order-contactInfo">
            <h4 className="order__data-header">payment confirmed</h4>
            <p className="order__data-qty">{this.props.order.payment}</p>
          </div>

          <div className="order-icon order--order-icon">
            <input
              onClick={this.renderDeleteModule}
              type="button"
              className="delete_icon"
            />
            {this.state.display && (
              <DeleteModule
                order={this.props.order}
                removeDeleteModule={this.removeDeleteModule}
                cancelDeleteModule={this.cancelDeleteModule}
              />
            )}

            <Link
              to={`/admin/orders/${this.props.order.id}/edit-order`}
              className=""
            >
              <img src={edit} alt=""/>
            </Link>
          </div>
        </div>
    );
  }
}

export default Singleorder;