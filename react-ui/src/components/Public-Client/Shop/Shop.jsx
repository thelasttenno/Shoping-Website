import React, { Component } from "react";
import SingleItem from "../SingleItem/SingleItem";
import SingleCollabItem from "../SingleCollabItem/SingleCollabItem";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TheCrew from "../../../assets/photos/WebsiteGood/thecrew.JPG";
import streetskate from "../../../assets/photos/WebsiteGood/streetskate1.JPG";
import streetskate2 from "../../../assets/photos/WebsiteGood/streetskate2.JPG";
import { ImageList, ImageListItem } from "@mui/material";
let itemData = [{ img: TheCrew }, { img: streetskate }, { img: streetskate2 }];
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Shop(props) {
  // status: "All Items",
  const [statuss1, setStatuss1] = React.useState("All Items");

  function updateStatus(e) {
    const { value } = e.target;
    setStatuss1(value);
    console.log(e.target.value);
  }

  console.log(props);
  if (props.isFetching !== true) {
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
            <Box item xs={"auto"} sx={{ marginY: 6 }}>
              <Container maxWidth="xs">
                <Item sx={{ paddingY: 6 }}>
                  <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Item Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={statuss1}
                      onChange={updateStatus}
                      autoWidth
                      label="Item Type"
                    >
                      <MenuItem value="All Items">Please Select</MenuItem>
                      <MenuItem value="Collabs">Collabs</MenuItem>
                      <MenuItem value="T-Shirt">T-Shirt</MenuItem>
                      <MenuItem value="Hoodies">Hoodies</MenuItem>
                      <MenuItem value="SweatPants">SweatPants</MenuItem>
                      <MenuItem value="Long-T">Long-T</MenuItem>
                      <MenuItem value="Socks">Socks</MenuItem>
                      <MenuItem value="Stickers">Stickers</MenuItem>
                    </Select>
                  </FormControl>
                </Item>
              </Container>
            </Box>
            {/* {if (statuss1 === "Collabs") {} else {}} */}
            <h2 className="Shop__title">{statuss1}</h2>

            <Box
              sx={{ flexGrow: 1 }}
              style={{
                display: statuss1 === "All Items" ? "flex" : "none",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid
                container
                spacing={12}
                columns={16}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {props.megaState.Collabitems.map((_Item, index) => (
                  <Grid item xs={"auto"} key={index}>
                    <Item>
                      <SingleCollabItem
                        Item={_Item}
                        shoppingCart={props.shoppingCart}
                        addToCart={props.addToCart}
                        removeFromCart={props.removeFromCart}
                        addSingleItemToCart={props.addSingleItemToCart}
                        removeSingleItemFromCart={
                          props.removeSingleItemFromCart
                        }
                        key={Item.id}
                      />
                    </Item>
                  </Grid>
                ))}
                {props.megaState.NotCollabitems.map((_Item, index) => (
                  <Grid item xs={"auto"} key={index}>
                    <Item>
                      <SingleCollabItem
                        Item={_Item}
                        shoppingCart={props.shoppingCart}
                        addToCart={props.addToCart}
                        removeFromCart={props.removeFromCart}
                        addSingleItemToCart={props.addSingleItemToCart}
                        removeSingleItemFromCart={
                          props.removeSingleItemFromCart
                        }
                        key={Item.id}
                      />
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{ flexGrow: 1 }}
              style={{
                display: statuss1 === "Collabs" ? "flex" : "none",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={12} columns={16}>
                {props.megaState.Collabitems.map((_Item, index) => (
                  <Grid item xs={"auto"} key={index}>
                    <Item>
                      <SingleCollabItem
                        Item={_Item}
                        shoppingCart={props.shoppingCart}
                        addToCart={props.addToCart}
                        removeFromCart={props.removeFromCart}
                        addSingleItemToCart={props.addSingleItemToCart}
                        removeSingleItemFromCart={
                          props.removeSingleItemFromCart
                        }
                        key={Item.id}
                      />
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <div
              style={{
                display: statuss1 === "T-Shirt" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsTShirt"
            >
              {" "}
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.CollabitemsTShirt.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleCollabItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "T-Shirt" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsTShirt"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.NotCollabitemsTShirt.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: props.status === "Long-T" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsLongT"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.CollabitemsLongT.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleCollabItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: props.status === "Long-T" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsLongT"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.NotCollabitemsLongT.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "SweatPants" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsSweatPants"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.CollabitemsSweatPants.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleCollabItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "SweatPants" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsSweatPants"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.NotCollabitemsSweatPants.map(
                    (_Item, index) => (
                      <Grid item xs={"auto"} key={index}>
                        <Item>
                          <SingleItem
                            Item={_Item}
                            shoppingCart={props.shoppingCart}
                            addToCart={props.addToCart}
                            removeFromCart={props.removeFromCart}
                            addSingleItemToCart={props.addSingleItemToCart}
                            removeSingleItemFromCart={
                              props.removeSingleItemFromCart
                            }
                            key={Item.id}
                          />
                        </Item>
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "Socks" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsSocks"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.CollabitemsSocks.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleCollabItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "Socks" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsSocks"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.NotCollabitemsSocks.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "Hoodies" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsHoodies"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.CollabitemsHoodies.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleCollabItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "Hoodies" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsHoodies"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.NotCollabitemsHoodies.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "Stickers" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards NotCollabitemsStickers"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.NotCollabitemsStickers.map(
                    (_Item, index) => (
                      <Grid item xs={"auto"} key={index}>
                        <Item>
                          <SingleItem
                            Item={_Item}
                            shoppingCart={props.shoppingCart}
                            addToCart={props.addToCart}
                            removeFromCart={props.removeFromCart}
                            addSingleItemToCart={props.addSingleItemToCart}
                            removeSingleItemFromCart={
                              props.removeSingleItemFromCart
                            }
                            key={Item.id}
                          />
                        </Item>
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>
            </div>
            <div
              style={{
                display: statuss1 === "Stickers" ? "flex" : "none",
                flexDirection: "column",
              }}
              className="cards CollabitemsStickers"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={12} columns={16}>
                  {props.megaState.CollabitemsStickers.map((_Item, index) => (
                    <Grid item xs={"auto"} key={index}>
                      <Item>
                        <SingleItem
                          Item={_Item}
                          shoppingCart={props.shoppingCart}
                          addToCart={props.addToCart}
                          removeFromCart={props.removeFromCart}
                          addSingleItemToCart={props.addSingleItemToCart}
                          removeSingleItemFromCart={
                            props.removeSingleItemFromCart
                          }
                          key={Item.id}
                        />
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
          </Item>
        </Container>
    );
  } else {
    return <div>Loading</div>;
  }
}
export default Shop;
