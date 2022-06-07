import { useEffect, useState, useRef } from "react";
import axios from "axios";

const url = "http://localhost:5000/post";

export default function useGetPosts(user, pageNumber, socket) {
//   console.log(user, pageNumber);
  const [postsLoading, setPostsLoading] = useState(true);
  const [allPosts, setAllPosts] = useState([]);
  const [morePosts, setMorePosts] = useState(false);

  useEffect(() => {
    setAllPosts([]);
  }, [pageNumber]);

  useEffect(() => {
    let cancel;
    setPostsLoading(true);

    axios({
      method: "GET",
      url: url,
      params: { userId: user.userId, pageNumber: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        let data = res.data;
        if (data) {
          let userFeeds = JSON.parse(data.feeds);
            console.log("feeds: ", userFeeds.length);
          setAllPosts([...allPosts, ...userFeeds]);
          setMorePosts(userFeeds.length > 0);
          setPostsLoading(false);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
      });
  }, [pageNumber]);

  useEffect(
    function () {
      socket.on("new post", addPost);
    },
    [allPosts]
  );

  const addPost = (post) => {
    console.log("adding a POST through socket")
    post.comments = [];
    setAllPosts([post, ...allPosts]);
  };

  return { postsLoading, allPosts, morePosts };
}
