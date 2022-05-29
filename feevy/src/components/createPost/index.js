import * as React from "react";
import {useState} from "react"
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";

import {savePost} from "../../api/post"

export default function CreatePost(props) {

  const {user} = props;

  const [open, setOpen] = React.useState(false);

  const [postTitle, setPostTitle] = useState("")
  const [postDesc, setPostDesc] = useState("")

  const [createPostLoading, setCreatePostLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostSubmit = async () => {
    console.log("post saved")
    let userPost = {
      title: postTitle,
      description: postDesc,
      createdBy: user.userId,
    };

    setCreatePostLoading(true)
    console.log("set to true")
    let data = await savePost(userPost);
    let post = data.post ? JSON.parse(data.post) : null

    console.log("set to false: ", post)
    setCreatePostLoading(false);

    handleClose();
  }

  return (
    <div>
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
            autoFocus
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
    </div>
  );
}
