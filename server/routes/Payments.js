

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const siteURL = "https://localhost:3000"

exports.stripeSesssionCreate = async (req, res, cache) => {

    const session = await stripe.checkout.sessions.create({
        success_url: `${siteURL}/success`,
        cancel_url: `${siteURL}/cancel`,
        payment_method_types: ['card'],
        line_items: [
          {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
        ],
        mode: 'payment',
      });

    
};

