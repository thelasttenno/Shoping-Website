import React, { Component } from "react";
import DeleteModuleCheckout from "../../Admin-Client/DeleteModule/DeleteModuleInventory";
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
    this.props.removeFromCart() 
  };
  render() {
    const inventory = this.props.inventory;
    return (
        <div className="inventory2__card">
          <div className="inventory2__data inventory--order-item">
            <h4 className="inventory2__data-header">INVENTORY ITEM</h4>
              <p>{inventory.itemName}</p>
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
              <DeleteModuleCheckout
                inventory={this.props.inventory}
                removeDeleteModuleCheckout={this.removeDeleteModuleCheckout}
                cancelDeleteModuleCheckout={this.cancelDeleteModuleCheckout}
              />
            )}
          </div>
        </div>
    );
  }
}

export default SingleInventoryItem;
