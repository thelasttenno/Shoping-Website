import Container from "@mui/material/Container";
import TheCrew from "../../../assets/photos/WebsiteGood/thecrew.JPG";
import streetskate from "../../../assets/photos/WebsiteGood/streetskate1.JPG";
import streetskate2 from "../../../assets/photos/WebsiteGood/streetskate2.JPG";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ImageList, ImageListItem } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "primary" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
let itemData = [{ img: TheCrew }, { img: streetskate }, { img: streetskate2 }];

function Footer(){
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
        <h2>Follow @skrilla__gang on Instagram</h2>
      </Item>
            <p>&copy; TennoGen.ca All Rights Reserved</p>
            </Container>
    
    )
}
export default Footer;