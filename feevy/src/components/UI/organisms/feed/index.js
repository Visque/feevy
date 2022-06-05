import * as React from "react";
import { useState, useEffect, memo } from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { Box } from "@mui/system";

// import { makeStyles } from "@material-ui/core/styles";

import { savePost } from "../../../../api/post";
import { saveComment, getComment } from "../../../../api/comment";
import { Typography } from "@mui/material";
import CommentList from "../../molecules/commentList";

import io from "socket.io-client";


function Feed(props) {

  // console.log("running feed")

  const { user, feed, socket } = props;

  const [open, setOpen] = React.useState(false);

  const [commentSendLoading, setCommentSendLoading] = useState(false);
  const [currComment, setCurrComment] = useState("");

  const [postComments, setPostComments] = useState([]);
  console.log("hello: ", postComments)
  async function fetchComments() {                            //
    let postId = feed._id;
    let temp = await getComment(postId);
    // console.log("got comments: ", temp.comments)
    setPostComments(temp.comments);
  }

  useEffect(
    function () {
      console.log("running use effect")
      fetchComments();
      socket.emit("join room", feed._id);
      
      // Join feed room after all comments are loaded to the UI
    },
    []
    );
    
    useEffect(function(){
    socket.on("new comment", addComment);

  }, [postComments])

  const addComment = (comment) => {
    if (comment.feedId == feed._id) {
      // console.log("Adding a comment through socket: ", comment, " : ", postComments);
      setPostComments([comment, ...postComments]);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentSubmit = async () => {
    let commentObj = {
      feedId: feed._id,
      message: currComment,
      postedBy: user.userId,
    };

    setCommentSendLoading(true);

    let saved = await saveComment(commentObj);
    let comment = saved.comment
    // console.log("checking :P ", comment)
    let socketComment = comment;
    socketComment.postedBy = {userName: user.userName}
    socket.emit("send comment", socketComment);
    setCurrComment("");
    setCommentSendLoading(false);
  };

  

  

  function handleListItemClick(event) {
    handleClickOpen();
    props.onClick();
  }

  return (
    <>
      <ListItemButton
        selected={props.selected}
        onClick={(event) => handleListItemClick(event)}
      >
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={feed.title} />
      </ListItemButton>
      <Divider />
      <Dialog open={open} onClose={handleClose} maxWidth="100px">
        <DialogTitle>POST</DialogTitle>
        <Box
          sx={{
            display: "flex",
            minHeight: "500px",
            maxHeight: "700px",
          }}
        >
          <Box className="feed" style={{ width: "60%" }}>
            <DialogContent>
              <DialogContentText>
                This Post will be visible to all your Friends
              </DialogContentText>
              <TextField
                margin="dense"
                id="name"
                label="Post Title"
                type="email"
                fullWidth
                variant="outlined"
                value={feed.title}
              />
              <TextField
                margin="dense"
                id="name"
                label="Post Description"
                type="textarea"
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                value={feed.description}
              />
            </DialogContent>
          </Box>

          <Box sx={{ width: "40%" }}>
            <DialogContent>
              <DialogContentText>Comments: -</DialogContentText>
              <TextField
                autoFocus
                value={currComment}
                margin="dense"
                id="name"
                label="Add Comment"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setCurrComment(event.target.value)}
              />
              <LoadingButton
                margin="normal"
                color="success"
                onClick={handleCommentSubmit}
                size="small"
                endIcon={<SendIcon />}
                loading={commentSendLoading}
                loadingPosition="end"
                variant="contained"
              >
                Comment
              </LoadingButton>

              <CommentList socket={socket} postComments={postComments} />
            </DialogContent>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default memo(Feed);