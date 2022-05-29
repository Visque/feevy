import React, {useState} from 'react'

import styles from "../style.module.css"
import "../../../App.css";



import Input from "../../../components/input";
import Button from "../../../components/button";
import Message from '../../../components/message';

import { signin } from "../../../api/auth"
import { useNavigate } from "react-router-dom";

let messageVariant;                                                                                 // Pass or Fail

export default function SigninCard(props) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

    
  function onUserNameChange(event){
    // console.log(event.target.value)
    setUserName(event.target.value)
  }

  function onUserPassChange(event){
    // console.log(event.target.value)
    setUserPass(event.target.value)
  }

  async function onsubmit(event){
    if(userName == "" || userPass == ""){
      messageVariant = "fail"
      setMessage("Please Enter username or password")
      setUserName("");
      setUserPass("");
    }
    else{
      setMessage("")
      let userObj = {
        userName: userName,
        password: userPass
      }

      let data = await signin(userObj);

      if(data){
        setUserName("");
        setUserPass("");
        if(data.err){
          messageVariant = "fail";
          setMessage(data.err);
        }
        else{
          localStorage.setItem("token", JSON.stringify(data.token))
          props.setAuth()
        }
      }
    }
  }


  return (
    <>
      <div className="container flex">
        <div className="sub-container flex-column">
          <h1 className="title">Sign In</h1>
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
              type={"password"}
              onChange={onUserPassChange}
              placeholder={"Enter Your Password"}
              value={userPass}
            />

            <Button
              onClick={onsubmit}
              type="submit"
              variant={"secondaryGreen"}
              value={"Sign In"}
            />
          </div>

          <p>
            Create an Account ?{" "}
            <Button
              variant={"link"}
              onClick={props.authRouter}
              value={"Sign Up"}
            />
          </p>
        </div>
      </div>
    </>
  );
}
