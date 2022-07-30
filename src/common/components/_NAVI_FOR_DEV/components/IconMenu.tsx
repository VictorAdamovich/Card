import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'app/store';
import img from 'assets/images/ava-img.jpg';
import { RoutePath } from 'common/enums/route-path';
import { logOut } from 'features/login/login-reducer';
import { ReturnComponentType } from 'types/ReturnComponentType';

const settings = ['Profile', 'Logout'];

type IconMenuPropsType = {
  // eslint-disable-next-line react/require-default-props
  avatar?: string;
};

export const IconMenu = (props: IconMenuPropsType): ReturnComponentType => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  // eslint-disable-next-line react/destructuring-assignment
  const imageUrl = props.avatar ? props.avatar : img;

  const handleCloseUserMenu = (title: string): void => {
    setAnchorElUser(null);
    if (title === 'Profile') {
      navigate(RoutePath.Profile);
    }
    if (title === 'Logout') {
      dispatch(logOut());
    }
  };
  return (
    <Box sx={{ flexGrow: 0, alignSelf: 'right' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Avatar Image" src={imageUrl} />
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
        {settings.map(setting => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
