import { useEffect, useState } from 'react';
import isFunction from 'lodash/isFunction';
import Pizzicato from 'pizzicato';

const initialState = {
  isLoaded: false,
  isPlaying: false,
  isPaused: false,
  isStopped: false,
};

const usePizzicato = (options, onLoaded, source = 'file') => {
  const [state, setState] = useState(initialState);
  const [sound] = useState(() => (
    new Pizzicato.Sound({ source, options }, () => {
      setState((prevState) => ({ ...prevState, isLoaded: true }));
      if (isFunction(onLoaded)) { onLoaded(sound); }
    })
  ));

  useEffect(() => () => sound.stop(), [sound]);

  sound.on('play', () => setState((prevState) => ({
    ...prevState,
    isPlaying: true,
    isPaused: false,
    isStopped: false,
  })));

  sound.on('pause', () => setState((prevState) => ({
    ...prevState,
    isPlaying: false,
    isPaused: true,
    isStopped: false,
  })));

  sound.on('stop', () => setState((prevState) => ({
    ...prevState,
    isPlaying: false,
    isPaused: false,
    isStopped: true,
  })));

  return [sound, state];
};

export default usePizzicato;
