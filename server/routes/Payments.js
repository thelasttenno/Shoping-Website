

const stripe = require('stripe')('sk_test_51IMkDmCVRuCafbBMzwq0EeKVw2tOLZHTmyLIGnMFUIR5knk7ayyZN046wNF2VeZdec3K1NZLPCg4l4GtX2c3M63300jGZGnGR1');


const siteURL = "https://localhost:3000"  

exports.stripeSesssionCreate = async (req, res) => {

  console.log("stripe session create, ", req.body)


  if(!req.body.line_items){
    res.status(500)
    res.send()
    return
  }
  

  stripe.checkout.sessions.create({
      success_url: `${siteURL}/success`,
      cancel_url: `${siteURL}/cancel`,
      payment_method_types: ['card'],
      mode: 'payment',
      //fuck line items, but its mandatory
      line_items: req.body.line_items,
    })
    .then((sess)  => {
      // console.log(session)
      res.setHeader('content-type', 'text/plain');
      res.status(200)
      res.send(sess.url)
    })
    .catch((err) => {
      console.log("Stripe session error", err)
      res.setHeader('content-type', 'text/plain');
      res.status(500)
      res.send(`{"stripe_session_err":"${err}"}`)
    })


};

