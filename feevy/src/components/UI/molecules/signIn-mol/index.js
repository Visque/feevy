import React, { memo } from 'react'

import { Button, Divider, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";

import SendIcon from "@mui/icons-material/Send";

function SigninMolecule(props) {
  return (
    <>
      <Typography variant="h5">Sign In</Typography>
      <TextField
        onChange={props.onUserNameChange}
        margin="normal"
        label="UserName"
        variant="outlined"
        value={props.userName}
      />
      <TextField
        onChange={props.onUserPassChange}
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        value={props.userPass}
      />
      <LoadingButton
        margin="normal"
        color="success"
        onClick={props.onSubmit}
        size="small"
        endIcon={<SendIcon />}
        loading={props.loading}
        loadingPosition="end"
        variant="contained"
      >
        Sign In
      </LoadingButton>
      <Box>
        Create an Account ?
        <Button value="" onClick={props.authRouter}>
          Sign Up
        </Button>
      </Box>
    </>
  );
}

export default memo(SigninMolecule)
