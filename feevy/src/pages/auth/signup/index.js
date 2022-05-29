import React, { useState } from "react";

import "../../../App.css"
import styles from "../style.module.css";

import { saveUser } from "../../../api/auth";

import Input from "../../../components/input";
import Button from "../../../components/button";
import Message from "../../../components/message";

let messageVariant;                                                                                 // Pass or Fail

export default function SignupCard(props) {


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

            let data = await saveUser(userObj);
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
          }
          catch(err){
            alert("something went terribly wrong :(")
          }
      }
  }

  return (
    <>
      <div className="container flex">
        <div className="sub-container flex-column">
          <h1 className="title">Sign Up</h1>
          {
            message.length ? <Message variant={messageVariant} mssg={message} /> : <></>
          }
          <div className="auth-form flex-column">
            <Input
              onChange={onUserNameChange}
              placeholder={"Enter You UserName"}
              value={userName}
            />
            <Input
              type={"email"}
              onChange={onUserMailChange}
              placeholder={"Enter You Mail"}
              value={userMail}
            />
            <Input
              type={"password"}
              onChange={onUserPassChange}
              placeholder={"Enter Your Password"}
              value={userPass}
            />
            <Input
              type={"password"}
              onChange={onUserConfirmPassChange}
              placeholder={"Confirm Password"}
              value={userConfPass}
            />

            <Button
              type="submit"
              variant={"secondaryGreen"}
              value={"Sign In"}
              onClick={onSubmit}
            />
          </div>

          <p>
            Have an Account ?{" "}
            <Button
              variant={"link"}
              onClick={props.authRouter}
              value={"Sign In"}
            />
          </p>
        </div>
      </div>
    </>
  );
}
