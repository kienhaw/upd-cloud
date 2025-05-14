import { combineReducers } from 'redux';
import global from 'Modules/Home/ducks/reducers';
import { DESTROY_SESSION } from 'Modules/Home/ducks/constants';

const appReducer = combineReducers({
  global
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
