const express = require("express");
const app = express();
const cors = require("cors");
const { resolve } = require("path");
const ordersRoutes = require("./routes/Orders");
const InventoryRoutes = require("./routes/Inventory");
const PaymentsRoutes = require("./routes/Payments");
const SessionRoutes = require("./routes/Session");
const session = require("./lib/session");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
require("dotenv").config({ path: "./.env" });
const isDev = process.env.NODE_ENV !== "production";
// See your keys here: https://dashboard.stripe.com/apikeys
const basicAuth = require('express-basic-auth');
const auth =(basicAuth({ authorizer: myAuthorizer, unauthorizedResponse: getUnauthorizedResponse } ))
const cookieParser = require('cookie-parser');
const UIDGenerator = require('uid-generator');
const bcrypt = require("bcrypt");

app.use(cookieParser("TennoGen"));

user = {
  _id: "19234",
  Name:"admin",
  PasswordHashed:"",
  isAdmin:"true"
}




const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-02-04",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "SkrillaGang",
    version: "0.0.1",
    url: "",
  },
});
checkEnv();
const PORT = process.env.DOMAIN || 4242;

//cache
var levelup = require("levelup");
var leveldown = require("leveldown");

const fs = require("fs");
// app.use(express.static("files"));
// app.use(express.static(path.join(__dirname, "public")));
// parse application/x-www-form-urlencoded

app.use(express.static(process.env.STATIC_DIR));
console.log([process.env.DOMAIN]);
app.use(
  express.json(
    {
      // We need the raw body to verify webhook signatures.
      // Let's compute it only when hitting the Stripe webhook endpoint.
      verify: function (req, res, buf) {
        if (req.originalUrl.startsWith("/webhook")) {
          req.rawBody = buf.toString();
        } else if (req.originalUrl.startsWith("/inventory")) {
          req.rawBody = buf.toString();
        } else if (req.originalUrl.startsWith("/payments")) {
          req.rawBody = buf.toString();
        }
      },
    },
    { limit: "200mb", extended: true, parameterLimit: 200000 }
  )
);
app.use(
  express.urlencoded({ limit: "200mb", extended: true, parameterLimit: 200000 })
);
// app.use(express.raw({ type: '*/*', limit: "20mb" }));
// app.use(express.raw());

app.use(cors());
// var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

//////////////////////////////////////////////////////////////////////////////////
  ///Auth Function//
  async function myAuthorizer(username, password) {
    // console.log(username);
    // console.log(password);
    // await findOne(username)
    // console.log(user);

    const userMatches = basicAuth.safeCompare(
      username,
      "customuser" || "admin"
    );
    const passwordMatches = basicAuth.safeCompare(
      password,
      "custompassword" || "adminpassword"
    );
    return userMatches & passwordMatches;
    // const hashedPassword = await hashIt(password);
    // const hashedCheck = await compareIt(password, hashedPassword);

    // & hashedCheck
  }

  ///Password Hashing/////
  const { TIMEOUT } = require("dns");
  async function hashIt(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
  }
  // compare the password user entered with hashed pass.
  async function compareIt(password, hashedPassword) {
    console.log(password);
    console.log(hashedPassword);
    const validPassword = await bcrypt.compare(password, hashedPassword);
  }

  ///Autherizer options/////
  function getUnauthorizedResponse(req) {
    return req.auth
      ? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
      : "No credentials provided";
  }
const { randomInt } = require("crypto");

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

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
  //////////////////////authentacation///////////////////////////////////////////////\

  app.use("/authenticate", auth, (req, res) => {
    const options = {
      httpOnly: true,
      signed: true,
      maxAge: 7200000, // 2 hours
    };
    let token = new UIDGenerator(user._id);
    res.cookie("token", token, options).send({
      _id: user._id,
      name: user.Name,
      isAdmin: user.isAdmin,
      token: token,
    });
  });
  app.get("/read-cookie", (req, res) => {
    console.log(req.signedCookies.token);
    let token = new UIDGenerator(user._id);
    console.log(token);
    if (req.signedCookies.token !== undefined) {
      res.send({ token: token });
    } else {
      res.send({ token: undefined });
    }
  });

  app.get("/clear-cookie", (req, res) => {
    res.clearCookie("token").end();
  });

  ///////////////////////ordersRoute examples///////////////////////////////////////
  // if(not logged in ){fuck off}else {

  // }
  app.get("/orders", ordersRoutes.getordersHandeler);
  app.get("/orders/:orderId", ordersRoutes.getSingleorderHandeler);

  //////////////////////InventoryRoutes examples////////////////////////////////////////
  app.get("/inventory", InventoryRoutes.getInventoryHandeler);
  app.get("/inventory/:inventoryId", InventoryRoutes.getSingleItemHandeler);

  app.put("/orders/:orderId", ordersRoutes.putordersHandeler);
  app.delete("/orders/:orderId", ordersRoutes.deleteordersHandeler);
  app.post(
    "/inventory",
    express.raw({ type: "application/json", limit: "200mb" }),
    InventoryRoutes.postInventoryHandeler
  );
  app.put("/inventory/:inventoryId", InventoryRoutes.putInventoryHandeler);
  app.delete(
    "/inventory/:inventoryId",
    InventoryRoutes.deleteInventoryHandeler
  );
  // app.get(
  //   "/:orderId/inventory",
  //   InventoryRoutes.getSingleorderInventoryHandeler
  // );

  // app.put(
  //   "/orders/inventory/:inventoryId",
  //   InventoryRoutes.putInventoryHandeler
  // );

  // app.delete(
  //   "/:orderId/inventory/:inventoryId",
  //   InventoryRoutes.deleteInventoryHandeler
  // );

  ///////////////////////productsRoute examples///////////////////////////////////////
  app.get("/config", async (req, res) => {
    const price = await stripe.prices.retrieve(process.env.PRICE);

    res.send({
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
      unitAmount: price.unit_amount,
      currency: price.currency,
    });
  });

  // ##### PaymentRoutes
  app.get("/checkout-session", PaymentsRoutes.stripeSesssion);
  app.post(
    "/payments/createSession",
    express.raw({ type: "application/json", limit: "200mb" }),
    PaymentsRoutes.stripeSesssionCreate
  );
  // app.post("/payments/process", PaymentsR)

  // This is your Stripe CLI webhook secret for testing your endpoint locally.

  //////Stripe Functions//////

  const fulfillOrder = async (session) => {
    // TODO: fill me in
    // console.log("Fulfilling order", session);
    // const selectedShippingRate = await stripe.shippingRates.retrieve(
    //   session.shipping_rate
    // );
    // const amountShipping = session.total_details.amount_shipping;

    //////Update Order//////
    function Readorders() {
      const fileContent = fs.readFileSync("server/Data/orders.json");
      // const fileContent = fs.readFileSync("Data/orders.json");
      return JSON.parse(fileContent);
    }
    const orders = Readorders();

    async function GetorderById(orderId) {
      const orderById = await orders.filter((order) => order.id === orderId);
      return orderById[0];
    }
    let orderId = session.id;
    let currentorder = await GetorderById(orderId);
    console.log("current order", currentorder);
    let amount_total = 0;

    // currentorder.lineItems.forEach((item) => {
    //   console.log("item", item);
    // });

    // currentorder.lineItems.forEach((item) => {
    //   console.log("item", item);
    //   let inventoryId = item.inventory_item.id;
    //   let inventoryItem = InventoryRoutes.getInventoryItemById(inventoryId);
    //   console.log("inventoryItem", inventoryItem);
    //   let inventoryItemQuantity = inventoryItem.quantity;
    //   let inventoryItemQuantityUpdated = inventoryItemQuantity - item.quantity;
    //   console.log("inventoryItemQuantityUpdated", inventoryItemQuantityUpdated);
    //   InventoryRoutes.updateInventoryItemQuantity(inventoryId, inventoryItemQuantityUpdated);
    // }
    // preparing updated current order data:
    let updatedorder = {
      id: orderId,
      dateOrdered: currentorder.dateOrdered,
      dateFulfilled: new Date(),
      status: "fulfilled",
      // lineItems: currentorder.lineItems,
      customer_details: {
        email: currentorder.customer_details.email,
        phone: currentorder.customer_details.phone,
        tax_exempt: currentorder.customer_details.tax_exempt,
        tax_ids: currentorder.customer_details.tax_ids,
      },
      customer_email: currentorder.customer_email,
      session: currentorder.session,
      fulfilledOrderSession: session,
    };
    let updatedFullorderData = orders.map((order) =>
      order.id === orderId ? updatedorder : order
    );
    fs.writeFileSync(
      "server/Data/orders.json",
      JSON.stringify(updatedFullorderData)
    );
    // fs.writeFileSync("Data/orders.json", JSON.stringify(updatedFullorderData));

    // Saving a copy of the order in your own database.
    // Sending the customer a receipt email.
    // Reconciling the line items and quantity purchased by the customer if using line_item.adjustable_quantity.
    // TODO: Remove error and implement...
    //   throw new Error(`
    //     Given the Checkout Session ${session.id}, load your internal order from the database then implement your own fulfillment logic.`);
  };

  const createOrder = async (session) => {
    //////Create Order//////
    const Stripe = require("stripe");
    const stripe = Stripe(
      "sk_test_51IMkDmCVRuCafbBMzwq0EeKVw2tOLZHTmyLIGnMFUIR5knk7ayyZN046wNF2VeZdec3K1NZLPCg4l4GtX2c3M63300jGZGnGR1"
    );
    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 100 },
      function (err, lineItems) {
        return lineItems || err;
      }
    );
    function Readorders() {
      const fileContent = fs.readFileSync("server/Data/orders.json");
      // const fileContent = fs.readFileSync("Data/orders.json");
      return JSON.parse(fileContent);
    }
    const orders = Readorders();
    console.log("lineItems", await lineItems);
    const newOrder = {
      id: session.id,
      dateOrdered: new Date(),
      status: "un-fulfilled",
      lineItems: await lineItems,
      customer_details: {
        email: session.customer_details.email,
        phone: session.customer_details.phone,
        tax_exempt: session.customer_details.tax_exempt,
        tax_ids: session.customer_details.tax_ids,
      },
      customer_email: null,
      session: session,
    };
    orders.unshift(newOrder);
    fs.writeFileSync("server/Data/orders.json", JSON.stringify(orders));
  };

  const emailCustomerAboutFailedPayment = (session) => {
    // TODO: fill me in
    console.log("Emailing customer", session);
  };
  ///////////////////////////////
  app.post(
    "/webhookstripe",
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
        data = request.body.data;
        eventType = request.body.type;
      }

      // Handle the event
      switch (eventType) {
        // case "checkout.session.completed": {
        //   // console.log(data);
        //   const session = data.object;
        //   // Save an order in your database, marked as 'awaiting payment'
        //   createOrder(session);

        //   // Check if the order is paid (for example, from a card payment)
        //   //
        //   // A delayed notification payment will have an `unpaid` status, as
        //   // you're still waiting for funds to be transferred from the customer's
        //   // account.
        //   if (session.payment_status === "paid") {
        //     fulfillOrder(session);
        //   }

        //   break;
        // }

        case "checkout.session.async_payment_succeeded": {
          const session = data.object;
          createOrder(session);

          // Fulfill the purchase...
          if (session.payment_status === "paid") {
            fulfillOrder(session);
          }

          break;
        }

        case "checkout.session.async_payment_failed": {
          const session = data.object;

          // Send an email to the customer asking them to retry their order
          emailCustomerAboutFailedPayment(session);

          break;
        }
        case "payment_intent.created": {
          const session = data.object;
          createOrder(session);
          break;
        }
        case "payment_intent.succeeded": {
          const session = data.object;
          fulfillOrder(session);
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
    response.sendFile(resolve(__dirname, "../react-ui/build", "index.html"));
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
  if (price === "price_12345" || !price) {
    console.log(
      "You must set a Price ID in the environment variables. Please see the README."
    );
    // process.exit(0);
  }
}
