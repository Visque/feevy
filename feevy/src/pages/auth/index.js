import React, { useState } from "react";

import "../../App.css";
import styles from "./style.module.css";

import Input from "../../components/input";
import Button from "../../components/button";
import SigninCard from "./signin";
import SignupCard from "./signup";


export default function Auth(props) {

  const [signinSelected, setSigninSelected] = useState(true);

  function onAuthRouter(event) {
    console.log("changing: ", signinSelected);
    setSigninSelected(!signinSelected)
  }

  let content;

  if (signinSelected) {
    content = (
      <SigninCard
        authRouter={onAuthRouter}
        setAuth={props.setAuth}
      />
    );
  } else {
    content = (
      <SignupCard
        authRouter={onAuthRouter}
      />
    );
  }

  return <>{content}</>;
}
