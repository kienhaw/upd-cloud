import * as action_types from './constants';

const initialState = {
  home: [],
  option: {}
};

export default (state = initialState, action) => {
  const { type, data, meta } = action;
  switch (type) {
    case action_types.HOME:
      return { ...state, home: data, option: meta };

    default:
      return state;
  }
};
