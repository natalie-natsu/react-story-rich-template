import createReducer from '../createReducer';

// ACTIONS
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const updateSettings = (settings) => ({ type: UPDATE_SETTINGS, settings });

// REDUCER
export default createReducer({
  // In game
  audio: false,
  darkMode: true,
  hints: true,
  qte: true,
  tableTopMode: false,
  // Volume
  dialogVolume: 75,
  musicVolume: 30,
  soundVolume: 50,
}, {
  [UPDATE_SETTINGS]: (state, { settings }) => ({ ...state, ...settings }),
});
