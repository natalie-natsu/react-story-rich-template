import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import Play from 'components/Play';
import Settings from 'components/Settings';
import Credits from 'components/Credits';
import TitleScreen from 'components/TitleScreen';

function App({ darkMode }) {
  return (
    <Router>
      <Layout dark={darkMode}>
        <Switch>
          <Route path="/play">
            <Play />
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
  darkMode: PropTypes.bool.isRequired,
};

export default connect((state) => ({ darkMode: state.settings.darkMode }))(App);
