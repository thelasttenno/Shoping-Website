const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

function Readorders() {
  const fileContent = fs.readFileSync("./Data/orders.json");
  return JSON.parse(fileContent);
}

function ReadInventory() {
  const fileContent = fs.readFileSync("./Data/inventories.json");
  return JSON.parse(fileContent);
}

function Writeorders(orders) {
  fs.writeFileSync("./Data/orders.json", JSON.stringify(orders));
}

function WriteInventory(inventory) {
  fs.writeFileSync("./Data/inventories.json", JSON.stringify(inventory));
}

// Function to get order by any given id:

// Function to get order by any given id:

function GetorderById(orderId) {
  const orders = Readorders();
  const orderById = orders.filter((order) => order.id === orderId);
  return orderById[0];
}
// USE Readorders() TO READ FROM FILE INSIDE HANDLER

exports.getordersHandeler = (req, res) => {
  const orders = Readorders();
  res.json(orders);
};
exports.getSingleorderHandeler = (req, res) => {
  res.json(GetorderById(req.params.orderId));
};
exports.postordersHandeler = (req, res) => {
  const orders = Readorders();
  const newObj = req.body;
  orders.unshift(newObj);
  fs.writeFileSync("./Data/orders.json", JSON.stringify(orders));

  res.send(orders);
};

// Edit/update order:

exports.putordersHandeler = (req, res) => {
  let orders = Readorders();
  let orderId = req.params.orderId;
  let currentorder = GetorderById(req.params.orderId);
  const inventoryId = req.params.inventoryId;
  const inventory = GetInventoryById(inventoryId);
  // preparing updated current order data:
  let updatedorder = {
    id: orderId,
    date: req.body.data.date || currentorder.date,
    contact: {
      name: req.body.data.name || currentorder.name,
      address: req.body.data.address || currentorder.address,
      city: req.body.data.city || currentorder.city,
      country: req.body.data.country || currentorder.country,
      email: req.body.data.contactEmail || currentorder.contact.email,
    },
    items: {
      1: {
        id: inventory.id,
        price: req.body.data.price || inventory.price,
        itemName: req.body.data.itemName || inventory.itemName,
        description: req.body.data.description || inventory.description,
        category: req.body.data.category || inventory.category,
        status: req.body.data.status || inventory.status,
        quantity:
          req.body.data.status === "Out of Stock"
            ? 0
            : req.body.data.quantity || inventory.quantity,
      },
      2: {},
    },
  };
  let updatedFullorderData = orders.map((order) =>
    order.id === orderId ? updatedorder : order
  );
  fs.writeFileSync("./Data/orders.json", JSON.stringify(updatedFullorderData));
  res.send(updatedFullorderData);
};

exports.deleteordersHandeler = (req, res) => {
  let orders = Readorders();
  let inventoryItems = ReadInventory();
  let orderId = req.params.orderId;

  const neworders = orders.filter((order) => order.id !== orderId);
  const newInventory = inventoryItems.filter(
    (inventory) => inventory.orderID !== orderId
  );

  Writeorders(neworders);
  WriteInventory(newInventory);

  fs.writeFileSync("./Data/orders.json", JSON.stringify(updatedFullorderData));
  res.send(updatedFullorderData);
};
