import React, { Component } from "react";
import { Link } from "react-router-dom";
import DeleteModuleInventory from "../DeleteModule/DeleteModuleInventory";
import chevron_right from "../../../assets/images/chevron_right.svg";
import edit from '../../../assets/images/edit.svg';
import axios from "axios";
class SingleInventoryItem extends Component {
  state = {
    display: false,
  };

  renderDeleteModuleInventory = () => {
    this.setState({
      display: true,
    });
  };

  cancelDeleteModuleInventory = () => {
    this.setState({
      display: false,
    });
  };

  removeDeleteModuleInventory = () => {
    this.setState({
      display: false,
    });
    axios.delete('http://localhost:8080/inventory/'+ this.props.inventory.id).then(
      window.location.reload()
      );
      
  };
  render() {
    const inventory = this.props.inventory;
    return (
        <div className="inventory2__card">
          <div className="inventory2__data inventory--order-item">
            <h4 className="inventory2__data-header">INVENTORY ITEM</h4>
            <Link
              to={`/admin/inventory/${inventory.id}`}
              className="inventory2__data-item"
            >
              <p>{inventory.itemName}</p>
              <img
                className="inventory2__data-item-icon"
                src={chevron_right}
                alt=""
              />
            </Link>
          </div>

          <div className="inventory2__data inventory--order-status">
            <h4 className="inventory2__data-header">STATUS</h4>
            <p
              className="inventory2__data-status"
              data-status={inventory.status}
            >
              {inventory.status}
            </p>
          </div>

          <div className="inventory2__data inventory2--order-category">
            <h4 className="inventory2__data-header">CATEGORY</h4>
            <p className="inventory2__data-category">{inventory.category}</p>
          </div>

          <div className="inventory2__data inventory2--order-qty">
            <h4 className="inventory2__data-header">QTY</h4>
            <p className="inventory2__data-qty">{inventory.quantity}</p>
          </div>

          <div className="inventory2__data inventory2--order-order">
            <h4 className="inventory2__data-header">price</h4>
            <p className="inventory2__data-qty">{inventory.price}</p>
          </div>

          <div className="inventory2-icon inventory2--order-icon">
            <input
              onClick={this.renderDeleteModuleInventory}
              type="button"
              className="delete_icon"
            />
            {this.state.display && (
              <DeleteModuleInventory
                inventory={this.props.inventory}
                removeDeleteModuleInventory={this.removeDeleteModuleInventory}
                cancelDeleteModuleInventory={this.cancelDeleteModuleInventory}
              />
            )}
            <Link
              to={`/admin/inventory/${inventory.id}/edit-inventory`}
              className=""
            >
              <img src={edit} alt=""/>
            </Link>
          </div>
        </div>
    );
  }
}

export default SingleInventoryItem;
