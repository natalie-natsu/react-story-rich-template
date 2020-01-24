import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const NAME = 'ScrollToBottom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100vw',
    zIndex: 1,
    top: theme.spacing(2),
  },
}));

function ScrollToBottom({ targetRef, history }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const scroll = useScrollTrigger({ disableHysteresis: true });
  const scrollDown = useScrollTrigger();
  const scrollUp = scroll && !scrollDown;

  const scrollToBottom = useCallback((behavior) => {
    window.scrollTo({
      top: targetRef.current.offsetTop + targetRef.current.offsetHeight,
      behavior,
    });
  }, [targetRef]);

  useEffect(scrollToBottom, [history]);

  return (
    <Slide appear={false} direction="down" in={scrollUp}>
      <Box className={classes.root}>
        <Container maxWidth="sm">
          <Box display="flex" justifyContent="center">
            <Fab
              color="secondary"
              aria-label={t(`${NAME}.goDown`)}
              onClick={() => scrollToBottom('smooth')}
            >
              <KeyboardArrowDownIcon />
            </Fab>
          </Box>
        </Container>
      </Box>
    </Slide>
  );
}

ScrollToBottom.propTypes = {
  history: PropTypes.array.isRequired,
  targetRef: PropTypes.PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

export default connect((state) => ({ history: state.history }))(ScrollToBottom);
