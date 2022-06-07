import style from "./style.module.css";

import React, { useState, memo } from "react";
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

function PostList(props) {
  console.log("called post list: )");

  const { loading, feeds, user, socket, lastFeedRef } = props;
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


  let content = (
    <Box
      className="findMe"
      sx={{
        width: "100%",
        minWidth: "800px",
        height: "800px",
        overflowY: "auto",
      }}
    >
      <List
        sx={{ width: "100%" }}
        component="nav"
        aria-label="main mailbox folders"
      >
        {feeds.map((feed, idx) => {
          if (feeds.length === idx + 1) {
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
      <Box>
        {loading && <CircularProgress />}
      </Box>
    </Box>
  );

  return <>{content}</>;
}

export default memo(PostList);
