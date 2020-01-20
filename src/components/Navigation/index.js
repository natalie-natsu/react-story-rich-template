import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, matchPath } from 'react-router-dom';

import findIndex from 'lodash/findIndex';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import PeopleIcon from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/Inbox';
import BookIcon from '@material-ui/icons/Book';

const NAME = 'Navigation';

function Navigation({ icons, paths, rootPath, ...rest }) {
  const { t } = useTranslation('UI');
  const location = useLocation();

  const getLabel = useCallback((key) => t(`${NAME}.${key}`), [t]);

  const value = useMemo(() => findIndex(paths, (path) => !!matchPath(location.pathname, {
    path: `${rootPath}/${path}`,
  })), [location.pathname, paths, rootPath]);

  return (
    <BottomNavigation showLabels value={value} {...rest}>
      {paths.map((path) => {
        const label = getLabel(path);
        const Icon = icons[path];

        return (
          <BottomNavigationAction
            component={Link}
            key={`${NAME}.${path}`}
            label={label}
            icon={<Icon />}
            to={`${rootPath}/${path}`}
          />
        );
      })}
    </BottomNavigation>
  );
}

Navigation.propTypes = {
  icons: PropTypes.objectOf(PropTypes.object),
  paths: PropTypes.arrayOf(PropTypes.string),
  rootPath: PropTypes.string,
};

Navigation.defaultProps = {
  icons: { characters: PeopleIcon, inventory: InboxIcon, journal: BookIcon },
  paths: ['characters', 'inventory', 'journal'],
  rootPath: '/',
};

export default Navigation;
