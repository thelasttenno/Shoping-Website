import "./warehousesInventory.scss"
import {Component} from "react"
import WarehouseDetails from "../WarehouseDetails/WarehouseDetails.js";
import sort from '../../assets/images/sort.svg';
import SingleWarehouseInventoryItem from "../SingleWarehouseInventoryItem/SingleWarehouseInventoryItem"
import axios from "axios";
class WarehousesInventory extends Component{
  state = {
    inventory: null,
  }
  componentDidMount(){
    axios
    .get(
      `http://localhost:8080/${this.props.match.params.warehouseId}/inventory`
    )
    .then((response) => {
      this.setState({
        inventory: response.data,
      });
    });
  }
  render(){
    if(this.state.inventory !== null){
      return (
        <section className="inventory">
          <div>
            <WarehouseDetails parentProps={this.props}/>
          </div>
    
          <div className="inventory__header">
    
            <div className="inventory__header-single">
              <h4 className="inventory__header-type">INVENTORY ITEM</h4>
              <img src={sort} alt="" />
            </div>
            <div className="inventory__header-single">
              <h4 className="inventory__header-type">CATEGORY</h4>
              <img src={sort} alt="" />
            </div>
            <div className="inventory__header-single inventory__header-single--width">
              <h4 className="inventory__header-type">STATUS</h4>
              <img src={sort} alt="" />
            </div>
            <div className="inventory__header-single">
              <h4 className="inventory__header-type">QUANTITY</h4>
              <img src={sort} alt="" />
            </div>
            <div className="inventory__header-single">
              <h4 className="inventory__header-type">ACTIONS</h4>
            </div>
          </div>
    
          {this.state.inventory.map((inventory) => {
              return (
                <SingleWarehouseInventoryItem {...this.props} inventory={inventory}/>
              );
            })
          }
    
        </section>
      );  
    } else {
      return(
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }

    }
 
}
export default WarehousesInventory;