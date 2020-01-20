import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import Audio from './Inputs/Audio';
import DarkMode from './Inputs/DarkMode';
import Hints from './Inputs/Hints';
import TableTopMode from './Inputs/TableTopMode';

import MusicVolume from './MusicVolume';
import SoundVolume from './Inputs/SoundVolume';
import DialogVolume from './DialogVolume';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(3),
  },
  listItem: {
    paddingBottom: theme.spacing(3),
  },
  goBack: {
    marginTop: theme.spacing(3),
  },
}));

const NAME = 'Settings';
function Settings() {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation('UI');

  const referrer = useMemo(
    () => new URLSearchParams(location.search).get('referrer') || '',
    [location.search],
  );

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
        <Card className={classes.card}>
          <CardHeader title={t(`${NAME}.inGame.title`)} subheader={t(`${NAME}.inGame.subheader`)} />
          <List disablePadding>
            <ListItem className={classes.listItem} divider><Audio displayHelperText /></ListItem>
            <ListItem className={classes.listItem} divider><DarkMode displayHelperText /></ListItem>
            <ListItem className={classes.listItem} divider><Hints displayHelperText /></ListItem>
            <ListItem className={classes.listItem}><TableTopMode displayHelperText /></ListItem>
          </List>
        </Card>
        <Card className={classes.card}>
          <CardHeader title={t(`${NAME}.volume.title`)} subheader={t(`${NAME}.volume.subheader`)} />
          <List disablePadding>
            <ListItem divider><MusicVolume /></ListItem>
            <ListItem divider><SoundVolume /></ListItem>
            <ListItem divider><DialogVolume /></ListItem>
          </List>
        </Card>
        <Button
          className={classes.goBack}
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

export default Settings;
