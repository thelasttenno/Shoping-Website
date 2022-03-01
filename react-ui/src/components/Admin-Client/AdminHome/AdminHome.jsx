import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../../store/Actions/TestActions";
import { useHistory } from "react-router";
import Button from "@mui/material/Button";


export default function Home(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const history = useHistory()
  return (
    <div className="App">
      <h1>Welcome to Skrilla Gang Admin</h1>
      <h2>Welcome to the Homepage / Landing page</h2>
      <p>
        Welcome user! <Button  variant="outlined" onClick={() => {
          props.deleteCookie()
        }}>Sign out</Button>
      </p>
      {/* <Users /> */}
    </div>
  );
}

