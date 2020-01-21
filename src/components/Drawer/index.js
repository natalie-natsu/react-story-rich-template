import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import ProjectName from 'components/ProjectName';
import Audio from 'components/Settings/Inputs/Audio';
import DarkMode from 'components/Settings/Inputs/DarkMode';
import Hints from 'components/Settings/Inputs/Hints';
import TableTopMode from 'components/Settings/Inputs/TableTopMode';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  list: {
    width: 'auto',
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
}));

const NAME = 'Drawer';

function Drawer({ open, toggle, ...rest }) {
  const classes = useStyles();
  const { t } = useTranslation('UI');

  return (
    <SwipeableDrawer
      open={open}
      onClose={toggle(false)}
      onOpen={toggle(true)}
      {...rest}
    >
      <div className={classes.list} role="presentation">
        <div className={classes.toolbar}>
          <ProjectName />
          <IconButton onClick={toggle(false)} className={classes.iconButton}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={t(`${NAME}.titleScreen`)} />
          </ListItem>
          <ListItem button component={Link} to="/settings?referrer=play">
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={t(`${NAME}.settings`)} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem><Audio /></ListItem>
          <ListItem><DarkMode /></ListItem>
          <ListItem><Hints /></ListItem>
          <ListItem><TableTopMode /></ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
}

Drawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Drawer;
