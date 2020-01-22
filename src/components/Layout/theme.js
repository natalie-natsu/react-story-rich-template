import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';

const light = {
  palette: {
    type: 'light',
    primary: deepPurple,
    secondary: teal,
  },
};

const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: deepPurple[200],
    },
    secondary: teal,
  },
};

export default { light, dark };
