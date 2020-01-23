import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Play from 'components/Play';
import Settings from 'components/Settings';
import Credits from 'components/Credits';
import TitleScreen from 'components/TitleScreen';

import usePizzicato from 'hooks/usePizzicato';
import usePizzicatoAutoPlay from 'hooks/usePizzicatoAutoPlay';
import useVolume from 'hooks/useVolume';

import musicPath from './app.mp3';

function App({ settings, allowAudio }) {
  const [pizzicato, pizzicatoState] = usePizzicato({ loop: true, path: musicPath });
  useVolume(pizzicato, { audio: settings.audio, volume: settings.musicVolume });
  usePizzicatoAutoPlay(allowAudio, pizzicato, pizzicatoState);

  return (
    <Router>
      <Switch>
        <Route path="/play">
          <Play music={pizzicato} />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/credits">
          <Credits />
        </Route>
        <Route path="/">
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
