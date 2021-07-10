const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

function LoadInventory() {
  const fileContent = fs.readFileSync(__dirname, "inventories.json");
  console.log("inventory loaded to memory!")
  return JSON.parse(fileContent);
}

//Read once, reference multiple. Happy memory :)
let loadedInventory = LoadInventory()

function WriteInventory(inventory) {
  fs.writeFileSync(__dirname, "inventories.json", JSON.stringify(inventory));
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
    const newPost = {
      id: uuidv4(),
      itemName : req.body.name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity:req.body.quantity,
      price: req.body.price,
      collab: req.body.collab

    }
    loadedInventory.unshift(newPost);
    fs.writeFileSync("./Data/inventories.json", JSON.stringify(inventories))
    res.send(inventories)
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
  fs.writeFileSync(
    "./Data/inventories.json",
    JSON.stringify(updatedInventoriesData)
  );
  res.send(updatedInventoriesData);
};

exports.deleteInventoryHandeler = (req, res) => {
  let inventoryItems = loadedInventory;
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
