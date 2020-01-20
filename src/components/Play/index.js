import React, { useCallback, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';

import { Story } from '@react-story-rich/core';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core//Container';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';

import MenuIcon from '@material-ui/icons/Menu';

import Drawer from 'components/Drawer';
import Navigation from 'components/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 56, // Navigation height
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.background.default,
  },
  navigation: {
    width: '100vw',
  },
  fab: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const NAME = 'Play';

function Play() {
  const classes = useStyles();
  const { t } = useTranslation('UI');

  const [drawerState, setDrawerState] = useState({ open: false });
  const toggleDrawer = useCallback((open = !drawerState.open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
    setDrawerState({ open });
  }, [drawerState.open]);

  return (
    <SnackbarProvider maxSnack={3}>
      <div className={clsx('Game', classes.root)}>
        <Fab
          color="secondary"
          aria-label={t(`${NAME}.toggleDrawer`)}
          className={classes.fab}
          onClick={toggleDrawer(true)}
          onKeyPress={toggleDrawer(true)}
        >
          <MenuIcon />
        </Fab>
        <Drawer open={drawerState.open} toggle={toggleDrawer} className={classes.drawer} />
        <Container maxWidth="sm">
          <Story
            component={Grid}
            spacing={2}
            container
          />
        </Container>
        <AppBar position="fixed" className={classes.appBar} elevation={4}>
          <Navigation rootPath="/play" className={classes.navigation} />
        </AppBar>
      </div>
    </SnackbarProvider>
  );
}

export default Play;
