const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const path = require('path');
const ordersRoutes = require('./routes/orders');
const InventoryRoutes = require('./routes/Inventory');

require('dotenv').config();

app.use(express.static("files"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

///////////////////////ordersRoute examples///////////////////////////////////////
app.get('/orders', ordersRoutes.getordersHandeler);
app.post('/orders', ordersRoutes.postordersHandeler);
app.get('/orders/:orderId', ordersRoutes.getSingleorderHandeler);
app.put('/orders/:orderId', ordersRoutes.putordersHandeler);
app.delete('/orders/:orderId', ordersRoutes.deleteordersHandeler);
//////////////////////InventoryRoutes examples////////////////////////////////////////
app.get('/inventory', InventoryRoutes.getInventoryHandeler);
app.get('/:orderId/inventory', InventoryRoutes.getSingleorderInventoryHandeler);
app.get('/:orderId/inventory/:inventoryId', InventoryRoutes.getSingleItemHandeler);
app.post('/orders/inventory', InventoryRoutes.postInventoryHandeler);
app.put('/orders/inventory/:inventoryId', InventoryRoutes.putInventoryHandeler);
app.delete('/inventory/:inventoryId', InventoryRoutes.deleteInventoryHandeler);
app.delete('/:orderId/inventory/:inventoryId', InventoryRoutes.deleteInventoryHandeler);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});