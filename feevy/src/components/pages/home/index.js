import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";

import PostList from "../../UI/organisms/postList";
import CreatePostBtn from "../../UI/organisms/createPostBtn";
import HomeTemp from "../../templates/home"; // template

import { getPosts } from "../../../api/post";
import useGetPosts from "../../useGetPosts.js";

import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

export { socket };

function Home(props) {
  const navigate = useNavigate();

  const { user } = props;

  const observer = useRef();
  
  const [pageNumber, setPageNumber] = useState(0);
  
  const { allPosts, postsLoading, morePosts } = useGetPosts(
    user,
    pageNumber,
    socket
  );

  const lastFeedRef = useCallback(
    (lastFeed) => {
      if (postsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && morePosts) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (lastFeed) observer.current.observe(lastFeed);
    },
    [postsLoading, morePosts]
  );

  return (
    <>
      <HomeTemp>
        <CreatePostBtn socket={socket} user={user} />
        <PostList
          lastFeedRef={lastFeedRef}
          socket={socket}
          user={user}
          loading={postsLoading}
          feeds={allPosts}
        />
      </HomeTemp>
    </>
  );
}

export default memo(Home);
