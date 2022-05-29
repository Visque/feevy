import * as React from "react";
import { useState } from "react";
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


// import { makeStyles } from "@material-ui/core/styles";

import { savePost } from "../../api/post";

export default function Feed(props) {

  const { user, feed } = props;

  const [open, setOpen] = React.useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const [comment, setComment] = useState("");

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
    console.log("set to true");
    let data = await savePost(userPost);
    let post = data.post ? JSON.parse(data.post) : null;

    console.log("set to false: ", post);
    setCreatePostLoading(false);

    handleClose();
  };

  function handleListItemClick(event, idx){
    handleClickOpen();
    props.onClick();
  }

  return (
    <div>
      <ListItemButton
        key={props.key}
        selected={props.selected}
        onClick={(event) => handleListItemClick(event, props.key)}
      >
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={feed.title} />
      </ListItemButton>
      <Divider />

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>POST</DialogTitle>
        <div className="flex">

          <div className="feed" style={{ width: "70%" }}>
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
                value={feed.title}
              />
              <TextField
                autoFocus
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
          </div>

          <div className="comments" style={{ width: "30%" }}>
            <DialogContent>
              <DialogContentText>Comments: -</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Add Comment"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setComment(event.target.value)}
              />
              <h3>Comments for the feed will be here soon...</h3>
            </DialogContent>
          </div>

        </div>
      </Dialog>
    </div>
  );
}
