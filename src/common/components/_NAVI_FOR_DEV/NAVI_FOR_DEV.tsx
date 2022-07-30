import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { AppTitle } from 'common/components/_NAVI_FOR_DEV/components/AppTitle';
import { IconMenu } from 'common/components/_NAVI_FOR_DEV/components/IconMenu';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const NaviForDev = (): ReturnComponentType => (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
        <AppTitle />

        <IconMenu />
      </Toolbar>
    </Container>
  </AppBar>
);
