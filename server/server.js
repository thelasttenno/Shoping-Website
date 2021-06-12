const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const path = require("path");
const ordersRoutes = require("./routes/orders");
const InventoryRoutes = require("./routes/Inventory");
const SessionRoutes = require("./routes/Session");

const fs = require("fs");
require("dotenv").config();

app.use(express.static("files"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
//////////////////////////////////////////////////////////////////////////////////
const multer = require("multer");

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "uploads/",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    console.log(req.params);
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `./uploads/${req.body.name}.png`);

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);

        res.status(200).contentType("text/plain").end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, (err) => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);
app.get("/image.png", (req, res) => {
  res.sendFile(path.join(__dirname, "./uploads/image.png"));
});
///////////////////////ordersRoute examples///////////////////////////////////////
app.get("/orders", ordersRoutes.getordersHandeler);
app.post("/orders", ordersRoutes.postordersHandeler);
app.get("/orders/:orderId", ordersRoutes.getSingleorderHandeler);
app.put("/orders/:orderId", ordersRoutes.putordersHandeler);
app.delete("/orders/:orderId", ordersRoutes.deleteordersHandeler);
//////////////////////InventoryRoutes examples////////////////////////////////////////
app.get("/inventory", InventoryRoutes.getInventoryHandeler);
app.get("/:orderId/inventory", InventoryRoutes.getSingleorderInventoryHandeler);
app.get(
  "/:orderId/inventory/:inventoryId",
  InventoryRoutes.getSingleItemHandeler
);
app.post("/orders/inventory", InventoryRoutes.postInventoryHandeler);
app.put("/orders/inventory/:inventoryId", InventoryRoutes.putInventoryHandeler);
app.delete("/inventory/:inventoryId", InventoryRoutes.deleteInventoryHandeler);
app.delete(
  "/:orderId/inventory/:inventoryId",
  InventoryRoutes.deleteInventoryHandeler
);

//////////////////////SessionRoutes endpoints////////////////////////////////////////

app.get('/session/event', SessionRoutes.sessionEventHandler) 
//  Tracks the users activity and appends it to the navigation-graph for data science later <3, 
//  call on every click, link, tab, or anything functional for maximum data farming capabilites >:) 

app.post('/session/new', SessionRoutes.createSessionHandler)
app.post('/session/validate/:sessionId', SessionRoutes.validateSessionHandler)
app.post('/session/refresh', SessionRoutes.refreshSessionHandler)
app.delete('/session/end', SessionRoutes.endSessionHandler)

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
