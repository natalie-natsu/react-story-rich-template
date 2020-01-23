import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import AllowAudio from 'components/AllowAudio';

import { resetHistory } from '@react-story-rich/core/reducers/history';

import Language from './Inputs/Language';
import Audio from './Inputs/Audio';
import DarkMode from './Inputs/DarkMode';
import Hints from './Inputs/Hints';
import TableTopMode from './Inputs/TableTopMode';
import MusicVolume from './MusicVolume';
import SoundVolume from './Inputs/SoundVolume';
import DialogVolume from './DialogVolume';

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(3),
  },
  listItem: {
    paddingBottom: theme.spacing(3),
  },
  allowAudio: {
    marginTop: theme.spacing(2),
  },
}));

const NAME = 'Settings';
function Settings({ allowAudio, dispatch }) {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation('UI');
  const { enqueueSnackbar } = useSnackbar();

  const referrer = useMemo(
    () => new URLSearchParams(location.search).get('referrer') || '',
    [location.search],
  );

  const handleResetHistory = useCallback(() => {
    dispatch(resetHistory());
    enqueueSnackbar(t(`${NAME}.inGame.resetHistory.success`), { variant: 'warning', preventDuplicate: true });
  }, [dispatch, enqueueSnackbar, t]);

  return (
    <Fade in className="Settings">
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h3"
          color="textPrimary"
          align="center"
        >
          {t(`${NAME}.title`)}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          align="center"
          gutterBottom
        >
          {t(`${NAME}.subheader`)}
        </Typography>
        <Card className={classes.section}>
          <CardHeader title={t(`${NAME}.text.title`)} subheader={t(`${NAME}.text.subheader`)} />
          <List disablePadding>
            <ListItem className={classes.listItem} divider>
              <Language displayHelperText fullWidth />
            </ListItem>
            <ListItem className={classes.listItem} divider><DarkMode displayHelperText /></ListItem>
          </List>
        </Card>
        <Card className={classes.section}>
          <CardHeader title={t(`${NAME}.volume.title`)} subheader={t(`${NAME}.volume.subheader`)} />
          <List disablePadding>
            <ListItem divider><MusicVolume /></ListItem>
            <ListItem divider><SoundVolume /></ListItem>
            <ListItem divider><DialogVolume /></ListItem>
            {allowAudio ? (
              <ListItem className={classes.listItem} divider><Audio displayHelperText /></ListItem>
            ) : (
              <ListItem className={classes.listItem} divider>
                <AllowAudio className={classes.allowAudio} />
              </ListItem>
            )}
          </List>
        </Card>
        <Card className={classes.section}>
          <CardHeader title={t(`${NAME}.inGame.title`)} subheader={t(`${NAME}.inGame.subheader`)} />
          <List disablePadding>
            <ListItem className={classes.listItem} divider><Hints displayHelperText /></ListItem>
            <ListItem className={classes.listItem}><TableTopMode displayHelperText /></ListItem>
            <ListItem className={classes.listItem}>
              <Alert
                severity="warning"
                variant="outlined"
                action={(
                  <Button color="inherit" size="small" onClick={handleResetHistory}>
                    {t(`${NAME}.inGame.resetHistory.action`)}
                  </Button>
                )}
              >
                {t(`${NAME}.inGame.resetHistory.text`)}
              </Alert>
            </ListItem>
          </List>
        </Card>
        <Button
          className={classes.section}
          component={Link}
          to={`/${referrer}`}
          variant="outlined"
          color="default"
          fullWidth
        >
          {t(`${NAME}.goBack`)}
        </Button>
      </Container>
    </Fade>
  );
}

Settings.propTypes = {
  allowAudio: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({ allowAudio: state.allowAudio }))(Settings);
