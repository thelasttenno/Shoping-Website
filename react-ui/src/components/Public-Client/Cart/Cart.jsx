import React, { Component } from "react";
import SingleCartItem from "../SingleCartItem/SingleCartItem";
import { Link } from "react-router-dom";
import "./Cart.scss";
import axios from "axios";
//////////////////////
// class Cart extends Component {
//   constructor(props) {
//     super(props);
//     this.checkoutUrl = "";
//     this.buyList = BuyList;
//   }

//   //WIP. for reference
//   //
//   // stripe session create endpoint expects an array of items
//   //
//   // line_items: [
//   //   {
//   //     "price_data": {
//   //         "currency": "cad",
//   //         "product_data": {
//   //             "name": "tshirt",
//   //             "images": [
//   //                 "https://i.imgur.com/EHyR2nP.png"
//   //             ],
//   //             "description": "hello there"
//   //         },
//   //         "unit_amount": 5099
//   //     },
//   //     "quantity": 2
//   // }
//   // ],

//   async getStripeCheckoutUrl(callback) {
//     let line_items = [];

//     //Parse each item to line_items
//     for (const item in this.buyList) {
//       //item
//       let line_item = {
//         price_data: {
//           currency: "cad",
//           product_data: {
//             name: `${item.itemName}`,
//             images: ["https://i.imgur.com/EHyR2nP.png"], //Will need to point to the item image, can be disabled i think
//             description: item.description,
//           },
//           unit_amount: 4242, // this needs tuning, do reading lel
//         },
//         quantity: 1,
//       };

//       //push to array
//       line_items.push(line_item);
//     }
//     console.log(line_items);

//     axios
//       .post("/payments/createSession", {
//         line_items: line_items,
//       })
//       .then((response) => {
//         // handle success
//         callback(response.data, null);
//       })
//       .catch((err) => {
//         // handle error
//         callback(null, err);
//       });
//   }

//    render() {

//     return (
//       <section className="Cart">
//         <div className="Cart__head"></div>
//         <div className="Cart__header">
//           <h2 className="Cart__title">Cart</h2>
//         </div>
//         <div>
//           {BuyList &&
//             BuyList.map((item) => {
//               console.log(item);
//               return (
//                 <div className="cartBorder">
//                   <div className="cart" key={item.id}>
//                     <SingleCartItem {...this.props} inventory={item} />
//                   </div>
//                 </div>
//               );
//             })}

//           <Link
//             to={async () => {
//               let checkouturl = ""
//               await this.getStripeCheckoutUrl((url, err)=>{
//                 if(err){
//                   checkouturl =  ""
//                 }else{
//                   checkouturl =  url
//                 }
//               });
//               return checkouturl
//             }}
//             className=""
//           >
//             CHECKOUT
//           </Link>
//         </div>
//       </section>
//     );
//   }
// }
// export default Cart;
export default function Cart(props) {
  //WIP. for reference
  //
  // stripe session create endpoint expects an array of items
  //
  // line_items: [
  //   {
  //     "price_data": {
  //         "currency": "cad",
  //         "product_data": {
  //             "name": "tshirt",
  //             "images": [
  //                 "https://i.imgur.com/EHyR2nP.png"
  //             ],
  //             "description": "hello there"
  //         },
  //         "unit_amount": 5099
  //     },
  //     "quantity": 2
  // }
  // ],

  // async getStripeCheckoutUrl(callback) {
  //   let line_items = [];

  //   //Parse each item to line_items
  //   for (const item in this.buyList) {
  //     //item
  //     let line_item = {
  //       price_data: {
  //         currency: "cad",
  //         product_data: {
  //           name: `${item.itemName}`,
  //           images: ["https://i.imgur.com/EHyR2nP.png"], //Will need to point to the item image, can be disabled i think
  //           description: item.description,
  //         },
  //         unit_amount: 4242, // this needs tuning, do reading lel
  //       },
  //       quantity: 1,
  //     };

  //     //push to array
  //     line_items.push(line_item);
  //   }
  //   console.log(line_items);

  //   axios
  //     .post("/payments/createSession", {
  //       line_items: line_items,
  //     })
  //     .then((response) => {
  //       // handle success
  //       callback(response.data, null);
  //     })
  //     .catch((err) => {
  //       // handle error
  //       callback(null, err);
  //     });
  // }

  const createStripeCheckoutSession = (cart) => {
    // axios
    //   .post("http://localhost:4242/payments/createSession", {
    //     firstName: "Fred",
    //     lastName: "Flintstone",
    //   })
    //   .then((response) => {
    //     // handle success
    //     console.log(response);
    //     console.log(response.data.url);
    //   })
    //   .catch((err) => {
    //     // handle error
    //     console.log(err);
    //   });
    //Configure cart to be sent to server
    if (cart.length !== 0) {
      axios({
        method: "post",
        url: "http://localhost:4242/payments/createSession",
        headers: {
          // "Content-Type": "application/json; charset=UTF-8",
        },
        params: { shoppingCart: cart },
      })
        .then((response) => {
          // handle success
          console.log(response);
          console.log(response.data.url);
          if (response.data.url) {
            window.location.assign(response.data.url);
          }
        })
        .catch((err) => {
          // handle error
          console.log(err);
        });
    } else {
      console.log("EMPTY CART");
    }
  };

  return (
    <section className="Cart">
      <div className="Cart__head"></div>
      <div className="Cart__header">
        <h2 className="Cart__title">Cart</h2>
      </div>
      <div>
        {props.shoppingCart &&
          props.shoppingCart.map((item) => (
            <div className="cartBorder">
              <div className="cart" key={item.id}>
                <SingleCartItem {...props} item={item} />
              </div>
            </div>
          ))}
        <div
          style={{
            visibility: props.shoppingCart.length !== 0 ? undefined : "hidden",
          }}
        >
          <button
            onClick={() => {
              createStripeCheckoutSession(props.shoppingCart);
            }}
            className=""
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </section>
  );
}
