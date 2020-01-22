import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import clsx from 'clsx';

import { SnackbarProvider } from 'notistack';
import { useTranslation } from 'react-i18next';

import { Story, Tree } from '@react-story-rich/core';
import CardElement from '@react-story-rich/ui/components/CardElement';
import mapStateToProps from '@react-story-rich/core/reducers/mapStateToProps';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core//Container';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';

import MenuIcon from '@material-ui/icons/Menu';

import Drawer from 'components/Drawer';
import Navigation from 'components/Navigation';
import HideOnScroll from 'components/HideOnScroll';

import tree from 'tree';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.default,
    },
  },
  root: {
    marginBottom: 56, // Navigation height
    paddingTop: theme.spacing(4),
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.background.default,
  },
  navigation: {
    width: '100vw',
  },
  topBox: {
    position: 'fixed',
    width: '100vw',
    zIndex: 1,
    top: theme.spacing(2),
  },
}));

const NAME = 'Play';

function Play({ dispatch, history }) {
  const classes = useStyles();
  const { t } = useTranslation('UI');

  const [drawerState, setDrawerState] = useState({ open: false });
  const toggleDrawer = useCallback((open = !drawerState.open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
    setDrawerState({ open });
  }, [drawerState.open]);

  const root = useMemo(() => new Tree(tree), []);

  return (
    <SnackbarProvider maxSnack={3}>
      <div className={clsx('Game', classes.root)}>
        <Drawer open={drawerState.open} toggle={toggleDrawer} />
        <HideOnScroll>
          <Box className={classes.topBox}>
            <Container maxWidth="sm">
              <Box display="flex" justifyContent="center">
                <Fab
                  color="secondary"
                  aria-label={t(`${NAME}.toggleDrawer`)}
                  className={classes.fab}
                  onClick={toggleDrawer(true)}
                  onKeyPress={toggleDrawer(true)}
                >
                  <MenuIcon />
                </Fab>
              </Box>
            </Container>
          </Box>
        </HideOnScroll>
        <Container maxWidth="sm">
          <Story
            dispatch={dispatch}
            history={history}
            nodeComponent={CardElement}
            tree={root}
          />
        </Container>
        <AppBar position="fixed" className={classes.appBar} elevation={4}>
          <Navigation rootPath="/play" className={classes.navigation} />
        </AppBar>
      </div>
    </SnackbarProvider>
  );
}

Play.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Play);
