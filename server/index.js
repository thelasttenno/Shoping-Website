const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const ordersRoutes = require("./routes/Orders");
const InventoryRoutes = require("./routes/Inventory");
const PaymentsRoutes = require("./routes/Payments");
const SessionRoutes = require("./routes/Session");
const session = require("./lib/session");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const isDev = process.env.NODE_ENV !== "production";

const PORT = process.env.PORT || 5000;

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
// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();
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
  app.get(
    "/:orderId/inventory",
    InventoryRoutes.getSingleorderInventoryHandeler
  );
  app.get(
    "/:orderId/inventory/:inventoryId",
    InventoryRoutes.getSingleItemHandeler
  );
  app.post("/orders/inventory", InventoryRoutes.postInventoryHandeler);
  app.put(
    "/orders/inventory/:inventoryId",
    InventoryRoutes.putInventoryHandeler
  );
  app.delete(
    "/inventory/:inventoryId",
    InventoryRoutes.deleteInventoryHandeler
  );
  app.delete(
    "/:orderId/inventory/:inventoryId",
    InventoryRoutes.deleteInventoryHandeler
  );

  // ##### PaymentRoutes

  app.post("/payments/createSession", PaymentsRoutes.stripeSesssionCreate);
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
  app.use(express.static(path.resolve(__dirname, "../react-ui/build")));
  app.post("/session/event", sessionEventWrapper);
  //  Tracks the users activity and appends it to the navigation-graph for data science later <3,
  //  call on every click, link, tab, or anything functional for maximum data farming capabilites >:)
  app.post("/session/new", createSessionWrapper);
  app.post("/session/validate", validateSessionWrapper);

  // Server

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      path.resolve(__dirname, "../react-ui/build", "index.html")
    );
  });

  app.listen(PORT, function () {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
