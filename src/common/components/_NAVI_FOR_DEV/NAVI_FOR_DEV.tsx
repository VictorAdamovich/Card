import React from 'react';

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/store';
import defaultImage from 'assets/images/ava-img.jpg';
import { RoutePath } from 'common/enums/route-path';
import { logOut } from 'features/login/login-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NaviForDev = (): ReturnComponentType => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);
  const name = useAppSelector(state => state.login.userInfo.name);
  const avatarImage = useAppSelector(state => state.login.userInfo.avatar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogOut = (): void => {
    setAnchorElUser(null);
    dispatch(logOut());
  };
  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };
  const handleOpenProfile = (): void => {
    setAnchorElUser(null);
    navigate(RoutePath.Profile);
  };
  const onClickHandler = (): void => navigate(RoutePath.Login);

  return (
    <div>
      <AppBar style={{ background: '#fff' }} position="static">
        <Toolbar style={{ justifyContent: 'space-around' }}>
          <Typography style={{ color: 'black' }} variant="h5">
            It-incubator
          </Typography>
          <Box>
            <NavLink to={RoutePath.Error404}>404 </NavLink>-
            <NavLink to={RoutePath.Profile}> Profile </NavLink>-
            <NavLink to={RoutePath.Login}> Login </NavLink>-
            <NavLink to={RoutePath.Register}> Register </NavLink>-
            <NavLink to={RoutePath.ForgotPassword}> ForgotPassword </NavLink>-
            <NavLink to={RoutePath.CheckEmail}> CheckEmail </NavLink>-
            <NavLink to={RoutePath.CreateNewPassword}>CreateNewPassword </NavLink>-
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography style={{ color: 'black' }} variant="h6">
                  {name}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar alt="Profile avatar" src={avatarImage || defaultImage} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button variant="contained" onClick={onClickHandler}>
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
