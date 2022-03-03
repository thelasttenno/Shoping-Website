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
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function CustomPrinting() {
  return (
    <section className="Collabs">
      <Box item xs={"auto"} sx={{ marginY: 6 }}>
        <Container>
          <div className="Aboutimg">
            {/* <img src={KaiPic}  alt="" /> */}
            {/* <img src={KaiPic}  alt="" /> */}
          </div>
          <Item sx={{ paddingY: 6 }}>
            <h2 className="ContentCTA__Title">Want to Custom Print With us?</h2>
            <h3 className="ContentCTA__Title">We do buisness and small projects!</h3>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              quis magnam velit. Voluptate iste iusto praesentium rem
              dignissimos amet laudantium accusantium veniam quis, velit enim
              esse repellendus nisi ipsam commodi!
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              quis magnam velit. Voluptate iste iusto praesentium rem
              dignissimos amet laudantium accusantium veniam quis, velit enim
              esse repellendus nisi ipsam commodi!
            </p>
          </Item>
        </Container>
      </Box>
    </section>
  );
}
export default CustomPrinting;
