const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const path = require("path");
const ordersRoutes = require("./routes/Orders");
const InventoryRoutes = require("./routes/Inventory");
const PaymentsRoutes = require("./routes/Payments")
const SessionRoutes = require("./routes/Session");
const session = require("./lib/session");

//cache
var levelup = require("levelup");
var leveldown = require("leveldown");

const fs = require("fs");
require("dotenv").config();

app.use(express.static("files"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
//////////////////////////////////////////////////////////////////////////////////
const multer = require("multer");
const { randomInt } = require("crypto");

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "uploads/",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

app.post(
  "/upload/pics",
  upload.any(/* name attribute of <file> element in your form */),
  (req, res) => {
    console.log(req.files[0]);

    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }

    console.log(obj);
      const tempPath = req.files[0].path;
      const targetPath = path.join(
        __dirname,
        //NEED TO MAKE IT SAVE IN PROPER FOLDER
        `./upload/${req.files[0].originalname}.png`
      );
  
      if (path.extname(req.files[0].originalname).toLowerCase() === ".png") {
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

// ##### PaymentRoutes

app.post("/payments/createSession", PaymentsRoutes.stripeSesssionCreate)
// app.post("/payments/process", PaymentsR)

//////////////////////SessionRoutes endpoints////////////////////////////////////////

// Cache injection

//cache needs to be initialized top-level here in server.js to ensure it stays persistent as the server runs
// Create store
var cache = levelup(leveldown("./sessionDb"));
//Analytics worker
setInterval(() => session.analyticsWorker(cache), 5000); //Runs once every 30 mins

// To pass it to the route handlers, I'll need to wrap them to accept three parameters including cache.
const sessionEventWrapper = (req, res) => {
  SessionRoutes.sessionEventHandler(req, res, cache);
};
const createSessionWrapper = (req, res) => {
  SessionRoutes.createSessionHandler(req, res, cache);
};
const validateSessionWrapper = (req, res) => {
  SessionRoutes.validateSessionHandler(req, res, cache);
};

// Endpoints

app.post("/session/event", sessionEventWrapper);
//  Tracks the users activity and appends it to the navigation-graph for data science later <3,
//  call on every click, link, tab, or anything functional for maximum data farming capabilites >:)
app.post("/session/new", createSessionWrapper);
app.post("/session/validate", validateSessionWrapper);

// Server

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
