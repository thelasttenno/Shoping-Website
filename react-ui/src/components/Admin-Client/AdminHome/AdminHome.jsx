import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../../store/Actions/TestActions";
function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.pathname = "/signin";
  };
  return (
    <div className="App">
      <h1>Welcome to Skrilla Gang Admin</h1>
      <h2>Welcome to the Homepage / Landing page</h2>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
      {/* <Users /> */}
    </div>
  );
}

export default Home;
