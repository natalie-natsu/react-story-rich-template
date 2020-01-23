import { useEffect } from 'react';

const usePizzicatoAutoPlay = (allowAudio, pizzicato, { isLoaded, isPlaying }) => useEffect(() => {
  if (allowAudio && isLoaded && !isPlaying) {
    pizzicato.play();
  }
}, [allowAudio, isLoaded, isPlaying, pizzicato]);

export default usePizzicatoAutoPlay;
