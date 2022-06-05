import * as React from "react";
import { useState, memo } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
} from "@mui/material";

import { savePost } from "../../../../api/post";

import io from 'socket.io-client'


function CreatePostBtn(props) {
  const { user, socket } = props;

  const [open, setOpen] = React.useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const [createPostLoading, setCreatePostLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostSubmit = async () => {
    console.log("post saved");
    let userPost = {
      title: postTitle,
      description: postDesc,
      createdBy: user.userId,
    };

    setCreatePostLoading(true);

    let data = await savePost(userPost);
    let post = data.post ? JSON.parse(data.post) : null;

    handleClose();
    socket.emit('send post', post)
    setCreatePostLoading(false);

  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create POST
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>POST</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This Post will be visible to all your Friends
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Post Title"
            type="email"
            fullWidth
            variant="outlined"
            onChange={(event) => setPostTitle(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Post Description"
            type="textarea"
            fullWidth
            variant="outlined"
            onChange={(event) => setPostDesc(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant={"contained"}
            color="error"
            size="small"
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={handlePostSubmit}
            variant={"outlined"}
            color="success"
            size="small"
            endIcon={<SendIcon />}
            loading={createPostLoading}
            loadingPosition="end"
          >
            Post
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default memo(CreatePostBtn)