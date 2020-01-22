import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import clsx from 'clsx';

import { SnackbarProvider } from 'notistack';

import { Story, Tree } from '@react-story-rich/core';
import mapStateToProps from '@react-story-rich/core/reducers/mapStateToProps';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core//Container';

import DefaultElement from 'components/Element/Default';
import Drawer from 'components/Drawer';
import Navigation from 'components/Navigation';
import ScrollToBottom from 'components/ScrollToBottom';

import tree from 'tree';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.background.default,
    },
  },
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
}));

function Play({ dispatch, history }) {
  const ref = useRef(null);
  const classes = useStyles();

  const [drawerState, setDrawerState] = useState({ open: false });
  const toggleDrawer = useCallback((open = !drawerState.open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
    setDrawerState({ open });
  }, [drawerState.open]);

  const root = useMemo(() => new Tree(tree), []);

  return (
    <SnackbarProvider maxSnack={3}>
      <div ref={ref} className={clsx('Game', classes.root)}>
        <Drawer open={drawerState.open} toggle={toggleDrawer} />
        <ScrollToBottom targetRef={ref} />
        <Container maxWidth="sm">
          <Story
            dispatch={dispatch}
            history={history}
            nodeComponent={DefaultElement}
            tree={root}
          />
        </Container>
        <AppBar position="fixed" className={classes.appBar} elevation={4}>
          <Navigation rootPath="/play" className={classes.navigation} onMenuClick={toggleDrawer(true)} />
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
