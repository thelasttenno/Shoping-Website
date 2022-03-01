import React, { Component } from "react";
// import "./Home.scss";
import SingleItem from "../../../components/Public-Client/SingleItem/SingleItem";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const size = 4;
class Home extends Component {
  render() {
    console.log(this.props);

    if (this.props.isFetching !== true) {
      return (
        <section className="Home">
          <div className="Home__head">
            <div className="hero-content">
              {/* <!-- <h1 className="hero-content__title">50% off all Tee shirts with a purches of any item!</h1> --> */}
              {/* <!-- <p className="hero-content__blurb">OFFICAL LAUNCH OF WEBSITE AND FIRST CLOTHING DROP IS FEB. 20TH.</p>
      <p>if your here before the launch, thanks for the support and for sales inquirys you can hit us up over at our
        <a href="https://www.facebook.com/skrillagangco">facebook</a> or our <a
          href="https://www.instagram.com/skrilla__gang/">Instagram</a>
      </p>
      <p>or email us at <a href="mailto:sales@skrillagang.com">sales@skrillagang.com</a>
      </p> --> */}
              {/* <!-- <a className="hero-content__button button" href="/shop/">Shop Now</a> --> */}
            </div>
          </div>
          <div className="Home__header">
            <h2 className="Home__title">New Products</h2>

            <div className="cards"></div>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={12} columns={16}>
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
          </div>
        </section>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
export default Home;
