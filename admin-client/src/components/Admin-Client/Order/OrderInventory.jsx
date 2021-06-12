import "./OrderInventory.scss"
import {Component} from "react"
import orderDetails from "../OrderDetails/OrderDetails";
import sort from '../../../assets/images/sort.svg';
import SingleorderInventoryItem from "../SingleOrderInventoryItem/SingleOrderInventoryItem"
import axios from "axios";
class ordersInventory extends Component{
  state = {
    inventory: null,
  }
  componentDidMount(){
    axios
    .get(
      `http://localhost:8080/${this.props.match.params.orderId}/inventory`
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
            <orderDetails parentProps={this.props}/>
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
                <SingleorderInventoryItem {...this.props} inventory={inventory}/>
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
export default ordersInventory;