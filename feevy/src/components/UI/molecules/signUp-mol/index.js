import React, { memo } from "react";

import { Button, Divider, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";

import SendIcon from "@mui/icons-material/Send";

function SignupMolecule(props) {
  return (
    <>
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        onChange={props.onUserNameChange}
        margin="normal"
        placeholder={"Enter You UserName"}
      />
      <TextField
        type={"email"}
        margin="normal"
        onChange={props.onUserMailChange}
        placeholder={"Enter You Mail"}
      />
      <TextField
        type={"password"}
        margin="normal"
        onChange={props.onUserPassChange}
        placeholder={"Enter Your Password"}
      />
      <TextField
        type={"password"}
        margin="normal"
        onChange={props.onUserConfirmPassChange}
        placeholder={"Confirm Password"}
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
        Sign Up
      </LoadingButton>
      <Box>
        Have an Account ?
        <Button value="" onClick={props.authRouter}>
          Sign In
        </Button>
      </Box>
    </>
  );
}

export default memo(SignupMolecule)
