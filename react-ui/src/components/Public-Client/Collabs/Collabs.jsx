import React from "react";
import { Link } from "react-router-dom";
import KaiPic from "../../../assets/photos/Photoshoot/Kai_looking_Good.JPG";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Collabs() {
  return (
    <section className="Collabs">
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <Item sx={{ paddingY: 6 }}>
            <h2 className="CollabInfo__Title">Contact</h2>
            <p className="CollabInfo__Info">
              {" "}
              Feel free to email us and we will help in any way we can! You can
              also contact us directly through our @$krilla__gang on Instagram.
            </p>
          </Item>
        </Container>
      </Box>
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <div className="Aboutimg">
            {/* <img src={KaiPic}  alt="" /> */}
            {/* <img src={KaiPic}  alt="" /> */}
          </div>
          <Item sx={{ paddingY: 6 }}>
            <h2 className="ContentCTA__Title">Want to Collab With us?</h2>
            <Button
              variant="contained"
              size="large"
              color="primary"
              target="_top"
              rel="noopener noreferrer"
              href={`mailto:sales@skrillagang.co`}
            >
              <h3>Get In Touch!</h3>
            </Button>
          </Item>
        </Container>
      </Box>
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <div className="Aboutimg">
            {/* <img src={KaiPic}  alt="" /> */}
            {/* <img src={KaiPic}  alt="" /> */}
          </div>
          <Item sx={{ paddingY: 6 }}>
            <h2 className="ContentCTA__Title">Want to Custom Print With us?</h2>
            <h3 className="ContentCTA__Title">
              We do buisness and small projects!
            </h3>
            <Button
              variant="contained"
              size="large"
              color="primary"
              target="_top"
              rel="noopener noreferrer"
              href={`mailto:sales@skrillagang.co`}
            >
              <h3>Get In Touch!</h3>
            </Button>
          </Item>
        </Container>
      </Box>
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <Item sx={{ paddingY: 6 }}>
            <h2 className="CollabInfo__Title">Contact</h2>
            <p className="ContentCTA__Info">
              {" "}
              $krilla-gang is all about motivating the population! We pride
              ourselves on all of our clothing, specializing in T-shirts, and
              love that we have the opportunity to share them with you!
            </p>
          </Item>
        </Container>
      </Box>
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <Item sx={{ paddingY: 6 }}>
            <h2 className="CollabInfo__Title">Contact</h2>
            <p className="CollabInfo__Info">
              {" "}
              Jeremiah founded the company with the vision of encouraging
              anyone, and everyone, to be their best selves. Never stop working
              towards your dreams. A big thing $krilla-gang focuses on, is
              making sure everyone knows just how powerful determination can be.
            </p>
          </Item>
        </Container>
      </Box>
    </section>
  );
}
export default Collabs;
