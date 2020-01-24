import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import usePizzicato from 'hooks/usePizzicato';
import usePizzicatoAutoPlay from 'hooks/usePizzicatoAutoPlay';
import useVolume from 'hooks/useVolume';

import Play from 'components/Play';
import Settings from 'components/Settings';
import Credits from 'components/Credits';
import TitleScreen from 'components/TitleScreen';
import ScrollToTop from 'components/ScrollToTop';

import musicPath from './app.mp3';

const musicName = 'Freedom (Epic Fantasy) by lukiaffe';

function App({ settings, allowAudio }) {
  const [pizzicato, pizzicatoState] = usePizzicato({ loop: true, path: musicPath });
  useVolume(pizzicato, { audio: settings.audio, volume: settings.musicVolume });
  usePizzicatoAutoPlay(allowAudio, pizzicato, pizzicatoState);

  const { t } = useTranslation('UI');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (pizzicatoState.isPlaying) {
      enqueueSnackbar(t(`App.nowPlaying`, { name: musicName }));
    }
  }, [enqueueSnackbar, pizzicatoState.isPlaying, t]);

  return (
    <Router>
      <Switch>
        <Route path="/play">
          <Play music={pizzicato} />
        </Route>
        <Route path="/settings">
          <ScrollToTop />
          <Settings />
        </Route>
        <Route path="/credits">
          <Credits />
        </Route>
        <Route path="/">
          <ScrollToTop />
          <TitleScreen />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  allowAudio: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    audio: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    musicVolume: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect((state) => ({
  allowAudio: state.allowAudio,
  settings: state.settings,
}))(App);
