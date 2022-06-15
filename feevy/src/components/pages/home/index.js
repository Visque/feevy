import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";

import PostList from "../../UI/organisms/postList";
import CreatePostBtn from "../../UI/organisms/createPostBtn";
import HomeTemp from "../../templates/home"; // template


import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
export { socket };

function Home(props) {

  const { user } = props;

  return (
    <>
      <HomeTemp>
        <CreatePostBtn socket={socket} user={user} />
        <PostList
          user={user}
        />
      </HomeTemp>
    </>
  );
}

export default memo(Home);
