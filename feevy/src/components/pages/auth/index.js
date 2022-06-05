import React, { useState, memo } from "react";

import "../../../App.css";

import styles from "./style.module.css";

import SigninCard from "./signin";
import SignupCard from "./signup";

function Auth(props) {
  const [signinSelected, setSigninSelected] = useState(true);

  function onAuthRouter(event) {
    console.log("changing: ", signinSelected);
    setSigninSelected(!signinSelected);
  }

  let content;

  if (signinSelected) {
    content = <SigninCard authRouter={onAuthRouter} setAuth={props.setAuth} />;
  } else {
    content = <SignupCard authRouter={onAuthRouter} />;
  }

  return <>{content}</>;
}

export default memo(Auth);
