import { combineReducers } from 'redux';
import cookbookReducers from './cookbook';

const rootReducer = combineReducers({
  cookbook: cookbookReducers,
});

export default rootReducer;
