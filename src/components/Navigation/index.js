import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, matchPath } from 'react-router-dom';

import clsx from 'clsx';
import findIndex from 'lodash/findIndex';

import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import PeopleIcon from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/Inbox';
import BookIcon from '@material-ui/icons/Book';
import MenuIcon from '@material-ui/icons/Menu';

const NAME = 'Navigation';

const useStyles = makeStyles(() => ({
  disabled: {
    opacity: '0.2',
  },
}));

function Navigation({ icons, onMenuClick, paths, rootPath, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const { t } = useTranslation('UI');

  const location = useLocation();

  const getLabel = useCallback((key) => t(`${NAME}.${key}`), [t]);

  const value = useMemo(() => findIndex(paths, (path) => !!matchPath(location.pathname, {
    path: `${rootPath}/${path}`,
  })), [location.pathname, paths, rootPath]);

  return (
    <>
      <BottomNavigation showLabels value={value} {...rest}>
        {paths.map((path) => {
          const label = getLabel(path);
          const Icon = icons[path];
          const disabled = path !== 'journal'; // For the demo

          return (
            <BottomNavigationAction
              className={clsx({ [classes.disabled]: disabled })}
              disabled={disabled}
              component={Link}
              key={`${NAME}.${path}`}
              label={label}
              icon={<Icon />}
              to={`${rootPath}/${path}`}
            />
          );
        })}
        {(onMenuClick && matches) ? (
          <BottomNavigationAction
            label={t(`${NAME}.menu`)}
            icon={<MenuIcon />}
            onClick={onMenuClick}
          />
        ) : null}
      </BottomNavigation>
    </>
  );
}

Navigation.propTypes = {
  icons: PropTypes.objectOf(PropTypes.object),
  onMenuClick: PropTypes.func,
  paths: PropTypes.arrayOf(PropTypes.string),
  rootPath: PropTypes.string,
};

Navigation.defaultProps = {
  icons: { characters: PeopleIcon, inventory: InboxIcon, journal: BookIcon },
  onMenuClick: null,
  paths: ['characters', 'inventory', 'journal'],
  rootPath: '/',
};

export default Navigation;
