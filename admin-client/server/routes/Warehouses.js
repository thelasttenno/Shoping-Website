const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

function ReadWarehouses() {
    const fileContent = fs.readFileSync("./Data/warehouses.json");
    return JSON.parse(fileContent);
}

function ReadInventory() {
    const fileContent = fs.readFileSync("./Data/inventories.json");
    return JSON.parse(fileContent);
}

function WriteWarehouses(warehouses) {
    fs.writeFileSync("./Data/warehouses.json", JSON.stringify(warehouses));
}

function WriteInventory(inventory) {
    fs.writeFileSync("./Data/inventories.json", JSON.stringify(inventory));
}


// Function to get warehouse by any given id:

// Function to get warehouse by any given id:

function GetWarehouseById(warehouseId) {
    const warehouses = ReadWarehouses();
    const warehouseById = warehouses.filter(
        (warehouse) => warehouse.id === warehouseId
    );
    return warehouseById[0];
}
// USE ReadWarehouses() TO READ FROM FILE INSIDE HANDLER

exports.getWarehousesHandeler = (req, res) => {
    const warehouses = ReadWarehouses();
    res.json(warehouses);
};
exports.getSingleWarehouseHandeler = (req, res) => {
    res.json(GetWarehouseById(req.params.warehouseId));
};
exports.postWarehousesHandeler = (req, res) => {
    const warehouses = ReadWarehouses();
    const newObj = req.body;
    warehouses.unshift(newObj);
    fs.writeFileSync("./Data/warehouses.json", JSON.stringify(warehouses));

    res.send(warehouses);
};

// Edit/update warehouse:

exports.putWarehousesHandeler = (req, res) => {
    let warehouses = ReadWarehouses();
    let warehouseId = req.params.warehouseId;
    let currentWarehouse = GetWarehouseById(req.params.warehouseId);
    // preparing updated current warehouse data:
    let updatedWarehouse = {
        id: warehouseId,
        name: req.body.data.name || currentWarehouse.name,
        address: req.body.data.address || currentWarehouse.address,
        city: req.body.data.city || currentWarehouse.city,
        country: req.body.data.country || currentWarehouse.country,
        contact: {
          name: req.body.data.contactName || currentWarehouse.contact.name,
          position: req.body.data.contactPosition || currentWarehouse.contact.position,
          phone: req.body.data.contactPhone || currentWarehouse.contact.phone,
          email: req.body.data.contactEmail || currentWarehouse.contact.email,
        },
      };
      let updatedFullWarehouseData = warehouses.map((warehouse) =>
        warehouse.id === warehouseId ? updatedWarehouse : warehouse
      );
      fs.writeFileSync(
        "./Data/warehouses.json",
        JSON.stringify(updatedFullWarehouseData)
    );
    res.send(updatedFullWarehouseData);
}

exports.deleteWarehousesHandeler = (req, res) => {
    let warehouses = ReadWarehouses();
    let inventoryItems = ReadInventory();
    let warehouseId = req.params.warehouseId;

    const newWarehouses = warehouses.filter((warehouse) => warehouse.id !== warehouseId);
    const newInventory = inventoryItems.filter((inventory) => inventory.warehouseID !== warehouseId)

    WriteWarehouses(newWarehouses);
    WriteInventory(newInventory);

    fs.writeFileSync(
        "./Data/warehouses.json",
        JSON.stringify(updatedFullWarehouseData)
    );
    res.send(updatedFullWarehouseData);
};