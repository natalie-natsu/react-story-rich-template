import { useEffect } from 'react';
import { updateLayout } from 'store/layout';

const useBackgroundImage = (path, dispatch, clear = true) => useEffect(() => {
  dispatch(updateLayout({ backgroundImage: path }));

  return () => {
    if (clear === true) {
      dispatch(updateLayout({ backgroundImage: '' }));
    }
  };
}, [path, dispatch, clear]);

export default useBackgroundImage;
