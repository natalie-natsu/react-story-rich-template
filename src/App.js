import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import Play from 'components/Play';
import Settings from 'components/Settings';
import Credits from 'components/Credits';
import TitleScreen from 'components/TitleScreen';

import usePizzicato from 'hooks/usePizzicato';
import useVolume from 'hooks/useVolume';

import musicPath from './app.mp3';

function App({ settings }) {
  const pizzicato = usePizzicato({ loop: true, path: musicPath }, () => pizzicato.play());
  useVolume(pizzicato, { audio: settings.audio, volume: settings.musicVolume });

  return (
    <Router>
      <Layout dark={settings.darkMode}>
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
      </Layout>
    </Router>
  );
}

App.propTypes = {
  settings: PropTypes.shape({
    audio: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    musicVolume: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect((state) => ({ settings: state.settings }))(App);
