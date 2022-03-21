import React, { Component } from "react";
import SingleItem from "../../../components/Public-Client/SingleItem/SingleItem";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import streetskate3 from "../../../assets/photos/WebsiteGood/streetskate3.JPG";
import streetskate from "../../../assets/photos/WebsiteGood/streetskate1.JPG";
import streetskate2 from "../../../assets/photos/WebsiteGood/streetskate2.JPG";
import { ImageList, ImageListItem } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "primary" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
let itemData = [{ img: streetskate3 }, { img: streetskate }, { img: streetskate2 }];
class Home extends Component {
  render() {
    if (this.props.isFetching !== true) {
      return (
        <Container
          maxWidth="auto"
          sx={{
            marginY: 6,
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Money moves. In style.</h1>
          {/* <Box
            component="img"
            sx={{
              height: 233,
              width: 350,
              maxHeight: { xs: 233, md: 334 },
              maxWidth: { xs: 350, md: 500 },
            }}
            alt="The crew"
            src={TheCrew}
          /> */}
          <ImageList
            sx={{ width: 500, height: 450 }}
            variant="woven"
            cols={3}
            gap={8}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=161&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Item>
            <h2 className="Home__title">New Products</h2>
            <Box
              sx={{ flexGrow: 1 }}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Grid item xs={"auto"}>
                  <Item>
                    <SingleItem
                      {...this.props}
                      Item={this.props.Inventory.data[0]}
                    />
                  </Item>
                </Grid>
                <Grid item xs={"auto"}>
                  <Item>
                    <SingleItem
                      {...this.props}
                      Item={this.props.Inventory.data[2]}
                    />
                  </Item>
                </Grid>
                <Grid item xs={"auto"}>
                  <Item>
                    <SingleItem
                      {...this.props}
                      Item={this.props.Inventory.data[3]}
                    />
                  </Item>
                </Grid>

                <Grid item xs={"auto"}>
                  <Item>
                    <SingleItem
                      {...this.props}
                      Item={this.props.Inventory.data[4]}
                    />
                  </Item>
                </Grid>
                <Grid item xs={"auto"}>
                  <Item>
                    <SingleItem
                      {...this.props}
                      Item={this.props.Inventory.data[4]}
                    />
                  </Item>
                </Grid>
                <Grid item xs={"auto"}>
                  <Item>
                    <SingleItem
                      {...this.props}
                      Item={this.props.Inventory.data[4]}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Container>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
export default Home;
