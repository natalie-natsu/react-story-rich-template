import createReducer from '../createReducer';

// ACTIONS
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const updateLayout = (layout) => ({ type: UPDATE_LAYOUT, layout });

// REDUCER
export default createReducer({ backgroundImage: '' }, {
  [UPDATE_LAYOUT]: (state, { layout }) => ({ ...state, ...layout }),
});
