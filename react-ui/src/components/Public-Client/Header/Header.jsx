// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// function Header(props) {
//   const location = useLocation();
//   return (
//     <header className="header">
//       <nav className="nav">
//         <div className="nav--content">
//           <Link
//             className="link"
//             to={"/"}
//           >
//             <img src={Logo} className="nav-logo" alt="" />
//           </Link>
//           <ul className="nav-menu">
//             <li>
//               <Link
//                 to={"/"}
//                 className={`link nav-link ${
//                   location.pathname.toLowerCase().includes("inventory")
//                     ? "nav-button nav-link--active nav-button--right"
//                     : ""
//                 }`}
//               >
//                 <p>HOME</p>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={"/about"}
//                 className={`link nav-link ${
//                   location.pathname.toLowerCase().includes("inventory")
//                     ? "nav-button nav-link--active nav-button--right"
//                     : ""
//                 }`}
//               >
//                 <p>ABOUT</p>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={"/shop"}
//                 className={`link nav-link ${
//                   location.pathname.toLowerCase().includes("inventory")
//                     ? "nav-button nav-link--active nav-button--right"
//                     : ""
//                 }`}
//               >
//                 <p>SHOP</p>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={"/collabs"}
//                 className={`link nav-link ${
//                   location.pathname.toLowerCase().includes("inventory")
//                     ? "nav-button nav-link--active nav-button--right"
//                     : ""
//                 }`}
//               >
//                 <p>COLLABS</p>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to={"/cart"}
//                 className={`link nav-link ${
//                   location.pathname.toLowerCase().includes("inventory")
//                     ? "nav-button nav-link--active nav-button--right"
//                     : ""
//                 }`}
//               >
//                 <p>
//                   CART{" "}
//                   {props.numCartItems() !== 0
//                     ? `(${props.numCartItems()})`
//                     : ""}
//                 </p>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// }
// export default Header;
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CardMedia from "@mui/material/CardMedia";
import { Link, useLocation } from "react-router-dom";
// import makeStyles from "@mui/styles/makeStyles";
import Logo from "../../../assets/photos/logos/KL-Logos/$krilla-GangLogo3Website.png";
// const useStyles = makeStyles({
//   logo: {
//     maxWidth: 160,
//   },
// });
const Header = (props) => {
  // let classes = useStyles();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="Your logo."
              src={Logo}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key={"Home"} onClick={handleCloseNavMenu}>
                <Button
                  onClick={handleCloseNavMenu}
                  textAlign="center"
                  component={Link}
                  to="/"
                >
                  Home
                </Button>
              </MenuItem>
              <MenuItem key={"About"} onClick={handleCloseNavMenu}>
                <Button
                  onClick={handleCloseNavMenu}
                  textAlign="center"
                  component={Link}
                  to="/about"
                >
                  About
                </Button>
              </MenuItem>
              <MenuItem key={"Collabs"} onClick={handleCloseNavMenu}>
                <Button
                  onClick={handleCloseNavMenu}
                  textAlign="center"
                  component={Link}
                  to="/Collabs"
                >
                  Collabs
                </Button>
              </MenuItem>
              <MenuItem key={"Shop"} onClick={handleCloseNavMenu}>
                <Button
                  onClick={handleCloseNavMenu}
                  textAlign="center"
                  component={Link}
                  to="/Shop"
                >
                  Shop
                </Button>
              </MenuItem>
              <MenuItem key={"Cart"} onClick={handleCloseNavMenu}>
                <Button
                  onClick={handleCloseNavMenu}
                  textAlign="center"
                  component={Link}
                  to="/Cart"
                >
                  Cart{" "}
                  {props.numCartItems() !== 0
                    ? `(${props.numCartItems()})`
                    : ""}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            $krillaGang
            {/* <img src={Logo} className="nav-logo" alt="" /> */}
          </Typography>
          <Box
            sx={{
              justifyContent: "right",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              key={"Home"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              key={"Home"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/About"
            >
              About
            </Button>
            <Button
              key={"Home"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/Collabs"
            >
              Collabs
            </Button>
            <Button
              key={"Home"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/Shop"
            >
              Shop
            </Button>
            <Button
              key={"Home"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/Cart"
            >
              Cart{" "}
              {props.numCartItems() !== 0 ? `(${props.numCartItems()})` : ""}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
