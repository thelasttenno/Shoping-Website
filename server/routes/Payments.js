const stripe = require("stripe")(
  "sk_test_51IMkDmCVRuCafbBMzwq0EeKVw2tOLZHTmyLIGnMFUIR5knk7ayyZN046wNF2VeZdec3K1NZLPCg4l4GtX2c3M63300jGZGnGR1"
);

const siteURL = "http://localhost:3000";

// app.post("/create-checkout-session",
exports.stripeSesssionCreate = (req, res) => {
  //parse query
  let line_items = [];
  if (req.query.shoppingCart) {
    req.query.shoppingCart.forEach((element) => {
      let elem = JSON.parse(element);
      console.log(elem);

      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: elem.itemName,
          },
          unit_amount: elem.price * 100,
        },
        quantity: 1,
      });
    });
  }

  stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      line_items: line_items,
      // [
      //   {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: "T-shirt",
      //       },
      //       unit_amount: 2000,
      //     },
      //     quantity: 1,
      //   },
      //   {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: "T-shirt",
      //       },
      //       unit_amount: 2000,
      //     },
      //     quantity: 1,
      //   },
      // ],
      mode: "payment",
      success_url: `${siteURL}/success`,
      cancel_url: `${siteURL}/cancel`,
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
