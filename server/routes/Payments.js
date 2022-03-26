const stripe = require("stripe")(
  "sk_test_51IMkDmCVRuCafbBMzwq0EeKVw2tOLZHTmyLIGnMFUIR5knk7ayyZN046wNF2VeZdec3K1NZLPCg4l4GtX2c3M63300jGZGnGR1"
);
const { v4: uuidv4 } = require("uuid");
exports.stripeSesssion = async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
};
// app.post("/create-checkout-session",
exports.stripeSesssionCreate = async (req, res) => {
  //parse query
  // const domainURL = process.env.DOMAIN;
  const domainURL = "http://localhost:3000/";
  // const { quantity } = req.body;
  const quantity  = "10" ;

  let line_items = [];
  if (req.query.shoppingCart) {
    req.query.shoppingCart.forEach((element) => {
      let elem = JSON.parse(element);
      line_items.push({
        price_data: {
          currency: "CAD",
          product_data: {
            name: elem.itemName,
          },
          unit_amount: elem.price * 100,
          tax_behavior: "exclusive",
        },
        // quantity: elem.quantity,
        adjustable_quantity: elem.quantity,
        dynamic_tax_rates: true,
      });
    });
  }
  const session = await stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      automatic_tax: {
        enabled: true,
      },
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "cad",
            },
            display_name: "Free shipping",
            tax_behavior: "exclusive",
            // tax_behavior: 'exclusive',
            // # From https://stripe.com/docs/tax/tax-codes
            // #
            // #   "A shipping charge for delivery by a common carrier."
            // tax_code: "txcd_92010001",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 24,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "cad",
            },
            display_name: "ground shipping",
            tax_behavior: "exclusive",
            // # From https://stripe.com/docs/tax/tax-codes
            // #
            // #   "A shipping charge for delivery by a common carrier."
            // tax_code: "txcd_92010001",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 12,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 2000,
              currency: "cad",
            },
            display_name: "Air shipping",
            tax_behavior: "exclusive",
            // # From https://stripe.com/docs/tax/tax-codes
            // #
            // #   "A shipping charge for delivery by a common carrier."
            // tax_code: "txcd_92010001",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 3000,
              currency: "cad",
            },
            display_name: "Next Day Air shipping",
            tax_behavior: "exclusive",
            // # From https://stripe.com/docs/tax/tax-codes
            // #
            // #   "A shipping charge for delivery by a common carrier."
            // tax_code: "txcd_92010001",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: line_items,
      tax_id_collection: {
        enabled: true,
      },
      // customer_update: {
      //   name: "auto",
      //   shipping: "auto",
      // },
      metadata: {
        order_id: uuidv4(),
      },
      mode: "payment",
      success_url: `${domainURL}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}cancel`,
    })
    .then((session) => {
      res.send(JSON.stringify(session));
    });
};

// exports.stripeSesssionCreate = async (req, res) => {

//   console.log("stripe session create, ", req.body)

//   if(!req.body.line_items){
//     res.status(500)
//     res.send()
//     return
//   }

//   stripe.checkout.sessions.create({
//       success_url: `${siteURL}/success`,
//       cancel_url: `${siteURL}/cancel`,
//       payment_method_types: ['card'],
//       mode: 'payment',
//       //fuck line items, but its mandatory
//       line_items: req.body.line_items,
//     })
//     .then((sess)  => {
//       // console.log(session)
//       res.setHeader('content-type', 'text/plain');
//       res.status(200)
//       res.send(sess.url)
//     })
//     .catch((err) => {
//       console.log("Stripe session error", err)
//       res.setHeader('content-type', 'text/plain');
//       res.status(500)
//       res.send(`{"stripe_session_err":"${err}"}`)
//     })

// };
