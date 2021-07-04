import { Link } from "react-router-dom";
import "./Orders.scss";
import Singleorder from "../../components/Admin-Client/SingleOrder/SingleOrder"
import sort from '../../assets/images/sort.svg';

const Orders = (props) => {
  console.log(props);
  return (
    <section className="order">
      <div className="order__head">
          <h1 className="order__head-title">ORDERS</h1>
          <div className="order__head-cta">
            <input className="order__head-cta--search" image="" type="text" placeholder="Search..." />
            <Link to={`/admin/addorder`} className="order__head-cta--button">+ Add New order</Link>
          </div>
      </div>
        <div className="order__header">
          <div className="order__header-single order__header-single--width order__header-single--left">
          <h4 className="order__header-type">DATE</h4>
          <img src={sort} alt="" />
          </div>
        <div className="order__header-single order__header-single--width">
          <h4 className="order__header-type">ADDRESS</h4>
          <img src={sort} alt="" />
        </div>
        <div className="order__header-single">
          <h4 className="order__header-type">CONTACT NAME</h4>
          <img src={sort} alt="" />
        </div>
        <div className="order__header-single">
          <h4 className="order__header-type">CONTACT INFORMATION</h4>
          <img src={sort} alt="" />
        </div>
        <div className="order__header-single order__header-single--right">
          <h4 className="order__header-type">ACTIONS</h4>
        </div>
      </div>
      <div>
        {props.orders && props.orders.map((order) => {
          return (
            <div key={order.id}>
              <Singleorder {...props} order={order}/>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Orders;
