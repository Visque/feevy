import style from "./style.module.css"

import React, { useState, memo } from 'react'
import { Link } from "react-router-dom"

import Feed from "../feed"

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import CircularProgress from '@mui/material/CircularProgress';

function PostList(props) {

  const { loading, feeds } = props;
  console.log(feeds)
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    // handleClickOpen()
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  let content = loading ? (
    <>
      <CircularProgress />
    </>
  ) : (
    <>
      <Box
        sx={{
          width: "100%",
          minWidth: "800px",
          bgcolor: "background.paper",
        }}
      >
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-label="main mailbox folders"
        >
          {feeds.map((feed, idx) => {
            return (
              <>
                <Feed
                  key={idx}
                  selected={selectedIndex === idx}
                  onClick={(event) => handleListItemClick(event, idx)}
                  feed={feed}
                />
              </>
            );
          })}
        </List>
      </Box>
    </>
  );

  return (
    <>
      <div className={style.container} >
        {content}
      </div>
    </>
  );
}

export default memo(PostList)
