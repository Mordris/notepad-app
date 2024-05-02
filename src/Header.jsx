// Header.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

function Header({ toggleSidebar }) {
  
  const handleNewNote = () => {
    window.location.reload();
  };

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
        <Button onClick={handleNewNote} variant="contained">
          New Note
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
