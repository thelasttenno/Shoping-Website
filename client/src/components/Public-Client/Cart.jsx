import React from "react";
import "./css/main.scss";
import SingleInventoryItem from "../Admin-Client/SingleInventoryItem/SingleInventoryItem";

let BuyList = [
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
  {
    id: "dea4f511-9dbb-4290-ad6e-444aa4e05c12",
    itemName: "angelic T",
    description: "1313123eeqweadafsaasfg34124tgwebwsfbasfvafas",
    category: "Hoodie",
    status: "In Stock",
    quantity: "20",
    price: "55.99",
  },
];

function Cart() {
  return (
    <div>
      {BuyList &&
        BuyList.map((item) => {
          return (
            <div key={item.id}>
              <SingleInventoryItem order={item} />
            </div>
          );
        })}
    </div>
  );
}
export default Cart;
