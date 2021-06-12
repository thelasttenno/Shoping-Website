const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

function ReadInventory() {
  const fileContent = fs.readFileSync("./Data/inventories.json");
  return JSON.parse(fileContent);
}

function WriteInventory(inventory) {
  fs.writeFileSync("./Data/inventories.json", JSON.stringify(inventory));
}

function GetInventoryById(inventoryId) {
  const inventories = ReadInventory();
  const inventoryById = inventories.filter(
    (inventory) => inventory.id === inventoryId
  );
  return inventoryById[0];
}

function GetInventoryByorderId(orderId){
  const inventories = ReadInventory();
  return (inventories.filter(inventory => inventory.orderID === orderId));
}
// USE ReadInventory() TO READ FROM FILE INSIDE HANDLER


exports.getInventoryHandeler = (req, res) => {
  const inventories = ReadInventory();
  res.json(inventories);
};
exports.getSingleorderInventoryHandeler = (req, res) => {
  res.json(GetInventoryByorderId(req.params.orderId));
}
exports.getSingleItemHandeler = (req, res) => {
  res.json(GetInventoryById(req.params.inventoryId));
};
exports.postInventoryHandeler = (req, res) => {
  const inventories = ReadInventory();
    const newPost = {
      id: uuidv4(),
      itemName : req.body.name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity:req.body.quantity,
      price: req.body.price

    }
    inventories.unshift(newPost);
    fs.writeFileSync("./Data/inventories.json", JSON.stringify(inventories))
    res.send(inventories)
};

// inventory put req handler:

exports.putInventoryHandeler = (req, res) => {
  const inventories = ReadInventory();
  const inventoryId = req.params.inventoryId;
  const inventory = GetInventoryById(inventoryId);
  let updatedInventory = {
    id: inventory.id,
    price: req.body.data.price || inventory.price,
    itemName: req.body.data.itemName || inventory.itemName,
    description: req.body.data.description || inventory.description,
    category: req.body.data.category || inventory.category,
    status: req.body.data.status || inventory.status,
    quantity: req.body.data.status === 'Out of Stock'? 0 : (req.body.data.quantity || inventory.quantity),
  };
  let updatedInventoriesData = inventories.map((inventory) =>
    inventory.id === inventoryId ? updatedInventory : inventory
  );
  fs.writeFileSync(
    "./Data/inventories.json",
    JSON.stringify(updatedInventoriesData)
  );
  res.send(updatedInventoriesData);
};

exports.deleteInventoryHandeler = (req, res) => {
  let inventoryItems = ReadInventory();
  let inventoryId = req.params.inventoryId;
  console.log(inventoryId);
  const newInventory = inventoryItems.filter((inventory) => inventory.id !== inventoryId)

  WriteInventory(newInventory);

  fs.writeFileSync(
      "./Data/inventories.json",
      JSON.stringify(updatedFullInventoryData)
  );
  res.send(updatedFullInventoryData);
};
