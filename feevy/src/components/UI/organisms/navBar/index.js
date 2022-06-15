import * as React from "react";
import { memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { signout } from "../../../../api/auth";

function MenuAppBar(props) {
  const { user, setAuth } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  async function onLogout(event) {
    let data = await signout(user);

    // console.log("data: ", data);
    setAuth();
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: "var(--dark-grey)",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feevy
          </Typography>
          {
            <Box>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Box sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "75px"
                }}>
                  <AccountCircle />
                  {/* <Typography variant="h6">{user.userName}</Typography> */}
                </Box>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default memo(MenuAppBar);
