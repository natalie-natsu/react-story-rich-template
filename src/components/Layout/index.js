import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import themeOptions from './theme';

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
    },
  },
  root: (theme) => ({
    padding: theme.spacing(4, 0),
    width: '100%',
    minHeight: `calc(100vh - ${theme.spacing(4) * 2}px)`,
    backgroundColor: theme.palette.background.default,
  }),
});

function Layout({ children, dark }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const mode = useMemo(() => {
    let darkMode = prefersDarkMode;
    if (dark !== null) { darkMode = dark; }

    return darkMode ? 'dark' : 'light';
  }, [dark, prefersDarkMode]);

  const theme = useMemo(() => createMuiTheme(themeOptions[mode]), [mode]);

  const classes = useStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        {children}
      </div>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  /**
   * A node of your content.
   */
  children: PropTypes.node.isRequired,
  /**
   * If set to true or false, the mod will be forced to dark/light.
   * If undefined, the mod will be set by default
   * according to the browser query setting: `prefers-color-scheme`
   */
  dark: PropTypes.bool,
  /**
   * Object of Material UI theme options
   * @see {@link https://material-ui.com/customization/theming/#theming | MUI Theming documentation}
   */
  themeOptions: PropTypes.shape({ palette: PropTypes.object }),
};

Layout.defaultProps = {
  dark: null,
  themeOptions: undefined,
};

export default Layout;
