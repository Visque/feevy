import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../style.module.css";
import "../../../../App.css";

import Message from "../../../UI/molecules/message";
import SigninMolecule from "../../../UI/molecules/signIn-mol"             // molecule
import Auth from "../../../templates/auth"                                // template

import { signin } from "../../../../api/auth";
import { Button, Divider, TextField, Typography } from "@mui/material";

let messageVariant; // Pass or Fail

function SigninCard(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  function onUserNameChange(event) {
    // console.log(event.target.value)
    setUserName(event.target.value);
  }

  function onUserPassChange(event) {
    // console.log(event.target.value)
    setUserPass(event.target.value);
  }

  async function onsubmit(event) {
    if (userName == "" || userPass == "") {
      messageVariant = "fail";
      setMessage("Please Enter username or password");
      setUserName("");
      setUserPass("");
    } else {
      setMessage("");
      let userObj = {
        userName: userName,
        password: userPass,
      };

      setLoading(true);

      let data = await signin(userObj);

      setLoading(false);


      if (data) {
        setUserName("");
        setUserPass("");
        if (data.err) {
          messageVariant = "fail";
          setMessage(data.err);
        } else {
          localStorage.setItem("token", JSON.stringify(data.token));
          props.setAuth();
        }
      }

      navigate("/home")
    }
  }

  return (
    <>
      <Auth>
        {message.length ? (
          <Message variant={messageVariant} mssg={message} />
        ) : (
          <></>
        )}

        <SigninMolecule
          userName={userName}
          userPass={userPass}
          onUserNameChange={onUserNameChange}
          onUserPassChange={onUserPassChange}
          onSubmit={onsubmit}
          authRouter={props.authRouter}
          loading={loading}
        />
      </Auth>
    </>
  );
}

export default memo(SigninCard);