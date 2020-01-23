import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import last from 'lodash/last';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SettingsIcon from '@material-ui/icons/Settings';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import CodeIcon from '@material-ui/icons/Code';

import { updateSettings } from 'store/settings';

import ProjectName from 'components/ProjectName';
import Language from 'components/Settings/Inputs/Language';
import AllowAudio from '../AllowAudio';

export const NAME = 'TitleScreen';

const WEB = true; // Change if your are using this in an application (use env)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    minHeight: `calc(100vh - ${theme.spacing(4) * 2}px)`,
  },
  card: {
    marginTop: theme.spacing(3),
  },
  action: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  language: {
    marginTop: theme.spacing(2),
    maxWidth: '160px',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '320px',
    },
  },
  playIcon: {
    backgroundColor: theme.palette.primary.main,
  },
  flexGrow: {
    flexGrow: 1,
  },
  allowAudio: {
    marginTop: theme.spacing(2),
  },
}));

function TitleScreen({ allowAudio, currentLocation, dispatch, settings }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const { t } = useTranslation('UI');

  const newGame = useMemo(() => currentLocation === 0, [currentLocation]);

  const muteIcon = useMemo(() => (
    settings.audio ? <VolumeUpIcon /> : <VolumeOffIcon />
  ), [settings.audio]);

  const darkModeIcon = useMemo(() => (
    settings.darkMode ? <Brightness4Icon /> : <Brightness7Icon />),
  [settings.darkMode]);

  const playLinkText = useMemo(() => (
    newGame ? t(`${NAME}.play`) : t(`${NAME}.keepPlaying`)
  ), [newGame, t]);

  const handleUpdateSettings = useCallback((setting, oldValue) => () => {
    dispatch(updateSettings({ [setting]: !oldValue }));
  }, [dispatch]);

  return (
    <Fade in className={classes.root}>
      <div className="TitleScreen">
        <Container maxWidth="sm">
          <ProjectName
            component="h1"
            variant="h3"
            color="textPrimary"
            align="center"
          />
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
          >
            {t(`${NAME}.subheader`)}
          </Typography>
          <AllowAudio className={classes.allowAudio} />
          <Card className={classes.card}>
            <List component="nav">
              <ListItem button component={Link} to="/play">
                <ListItemAvatar>
                  <Avatar className={classes.playIcon}>
                    <PlayArrowIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={playLinkText} />
              </ListItem>
              <ListItem button component={Link} to="/settings">
                <ListItemAvatar>
                  <Avatar>
                    <SettingsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={t(`${NAME}.settings`)} />
              </ListItem>
              <ListItem button component={Link} to="/credits">
                <ListItemAvatar>
                  <Avatar>
                    <RecentActorsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={t(`${NAME}.credits`)} />
              </ListItem>
              {!WEB && (
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      <PowerSettingsNewIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={t(`${NAME}.quit`)} />
                </ListItem>
              )}
            </List>
          </Card>
          <Box display="flex">
            <Language className={classes.language} size="small" variant="outlined" color="default" />
            <span className={classes.flexGrow} />
            {matches && (
              <IconButton
                className={classes.action}
                component="a"
                href="https://github.com/WaSa42/react-story-rich"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(`${NAME}.sources`)}
              >
                <CodeIcon />
              </IconButton>
            )}
            <IconButton
              className={classes.action}
              aria-label={t(`${NAME}.darkMode`)}
              onClick={handleUpdateSettings('darkMode', settings.darkMode)}
              onKeyPress={handleUpdateSettings('darkMode', settings.darkMode)}
            >
              {darkModeIcon}
            </IconButton>
            {allowAudio && (
              <IconButton
                className={classes.action}
                aria-label={t(`${NAME}.mute`)}
                onClick={handleUpdateSettings('audio', settings.audio)}
                onKeyPress={handleUpdateSettings('audio', settings.audio)}
              >
                {muteIcon}
              </IconButton>
            )}
          </Box>
        </Container>
      </div>
    </Fade>
  );
}

TitleScreen.propTypes = {
  allowAudio: PropTypes.bool.isRequired,
  currentLocation: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    audio: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect((state) => ({
  allowAudio: state.allowAudio,
  settings: state.settings,
  currentLocation: last(state.history).to,
}))(TitleScreen);
