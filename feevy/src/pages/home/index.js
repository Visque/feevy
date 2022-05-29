import io from "socket.io-client";

import React, {memo, useState, useEffect} from 'react'
import style from "./style.module.css"

import FriendList from '../../components/friendList';
import PostList from '../../components/postList';
import CreatePost from "../../components/createPost";

import { getPosts } from "../../api/post"


function Home(props) {
  const { user } = props;

  const [postsLoading, setPostsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(function () {
    async function fetchPosts() {
      let data = await getPosts(user.userId);
      if (data.mssg) {
        let userFeed = JSON.parse(data.feeds);
        setPostsLoading(false);
        setAllPosts(userFeed);
      }
    }
    fetchPosts();
  }, []);

  

  return (
    <>
      <div className={`${style.container} flex`}>
        <div className={`${style.container} flex-column`}>
          <CreatePost user={user} />
          <PostList loading={postsLoading} feeds={allPosts} />
        </div>
        <FriendList />
      </div>
    </>
  );
}

export default memo(Home);
