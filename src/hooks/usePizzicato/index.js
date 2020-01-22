import { useEffect, useState } from 'react';
import Pizzicato from 'pizzicato';

const usePizzicato = (options, onLoaded, source = 'file') => {
  const [sound] = useState(() => (
    new Pizzicato.Sound({ source, options }, onLoaded)
  ));

  useEffect(() => () => sound.stop(), [sound]);

  return sound;
};

export default usePizzicato;
