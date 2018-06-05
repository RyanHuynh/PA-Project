import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import {
  cookbookActions,
  SUBMIT_RECIPE_REQUESTING,
  SUBMIT_RECIPE_SUCCESS,
  GET_RECIPE_LIST_REQUESTING,
  SUBMIT_INGREDIENT_SUCCESS,
  SUBMIT_INGREDIENT_REQUESTING,
  GET_INGREDIENT_LIST_REQUESTING,
  SUBMIT_TIP_SUCCESS,
  SUBMIT_TIP_REQUESTING,
  GET_TIP_LIST_REQUESTING,
} from './index';

import CookBookService from '../../services/cookbookService';

function* submitRecipe(action) {
  const response = yield call(CookBookService.submitRecipe, action.recipe);
  if (response.success) {
    yield put({ type: SUBMIT_RECIPE_SUCCESS });
    yield put(cookbookActions.getRecipeList());
  }
}
function* submitRecipeWatcher() {
  yield takeLatest(SUBMIT_RECIPE_REQUESTING, submitRecipe);
}

function* getRecipeList() {
  const responses = yield call(CookBookService.getRecipeList);
  yield put(cookbookActions.setRecipeList(responses));
}
function* getRecipeListWatcher() {
  yield takeLatest(GET_RECIPE_LIST_REQUESTING, getRecipeList);
}

function* submitIngredient(action) {
  const response = yield call(CookBookService.submitIngredient, action.ingredient);
  if (response.data.success) {
    yield put({ type: SUBMIT_INGREDIENT_SUCCESS });
    yield put(cookbookActions.getIngredientList());
  }
}
function* submitIngredidentWatcher() {
  yield takeLatest(SUBMIT_INGREDIENT_REQUESTING, submitIngredient);
}

function* getIngredidentList() {
  const response = yield call(CookBookService.getIngredientList);
  if (response.data.success) {
    yield put(cookbookActions.setIngredientList(response.data.list));
  }
}
function* getIngredientListWatcher() {
  yield takeLatest(GET_INGREDIENT_LIST_REQUESTING, getIngredidentList);
}

function* submitTip(action) {
  const response = yield call(CookBookService.submitTip, action.tip);
  if (response.success) {
    yield put({ type: SUBMIT_TIP_SUCCESS });
    yield put(cookbookActions.getTipList());
  }
}
function* submitTipWatcher() {
  yield takeLatest(SUBMIT_TIP_REQUESTING, submitTip);
}

function* getTipList() {
  const responses = yield call(CookBookService.getTipList);
  yield put(cookbookActions.setTipList(responses));
}
function* getTipListWatcher() {
  yield takeLatest(GET_TIP_LIST_REQUESTING, getTipList);
}
const cookbookSagas = [
  getRecipeListWatcher(),
  submitRecipeWatcher(),
  getIngredientListWatcher(),
  submitIngredidentWatcher(),
  getTipListWatcher(),
  submitTipWatcher(),
];
export default cookbookSagas;
