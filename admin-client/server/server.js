const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const path = require('path');
const WarehousesRoutes = require('./routes/Warehouses');
const InventoryRoutes = require('./routes/Inventory');

require('dotenv').config();

app.use(express.static("files"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

///////////////////////WarehousesRoute examples///////////////////////////////////////
app.get('/warehouses', WarehousesRoutes.getWarehousesHandeler);
app.post('/warehouses', WarehousesRoutes.postWarehousesHandeler);
app.get('/warehouses/:warehouseId', WarehousesRoutes.getSingleWarehouseHandeler);
app.put('/warehouses/:warehouseId', WarehousesRoutes.putWarehousesHandeler);
app.delete('/warehouses/:warehouseId', WarehousesRoutes.deleteWarehousesHandeler);
//////////////////////InventoryRoutes examples////////////////////////////////////////
app.get('/inventory', InventoryRoutes.getInventoryHandeler);
app.get('/:warehouseId/inventory', InventoryRoutes.getSingleWarehouseInventoryHandeler);
app.get('/:warehouseId/inventory/:inventoryId', InventoryRoutes.getSingleItemHandeler);
app.post('/warehouses/inventory', InventoryRoutes.postInventoryHandeler);
app.put('/warehouses/inventory/:inventoryId', InventoryRoutes.putInventoryHandeler);
app.delete('/inventory/:inventoryId', InventoryRoutes.deleteInventoryHandeler);
app.delete('/:warehouseId/inventory/:inventoryId', InventoryRoutes.deleteInventoryHandeler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});