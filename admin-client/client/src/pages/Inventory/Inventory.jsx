// import { Link } from "react-router-dom";
import SingleInventoryItem from "../../components/SingleInventoryItem/SingleInventoryItem";
import { Link } from "react-router-dom";
import "./inventory.scss";
import sort from "../../assets/images/sort.svg";

const Inventory = (props) => {
  return (
    <section className="inventory2">
      <div className="inventory2__head">
        <h1 className="inventory2__head-title">Inventory</h1>
        <div className="inventory2__head-cta">
          <input
            className="inventory2__head-cta--search"
            image=""
            type="text"
            placeholder="Search..."
          />
          <Link to={`/admin/inventory/new-inventory`} className="inventory2__head-cta--button">
            + Add inventory
          </Link>
        </div>
      </div>
      <div className="inventory2__header">
        <div className="inventory2__header-single">
          <h4 className="inventory2__header-type">INVENTORY ITEM</h4>
          <img src={sort} alt="" />
        </div>
        <div className="inventory2__header-single">
          <h4 className="inventory2__header-type">CATEGORY</h4>
          <img src={sort} alt="" />
        </div>
        <div className="inventory2__header-single inventory2__header-single--width">
          <h4 className="inventory2__header-type">STATUS</h4>
          <img src={sort} alt="" />
        </div>
        <div className="inventory2__header-single">
          <h4 className="inventory2__header-type">QUANTITY</h4>
          <img src={sort} alt="" />
        </div>
        <div className="inventory2__header-single">
          <h4 className="inventory2__header-type">price</h4>
          <img src={sort} alt="" />
        </div>
        <div className="inventory2__header-single">
          <h4 className="inventory2__header-type">ACTIONS</h4>
        </div>
      </div>
      <div>
        {props.inventory.map((inventory) => {
            // console.log(inventory);
           return (
              <div key={inventory.id}>
                <SingleInventoryItem {...props} inventory={inventory} />
              </div>
            )
          })}
      </div>
    </section>
  );
};
export default Inventory;
