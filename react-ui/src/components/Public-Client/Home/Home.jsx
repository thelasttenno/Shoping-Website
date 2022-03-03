import React, { Component } from "react";
// import "./Home.scss";
import SingleItem from "../../../components/Public-Client/SingleItem/SingleItem";
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
