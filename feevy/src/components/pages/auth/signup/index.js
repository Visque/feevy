import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";

import "../../../../App.css";

import { saveUser } from "../../../../api/auth";

import Message from "../../../UI/molecules/message";
import { Button, Divider, TextField, Typography } from "@mui/material";

import Auth from "../../../templates/auth"
import SignupMolecule from "../../../UI/molecules/signUp-mol"

let messageVariant;                                                                                 // Pass or Fail

function SignupCard(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userConfPass, setUserConfPass] = useState("");

  function onUserNameChange(event) {
    // console.log(event.target.value);
    setUserName(event.target.value);
  }

  function onUserMailChange(event) {
    // console.log(event.target.value);
    setUserMail(event.target.value);
  }

  function onUserPassChange(event) {
    // console.log(event.target.value);
    setUserPass(event.target.value);
  }

  function onUserConfirmPassChange(event) {
    // console.log(event.target.value);
    setUserConfPass(event.target.value);
  }

  async function onSubmit(event){
      if(userPass !== userConfPass){
          messageVariant = "fail"
          setMessage("Passwords dont match");
          setUserPass("")
          setUserConfPass("")
          return;
      }

      else{
          try{

            let userObj = {
              userName: userName,
              password: userPass,
              email: userMail,
            };
            setLoading(true)

            let data = await saveUser(userObj);

            setLoading(false);

            if(data){
              setUserName("")
              setUserMail("")
              setUserPass("")
              setUserConfPass("")

              if(data.err){
                messageVariant = "fail"
                setMessage(data.err);
              }  
              else{
                messageVariant = "pass";
                setMessage(data.mssg);
                // console.log("user saved :)", data)
              }
            }

            navigate("/add")
          }
          catch(err){
            alert("something went terribly wrong :(")
          }
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
        <SignupMolecule
          onUserNameChange={onUserNameChange}
          onUserMailChange={onUserMailChange}
          onUserPassChange={onUserPassChange}
          onUserConfirmPassChange={onUserConfirmPassChange}
          onSubmit={onSubmit}
          loading={loading}
          authRouter={props.authRouter}
        />
      </Auth>
    </>
  );
}

export default memo(SignupCard);

