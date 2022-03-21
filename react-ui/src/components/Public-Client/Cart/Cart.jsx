import React, { useEffect } from "react";
import SingleCartItem from "../SingleCartItem/SingleCartItem";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useWillMount } from "../../../lib/useWillMount";
import { Link } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Cart(props) {
  let totalPrice = () =>
    props.shoppingCart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

  const createStripeCheckoutSession = (cart) => {
    if (cart.length !== 0) {
      cart.forEach((item) => {
        delete item.ImgaeBase64;
      });
      axios({
        method: "post",
        // url: "http://localhost:4242/payments/createSession",
        url: "/payments/createSession",
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
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <h2 className="Cart__title">Cart</h2>
          {props.shoppingCart &&
            props.shoppingCart.map((item) => (
              <Container>
                <Item key={item.id}>
                  <SingleCartItem {...props} item={item} />
                </Item>
              </Container>
            ))}
        </Container>
      </Box>
      <Box
        item
        xs={"auto"}
        sx={{
          visibility: props.shoppingCart.length !== 0 ? undefined : "hidden",
          marginY: 6,
          justifyContent: "right",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Item>
            <Container
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Container
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p>SubTotal {totalPrice()}</p>
              </Container>

              <Button
                onClick={() => {
                  createStripeCheckoutSession(props.shoppingCart);
                }}
                className=""
                sx={{
                  my: 2,
                  px: 3,
                  color: "Black",
                  backgroundColor: "Orange",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                CHECKOUT
              </Button>
            </Container>
          </Item>
        </Container>
      </Box>
      <Box
        item
        xs={"auto"}
        sx={{
          visibility: props.shoppingCart.length === 0 ? undefined : "hidden",
          marginY: 6,
          justifyContent: "right",
        }}
      >
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Item>
            <p>Looks Like You Need To Add Some Items To Your Cart!</p>
            <p>Let Me Help!</p>
            <Button
              key={"Shop"}
              sx={{
                my: 2,
                color: "Black",
                display: "block",
                backgroundColor: "Orange",
              }}
              component={Link}
              to="/shop"
            >
              Shop
            </Button>
          </Item>
        </Container>
      </Box>
    </section>
  );
}
