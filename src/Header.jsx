// Header.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

function Header({ toggleSidebar }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Notes App
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SearchIcon />
          <InputBase
            placeholder="Search notes..."
            inputProps={{ "aria-label": "search notes" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
