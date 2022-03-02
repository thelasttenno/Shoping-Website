import React from "react";
import KaiPic from "../../../assets/photos/Photoshoot/Kai_looking_Good.JPG";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function About() {
  return (
    <section className="About">
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <div className="Aboutimg">
            {/* <img src={KaiPic}  alt="" /> */}
            {/* <img src={KaiPic}  alt="" /> */}
          </div>
          <Item sx={{ paddingY: 6 }}>
            <h2 className="ContentBio__Title">About</h2>
            <h3>Welcome To Skrilla Gang Clothing</h3>
            <p>
              We are a small startup company based in Kelowna, British Columbia.
              We’ve been working really hard on our merchandise, and are stoked
              to share it with everyone! Our website is run by a team of unique,
              talented people, eager to meet your needs and answer any
              questions.
            </p>
          </Item>
        </Container>
      </Box>
    </section>
  );
}
export default About;
