import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from 'serviceWorker';

import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import App from 'App';
import Store from 'store';

import 'index.css';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    defaultNS: 'UI',
    whitelist: ['fr', 'en'],
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // react i18next special options (optional)
    // override if needed - omit if ok with defaults
    react: {
      // bindI18n: 'languageChanged',
      // bindI18nStore: '',
      // transEmptyNodeValue: '',
      // transSupportBasicHtmlNodes: true,
      // transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      // useSuspense: true,
    },
  });

ReactDOM.render(
  <Suspense fallback={<Backdrop open><CircularProgress color="inherit" /></Backdrop>}>
    <Store>
      <App />
    </Store>
  </Suspense>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
