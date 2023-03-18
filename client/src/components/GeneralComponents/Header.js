import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from "react";
import { useNavigate} from "react-router-dom";
import useLogout from "../../hooks/useLogout";

export default function Header(props) {

  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [anchorElApp, setAnchorElApp] = React.useState(null);
  const navigate = useNavigate();
  const logout = useLogout();

  function handleAppMenu(event) {
    setAnchorElApp(event.currentTarget);
  };

  function handleProfileMenu(event) {
    setAnchorElProfile(event.currentTarget);
  };
  
  const handleClose = (link) => {
    //<Link to= {link} >Gehe zur Startseite</Link>
    setAnchorElProfile(null);
    setAnchorElApp(null);
    navigate(link);
  }; 

  const signOut = async () => {
    await logout();
    navigate('/linkpage');
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAppMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
                id="menu-appbar"
                anchorEl={anchorElApp}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElApp)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose(props.routes.route1.link)}>{props.routes.route1.name}</MenuItem>
                <MenuItem onClick={() => handleClose(props.routes.route2.link)}>{props.routes.route2.name}</MenuItem>
              </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-profilebar"
                aria-haspopup="true"
                onClick={handleProfileMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-profilebar"
                anchorEl={anchorElProfile}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElProfile)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profil</MenuItem>
                <MenuItem onClick={signOut}>Abmelden</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}