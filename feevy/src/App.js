import "./App.css";

import React, { useState, useEffect, memo } from "react";

import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MiniDrawer from "./components/drawer";

import Auth from "./pages/auth/index.js";
import Home from "./pages/home";

let user = {};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const navigate = useNavigate();

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

  useEffect(function(){
    setAuth();
  }, [])


  // const isLoggedIn = false;
  let content;
  if (isLoggedIn) {
    content = (
      <MiniDrawer user={user} setAuth={setAuth}>
        <Routes>
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/k" element={<h1>llowdsa </h1>} />
        </Routes>
      </MiniDrawer>
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
