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

function GetInventoryByWarehouseId(warehouseId){
  const inventories = ReadInventory();
  return (inventories.filter(inventory => inventory.warehouseID === warehouseId));
}
// USE ReadInventory() TO READ FROM FILE INSIDE HANDLER


exports.getInventoryHandeler = (req, res) => {
  const inventories = ReadInventory();
  res.json(inventories);
};
exports.getSingleWarehouseInventoryHandeler = (req, res) => {
  res.json(GetInventoryByWarehouseId(req.params.warehouseId));
}
exports.getSingleItemHandeler = (req, res) => {
  res.json(GetInventoryById(req.params.inventoryId));
};
exports.postInventoryHandeler = (req, res) => {
  const inventories = ReadInventory();


  let warehouseIdNumber;

  if (req.body.warehouse === "Manhattan")
    warehouseIdNumber = "2922c286-16cd-4d43-ab98-c79f698aeab0";
  if (req.body.warehouse === "King West")
    warehouseIdNumber = "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9";
  if (req.body.warehouse === "Granville")
    warehouseIdNumber = "90ac3319-70d1-4a51-b91d-ba6c2464408c";
  if (req.body.warehouse === "San Fran")
    warehouseIdNumber = "bfc9bea7-66f1-44e9-879b-4d363a888eb4";
  if (req.body.warehouse === "San Monica")
    warehouseIdNumber = "89898957-04ba-4bd0-9f5c-a7aea7447963";
  if (req.body.warehouse === "Seattle")
    warehouseIdNumber = "ade0a47b-cee6-4693-b4cd-a7e6cb25f4b7";
  if (req.body.warehouse === "Montreal")
    warehouseIdNumber = "bb1491eb-30e6-4728-a5fa-72f89feaf622";

    const newPost = {
      id: uuidv4(),
      warehouseID: warehouseIdNumber,
      itemName : req.body.name,
      description: req.body.description,
      category: req.body.category,
      status: req.body.status,
      quantity:req.body.quantity,
      warehouseName: req.body.warehouse

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
    warehouseID: inventory.warehouseID,
    warehouseName: req.body.data.warehouseName || inventory.warehouseName,
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
