import React from "react";
import KaiPic from "../../../assets/photos/Photoshoot/Kai_looking_Good.JPG";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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
          <Item sx={{ paddingY: 6 }}>
            <p>
              $krilla-gang is a small start up company based in Kelowna, British
              Columbia. We have fun unique ideas we’ve been working really hard
              on, and are stoked to share it with everyone! Our website is run
              by a team of creative, talented people, eager to meet your needs
              and answer any questions.
            </p>
          </Item>
          <Item sx={{ paddingY: 6 }}>
            <h1> Let's Get Comfortable</h1>
            <p>
              $krilla-gang was founded on February, 20, 2021. $krilla-gang was
              thought up in November, 2020 by Jeremiah Fabas. He had an
              epiphany, and wasn't sure if it would really work out. By
              February,2021 he decided it was time to start moving, and thus
              $krilla-gang was born! Jeremiah quickly gathered together his team
              and was determined to launch his clothing brand. ​ Jeremiah is
              very self motivated, and people oriented, this is exemplified by
              $krilla-gang company. Along with Jeremiah, he has a vast team of
              exceptional, hardworking employees and volunteers, striving for
              their best. $krilla-gang employees are always working on new
              idiosyncratic designs, seeking their best, and trying to Motivate
              The Population!
            </p>
          </Item>
        </Container>
      </Box>
    </section>
  );
}
export default About;
