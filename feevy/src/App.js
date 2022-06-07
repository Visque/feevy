import "./App.css";

import React, { useState, useEffect, memo } from "react";

import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MiniDrawer from "./components/UI/organisms/drawer";

import Auth from "./components/pages/auth/index.js";
import Home from "./components/pages/home";
import NavBar from "./components/UI/organisms/navBar"

import io from "socket.io-client";
import { Box } from "@mui/material";

let user = {};

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log("main called :): ", isLoggedIn)

  const [socket, setSocket] = useState(null);

  useEffect(function () {
    // console.log("runing auth effect");
    setAuth();
  }, []);


  function setAuth(){
    let token = localStorage.getItem("token") || null
    if (token) {
      token = JSON.parse(token);
      if (token.isLoggedIn) {

        user.userName = token.userName;
        user.userMail = token.userMail;
        user.userId = token.userId;
        setIsLoggedIn(true);
        navigate("/home");
      }
    } else {
      setIsLoggedIn(false);
      navigate("/");
    }
  }

  // const isLoggedIn = false;
  let content;
  if (isLoggedIn == true) {
    content = (
      <>
        <NavBar user={user} setAuth={setAuth} />
        <Box sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center"
        }}>
          <Routes>
            <Route path="/home" element={<Home user={user} />} />
          </Routes>
        </Box>
      </>
    );
  } else {
    content = <Auth setAuth={setAuth} />;
  }

  // console.log("content: ", content);

  return (
  <>
    {content}
  </>
  )
}

export default memo(App);

// post for a user
