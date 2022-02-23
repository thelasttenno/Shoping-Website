// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// function Signin() {
//   const [userData, setUserData] = useState({ username: "", password: "" });
//   const [errorMessage, setErrorMessage] = useState({ value: "" });
//   const history = useHistory();
//   console.log("auth", localStorage.getItem("isAuthenticated"));

//   const handleInputChange = (e) => {
//     setUserData((prevState) => {
//       return {
//         ...prevState,
//         [e.target.name]: e.target.value,
//       };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     //if username or password field is empty, return error message
//     if (userData.username === "" || userData.password === "") {
//       setErrorMessage((prevState) => ({
//         value: "Empty username/password field",
//       }));
//     } else if (userData.username === "admin" && userData.password === "123456") {
//       //Signin Success
//       localStorage.setItem("isAuthenticated", "true");
//       window.location.pathname = "/admin";
//     } else {
//       //If credentials entered is invalid
//       setErrorMessage((prevState) => ({ value: "Invalid username/password" }));
//     }
//   };

//   return (
//     <div className="text-center">
//       <h1>Signin User</h1>
//       <form
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div className="form-group">
//           <label>Username</label>
//           <input
//             className="form-control"
//             type="text"
//             name="username"
//             onChange={(e) => handleInputChange(e)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             className="form-control"
//             type="password"
//             name="password"
//             onChange={(e) => handleInputChange(e)}
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>

//         {errorMessage.value && (
//           <p className="text-danger"> {errorMessage.value} </p>
//         )}
//       </form>
//     </div>
//   );


// }

// export default Signin;
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLocation, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export default function SignIn(props) {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);
  const [username, setUserName] = React.useState();
  const [password, setPassword] = React.useState();

  const { state } = useLocation();

  const auth = async (data) => {
    try {
      const res = await axios
        .get("http://localhost:4242/authenticate", {
          auth: { username: data.get("email"), password: data.get("password") },
        })
        .then();
      if (res.data.token !== undefined) {
        props.setToken(res.data.token);
      }
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = await auth(data);
    console.log(token);
    props.setToken(token);
    setRedirectToReferrer(true);
    // eslint-disable-next-line no-console
  };

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};

