const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

function LoadInventory() {
  // const fileContent = fs.readFileSync("server/Data/inventories.json");
  const fileContent = fs.readFileSync("Data/inventories.json");

  console.log("inventory loaded to memory!")
  return JSON.parse(fileContent);
}

//Read once, reference multiple. Happy memory :)
let loadedInventory = LoadInventory()

function WriteInventory(inventory) {
  // fs.writeFileSync("server/Data/inventories.json", JSON.stringify(inventory));
  fs.writeFileSync("Data/inventories.json", JSON.stringify(inventory));

  //also update loaded inventory
  loadedInventory = LoadInventory()
}

function GetInventoryById(inventoryId) {
  // const inventories = ReadInventory();
  const inventoryById = loadedInventory.filter(
    (inventory) => inventory.id === inventoryId
  );
  return inventoryById[0];
}

function GetInventoryByorderId(orderId){
  // const inventories = ReadInventory();
  return (loadedInventory.filter(inventory => inventory.orderID === orderId));
}
// USE ReadInventory() TO READ FROM FILE INSIDE HANDLER


exports.getInventoryHandeler = (req, res) => {
  // const inventories = ReadInventory();
  res.json(loadedInventory);
};
exports.getSingleorderInventoryHandeler = (req, res) => {
  res.json(GetInventoryByorderId(req.params.orderId));
}
exports.getSingleItemHandeler = (req, res) => {
  res.json(GetInventoryById(req.params.inventoryId));
};
exports.postInventoryHandeler = (req, res) => {
  // const inventories = ReadInventory();
  console.log(req.query);
  console.log(req.body);
  console.log(req.params);
    const newPost = {
      id: req.query.id,
      itemName : req.query.name,
      description: req.query.description,
      category: req.query.category,
      status: req.query.status,
      quantity:req.query.quantity,
      price: req.query.price,
      collab: req.query.collab

    }
    loadedInventory.unshift(newPost);

    // fs.writeFileSync("server/Data/inventories.json", JSON.stringify(inventories))
    fs.writeFileSync("Data/inventories.json", JSON.stringify(loadedInventory))

    res.send(loadedInventory)
};

// inventory put req handler:

exports.putInventoryHandeler = (req, res) => {
  const inventories = loadedInventory;
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
  // fs.writeFileSync("server/Data/inventories.json", JSON.stringify(updatedInventoriesData));
  fs.writeFileSync("Data/inventories.json", JSON.stringify(updatedInventoriesData));
  res.send(updatedInventoriesData);
};

exports.deleteInventoryHandeler = (req, res) => {
  let inventoryItems = loadedInventory;
  let inventoryId = req.params.inventoryId;
  console.log(inventoryId);
  const newInventory = inventoryItems.filter((inventory) => inventory.id !== inventoryId)

  WriteInventory(newInventory);

  // fs.writeFileSync("server/Data/inventories.json", JSON.stringify(updatedFullInventoryData));
  fs.writeFileSync("Data/inventories.json", JSON.stringify(updatedFullInventoryData));
  res.send(updatedFullInventoryData);
};
