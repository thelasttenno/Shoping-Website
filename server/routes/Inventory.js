const fs = require("fs");
function LoadInventory() {
  const fileContent = fs.readFileSync("server/Data/inventories.json");
  // const fileContent = fs.readFileSync("Data/inventories.json");

  console.log("inventory loaded to memory!");
  return JSON.parse(fileContent);
}

//Read once, reference multiple. Happy memory :)
let loadedInventory = LoadInventory();

function WriteInventory(inventory) {
  // fs.writeFileSync("server/Data/inventories.json", JSON.stringify(inventory));
  fs.writeFileSync("Data/inventories.json", JSON.stringify(inventory));

  //also update loaded inventory
  loadedInventory = LoadInventory();
}

function GetInventoryById(inventoryId) {
  const inventoryById = loadedInventory.filter(
    (inventory) => inventory.id === inventoryId
  );
  return inventoryById[0];
}

function GetInventoryByorderId(orderId) {
  return loadedInventory.filter((inventory) => inventory.orderID === orderId);
}
// USE LoadedInventory() TO READ FROM FILE INSIDE HANDLER

exports.getInventoryHandeler = (req, res) => {
  res.json(loadedInventory);
};
exports.getSingleorderInventoryHandeler = (req, res) => {
  res.json(GetInventoryByorderId(req.params.orderId));
};
exports.getSingleItemHandeler = (req, res) => {
  res.json(GetInventoryById(req.params.inventoryId));
};
exports.postInventoryHandeler = (request, res) => {
  const payload =JSON.parse(request.body);
  var myValue = payload.collab;
  var isTrueSet = myValue === 'true';
  const newPost = {
    id: payload.id,
    itemName: payload.name,
    description: payload.description,
    category: payload.category,
    status: payload.status,
    quantity: Number(payload.quantity),
    price: Number(payload.price) ,
    collab: isTrueSet,
    ImgaeBase64: {
       mime : "image/jpeg",
       data : payload.data.split("base64,")[1],
    }
  };
  loadedInventory.unshift(newPost);

  // fs.writeFileSync("server/Data/inventories.json", JSON.stringify(loadedInventory))
  fs.writeFileSync("Data/inventories.json", JSON.stringify(loadedInventory));

  res.send(loadedInventory);
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
    quantity:
      req.body.data.status === "Out of Stock"
        ? 0
        : req.body.data.quantity || inventory.quantity,
  };
  let updatedInventoriesData = inventories.map((inventory) =>
    inventory.id === inventoryId ? updatedInventory : inventory
  );
  // fs.writeFileSync("server/Data/inventories.json", JSON.stringify(updatedInventoriesData));
  fs.writeFileSync("Data/inventories.json", JSON.stringify(updatedInventoriesData));
  LoadInventory();
  res.send(updatedInventoriesData);
};

exports.deleteInventoryHandeler = (req, res) => {
  let inventoryItems = loadedInventory;
  let inventoryId = req.params.inventoryId;
  console.log(inventoryId);
  const newInventory = inventoryItems.filter(
    (inventory) => inventory.id !== inventoryId
  );

  WriteInventory(newInventory);
  res.send(updatedFullInventoryData);
};
