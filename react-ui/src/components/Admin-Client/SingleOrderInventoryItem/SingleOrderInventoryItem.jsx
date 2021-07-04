import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DeleteModuleInventory from "../DeleteModule/DeleteModuleInventory"
import edit from '../../../assets/images/edit.svg';
import chevron_right from '../../../assets/images/chevron_right.svg';
import axios from "axios"


class SingleorderInventoryItem extends Component {
    state = {
        display: false,
    }
    
    renderDeleteModuleInventory = () => {
        this.setState({
            display: true,
        })
    }
    
    cancelDeleteModuleInventory = () => {
        this.setState({
            display: false,
        })
    }

    removeDeleteModuleInventory = () => {
        this.setState({
            display: false,
        })
        
        axios.delete(`http://localhost:5000/${this.props.inventory.orderID}/inventory/${this.props.inventory.id}`).then(
            window.location.reload()
            );
    }

    render() {
        return (
            <div key={this.props.inventory.id} >
            <div className="inventory__card">
              <div className="inventory__data inventory--order-item">
                <h4 className="inventory__data-header">INVENTORY ITEM</h4>
                <Link to={`/inventory/${this.props.inventory.id}/edit-inventory`} className="inventory__data-item">
                  <p>{this.props.inventory.itemName}</p>
                  <img className="inventory__data-item-icon" src={chevron_right} alt=""/>
                </Link>
              </div>

              <div className="inventory__data inventory--order-status">
                <h4 className="inventory__data-header">STATUS</h4>
                <p className="inventory__data-status" data-status={this.props.inventory.status}>{this.props.inventory.status}</p>
              </div>
              
              <div className="inventory__data inventory--order-category">
                <h4 className="inventory__data-header">CATEGORY</h4>
                <p className="inventory__data-category">{this.props.inventory.category}</p>
              </div>

              <div className="inventory__data inventory--order-qty">
                <h4 className="inventory__data-header">QTY</h4>
                <p className="inventory__data-qty" >{this.props.inventory.quantity}</p>
              </div>

              <div className="inventory-icon inventory--order-icon">
                
              <input onClick={this.renderDeleteModuleInventory} type="button" className="delete_icon" />
                {this.state.display && <DeleteModuleInventory inventory={this.props.inventory} removeDeleteModuleInventory={this.removeDeleteModuleInventory} cancelDeleteModuleInventory={this.cancelDeleteModuleInventory} />}
                
                <img className="inventory-icon-edit" src={edit} alt="" />
                

              </div>
            </div>
          </div>
        );
    }
}

export default SingleorderInventoryItem;