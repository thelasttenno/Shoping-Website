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

export default function Success(props) {
console.log(props);
  return (
    <section className="Success">
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
            <h2>Oh No!</h2>
            <p>Your Order was Canceled!</p>
            <p>We hope you are back soon!</p>
        </Container>
      </Box>
    </section>
  );
}
