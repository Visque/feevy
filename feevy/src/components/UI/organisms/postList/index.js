import style from "./style.module.css";

import React, {
  memo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Link } from "react-router-dom";

import Feed from "../feed";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import CircularProgress from "@mui/material/CircularProgress";

import useGetPosts from "../../../useGetPosts.js";

import {socket} from "../../../pages/home"

function PostList(props) {
  console.log("called post list: )");

  const { user } = props;
  const [selectedIndex, setSelectedIndex] = useState();
  const [pageNumber, setPageNumber] = useState(0);

  const observer = useRef();

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


  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };



  return (
    <Box
      sx={{
        width: "100%",
        minWidth: "800px",
        height: "800px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <List
        sx={{ width: "100%" }}
        component="nav"
        aria-label="main mailbox folders"
      >
        {allPosts.map((feed, idx) => {
          if (allPosts.length === idx + 1) {
            return (
              <Feed
                lastFeedRef={lastFeedRef}
                socket={socket}
                user={user}
                key={idx}
                selected={selectedIndex === idx}
                onClick={(event) => handleListItemClick(event, idx)}
                feed={feed}
              />
            );
          } else {
            return (
              <Feed
                socket={socket}
                user={user}
                key={idx}
                selected={selectedIndex === idx}
                onClick={(event) => handleListItemClick(event, idx)}
                feed={feed}
              />
            );
          }
        })}
      </List>
      <Box sx={{
        margin: "10px 0"
      }}>{postsLoading && <CircularProgress />}</Box>
    </Box>
  );
}

export default memo(PostList);
