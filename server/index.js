const express = require("express");
const app = express();
const cors = require("cors");
const { resolve } = require('path');
const ordersRoutes = require("./routes/Orders");
const InventoryRoutes = require("./routes/Inventory");
const PaymentsRoutes = require("./routes/Payments");
const SessionRoutes = require("./routes/Session");
const session = require("./lib/session");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
require('dotenv').config({ path: './.env' });
const isDev = process.env.NODE_ENV !== "production";
// See your keys here: https://dashboard.stripe.com/apikeys

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-02-04',
  appInfo: { // For sample support and debugging, not required for production:
    name: "SkrillaGang",
    version: "0.0.1",
    url: ""
  }
});
checkEnv();
const PORT = process.env.DOMAIN || 4242;

//cache
var levelup = require("levelup");
var leveldown = require("leveldown");

const fs = require("fs");
// app.use(express.static("files"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(process.env.STATIC_DIR));
console.log([process.env.DOMAIN]);

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use(cors());
// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');
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
      var multiparty = require("multiparty");
      var form = new multiparty.Form();
      console.log(req.files[0]);
      console.log(req.files[1]);
      console.log(req.files[2]);
      const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }
      console.log(obj);

      form.parse(req, function (err, fields, files) {
        console.log(fields);
        console.log(files);
        console.log(req.files);
        var imgArray = req.files;

        for (var i = 0; i < imgArray.length; i++) {
          var singleImg = imgArray[i];
          var newPath = "./uploads/" + obj.id + "/";
          if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
          }
          newPath += "img" + i + ".png";
          readAndWriteFile(singleImg, newPath);
        }
        res.send("File uploaded to: " + newPath);
      });

      function readAndWriteFile(singleImg, newPath) {
        fs.readFile(singleImg.path, function (err, data) {
          fs.writeFile(newPath, data, function (err) {
            if (err) console.log("ERRRRRR!! :" + err);
            console.log("Fitxer: " + singleImg.originalname + " - " + newPath);
          });
        });
      }
      // console.log(obj);
      // const tempPath = req.files[0].path;
      // const targetPath = path.join(
      //   __dirname,
      //   //NEED TO MAKE IT SAVE IN PROPER FOLDER
      //   `./upload/${req.files[0].originalname}`
      // );

      // if (path.extname(req.files[0].originalname).toLowerCase() === ".png") {
      //   fs.rename(tempPath, targetPath, (err) => {
      //     if (err) return handleError(err, res);

      //     res.status(200).contentType("text/plain").end("File uploaded!");
      //   });
      // } else {
      //   fs.unlink(tempPath, (err) => {
      //     if (err) return handleError(err, res);

      //     res
      //       .status(403)
      //       .contentType("text/plain")
      //       .end("Only .png files are allowed!");
      //   });
      // }
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
  app.post("/inventory", InventoryRoutes.postInventoryHandeler);
  app.get(
    "/:orderId/inventory",
    InventoryRoutes.getSingleorderInventoryHandeler
  );
  app.get(
    "/:orderId/inventory/:inventoryId",
    InventoryRoutes.getSingleItemHandeler
  );
  app.post("/inventory", InventoryRoutes.postInventoryHandeler);
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

  ///////////////////////productsRoute examples///////////////////////////////////////
  app.get('/config', async (req, res) => {
    const price = await stripe.prices.retrieve(process.env.PRICE);
  
    res.send({
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
      unitAmount: price.unit_amount,
      currency: price.currency,
    });
  });

  // ##### PaymentRoutes
app.get('/checkout-session', PaymentsRoutes.stripeSesssion);
  app.post("/payments/createSession", PaymentsRoutes.stripeSesssionCreate);
  // app.post("/payments/process", PaymentsR)

  //////////////////////SessionRoutes endpoints////////////////////////////////////////

  // Cache injection

  //cache needs to be initialized top-level here in server.js to ensure it stays persistent as the server runs
  // Create store
  var cache = levelup(leveldown("./sessionDb"));
  //Analytics worker
  setInterval(() => session.analyticsWorker(cache), 4242); //Runs once every 30 mins

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
  // app.use(express.static(path.resolve(__dirname, "../react-ui/build")));
  app.post("/session/event", sessionEventWrapper);
  //  Tracks the users activity and appends it to the navigation-graph for data science later <3,
  //  call on every click, link, tab, or anything functional for maximum data farming capabilites >:)
  app.post("/session/new", createSessionWrapper);
  app.post("/session/validate", validateSessionWrapper);
  // This is your Stripe CLI webhook secret for testing your endpoint locally.

  //////Stripe Functions//////
  const fulfillOrder = async (session) => {
    // TODO: fill me in
    console.log("Fulfilling order", session);
    const selectedShippingRate = await stripe.shippingRates.retrieve(session.shipping_rate);
    const amountShipping = session.total_details.amount_shipping;
    // Saving a copy of the order in your own database.
    // Sending the customer a receipt email.
    // Reconciling the line items and quantity purchased by the customer if using line_item.adjustable_quantity.
    // TODO: Remove error and implement...
    throw new Error(`
      Given the Checkout Session ${session.id}, load your internal order from the database then implement your own fulfillment logic.`
    );
  };
  const createOrder = (session) => {
    // TODO: fill me in
    console.log("Creating order", session);
  };

  const emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
  };
  ///////////////////////////////
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (request, response) => {
      let data;
      let eventType;
      // Check if webhook signing is configured.
      if (process.env.STRIPE_WEBHOOK_SECRET) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        const sig = request.headers["stripe-signature"];
        const payload = request.body;
        try {
          event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
          );
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed.`);
          return res.sendStatus(400);
        }
        // Extract the object from the event.
        data = event.data;
        eventType = event.type;
      } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
      }

      // Handle the event
      switch (eventType) {
        case "checkout.session.completed": {
          const session = data.object;
          // Save an order in your database, marked as 'awaiting payment'
          createOrder(session);

          // Check if the order is paid (for example, from a card payment)
          //
          // A delayed notification payment will have an `unpaid` status, as
          // you're still waiting for funds to be transferred from the customer's
          // account.
          if (session.payment_status === "paid") {
            fulfillOrder(session);
          }

          break;
        }

        case "checkout.session.async_payment_succeeded": {
          const session = data.object;

          // Fulfill the purchase...
          fulfillOrder(session);

          break;
        }

        case "checkout.session.async_payment_failed": {
          const session = data.object;

          // Send an email to the customer asking them to retry their order
          emailCustomerAboutFailedPayment(session);

          break;
        }
        default:
          console.log(`Unhandled event type ${eventType}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );

  // Server

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function (request, response) {
    response.sendFile(
      resolve(__dirname, "../react-ui/build", "index.html")
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

function checkEnv() {
  const price = process.env.PRICE;
  console.log(`PRICE: ${price}`);
  if(price === "price_12345" || !price) {
    console.log("You must set a Price ID in the environment variables. Please see the README.");
    // process.exit(0);
  }
}
