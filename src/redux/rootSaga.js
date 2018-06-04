import { all } from 'redux-saga/effects';
import CookBookSagas from './cookbook/sagas';

export default function* rootSagas() {
  yield all([
    ...CookBookSagas,
  ]);
}
