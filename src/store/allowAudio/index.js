import createReducer from '../createReducer';

// ACTIONS
export const ALLOW_AUDIO = 'ALLOW_AUDIO';
export const allowAudio = () => ({ type: ALLOW_AUDIO });

// REDUCER
export default createReducer(false, {
  [ALLOW_AUDIO]: () => true,
});
