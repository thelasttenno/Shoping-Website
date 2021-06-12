import { Link } from "react-router-dom";
import "./warehouses.scss";
import SingleWarehouse from "../../components/SingleWarehouse/SingleWarehouse"
import sort from '../../assets/images/sort.svg';

const Warehouses = (props) => {
  return (
    <section className="warehouse">
      <div className="warehouse__head">
          <h1 className="warehouse__head-title">Warehouses</h1>
          <div className="warehouse__head-cta">
            <input className="warehouse__head-cta--search" image="" type="text" placeholder="Search..." />
            <Link to={`/addwarehouse`} className="warehouse__head-cta--button">+ Add New Warehouse</Link>
          </div>
      </div>
        <div className="warehouse__header">
          <div className="warehouse__header-single warehouse__header-single--width warehouse__header-single--left">
          <h4 className="warehouse__header-type">WAREHOUSE</h4>
          <img src={sort} alt="" />
          </div>
        <div className="warehouse__header-single warehouse__header-single--width">
          <h4 className="warehouse__header-type">ADDRESS</h4>
          <img src={sort} alt="" />
        </div>
        <div className="warehouse__header-single">
          <h4 className="warehouse__header-type">CONTACT NAME</h4>
          <img src={sort} alt="" />
        </div>
        <div className="warehouse__header-single">
          <h4 className="warehouse__header-type">CONTACT INFORMATION</h4>
          <img src={sort} alt="" />
        </div>
        <div className="warehouse__header-single warehouse__header-single--right">
          <h4 className="warehouse__header-type">ACTIONS</h4>
        </div>
      </div>
      <div>
        {props.warehouses && props.warehouses.map((warehouse) => {
          return (
            <div key={warehouse.id}>
              <SingleWarehouse {...props} warehouse={warehouse}/>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Warehouses;
