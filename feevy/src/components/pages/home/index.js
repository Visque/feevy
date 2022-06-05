import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";

import PostList from "../../UI/organisms/postList";
import CreatePostBtn from "../../UI/organisms/createPostBtn";
import HomeTemp from "../../templates/home"; // template

import { getPosts } from "../../../api/post";

import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

export { socket };

function Home(props) {
  const navigate = useNavigate();

  const { user } = props;

  const [postsLoading, setPostsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(function () {
    async function fetchPosts() {
      console.log("getting posts :)");
      let data = await getPosts(user.userId);
      if (data.mssg) {
        let userFeed = JSON.parse(data.feeds);
        console.log("feeds: ", userFeed);
        setPostsLoading(false);
        setAllPosts(userFeed);
      }
    }
    fetchPosts();
    navigate("/home");
  }, []);

  const addPost = (post) => {
    console.log(
      "yay adding a post: ",typeof post
    );

    setAllPosts([post, ...allPosts]);
  };

  socket.on("new post", addPost);

  return (
    <>
      <HomeTemp>
        <CreatePostBtn socket={socket} user={user} />
        <PostList socket={socket} user={user} loading={postsLoading} feeds={allPosts} />
      </HomeTemp>
    </>
  );
}

export default memo(Home);
