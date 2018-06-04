import types from './types';

const initialState = {
  requesting: false,
  successful: true,
  errors: [],
};

const planerReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};

export default planerReducer;
