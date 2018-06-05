import { combineReducers } from 'redux';

// Action types
export const SUBMIT_RECIPE_REQUESTING = 'cookbook/SUBMIT_RECIPE_REQUESTING';
export const SUBMIT_RECIPE_SUCCESS = 'cookbook/SUBMIT_RECIPE_SUCCESS';
export const GET_RECIPE_LIST_REQUESTING = 'cookbook/GET_RECIPE_LIST_REQUESTING';
export const GET_RECIPE_LIST_SUCCESS = 'cookbook/GET_RECIPE_LIST_SUCCESS';
export const SUBMIT_INGREDIENT_REQUESTING = 'cookbook/SUBMIT_INGREDIENT_REQUESTING';
export const SUBMIT_INGREDIENT_SUCCESS = 'cookbook/SUBMIT_INGREDIENT_SUCCESS';
export const GET_INGREDIENT_LIST_REQUESTING = 'cookbook/GET_INGREDIENT_LIST_REQUESTING';
export const GET_INGREDIENT_LIST_SUCCESS = 'cookbook/GET_INGREDIENT_LIST_SUCCESS';
export const SUBMIT_TIP_REQUESTING = 'cookbook/SUBMIT_TIP_REQUESTING';
export const SUBMIT_TIP_SUCCESS = 'cookbook/SUBMIT_TIP_SUCCESS';
export const GET_TIP_LIST_REQUESTING = 'cookbook/GET_TIP_LIST_REQUESTING';
export const GET_TIP_LIST_SUCCESS = 'cookbook/GET_TIP_LIST_SUCCESS';

// Reducers
const recipeReducer = (state = {
  requesting: false,
  successful: true,
  errors: [],
  recipeList: [],
}, action) => {
  switch (action.type) {
    case SUBMIT_RECIPE_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
      };
    case SUBMIT_RECIPE_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
      };
    case GET_RECIPE_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
      };
    case GET_RECIPE_LIST_SUCCESS: {
      return {
        ...state,
        requesting: false,
        successful: true,
        recipeList: action.list,
      };
    }
    default:
      return state;
  }
};

const ingredientReducer = (state = {
  requesting: false,
  successful: true,
  errors: [],
  ingredientList: [],
}, action) => {
  switch (action.type) {
    case SUBMIT_INGREDIENT_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
      };
    case SUBMIT_INGREDIENT_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
      };
    case GET_INGREDIENT_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
      };
    case GET_INGREDIENT_LIST_SUCCESS: {
      return {
        ...state,
        requesting: false,
        successful: true,
        ingredientList: action.list,
      };
    }
    default:
      return state;
  }
};
const tipReducer = (state = {
  requesting: false,
  successful: true,
  errors: [],
  tipList: [],
}, action) => {
  switch (action.type) {
    case SUBMIT_TIP_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
      };
    case SUBMIT_TIP_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
      };
    case GET_TIP_LIST_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
      };
    case GET_TIP_LIST_SUCCESS: {
      return {
        ...state,
        requesting: false,
        successful: true,
        tipList: action.list,
      };
    }
    default:
      return state;
  }
};
const cookbookReducers = combineReducers({
  recipe: recipeReducer,
  ingredient: ingredientReducer,
  tip: tipReducer,
});
export default cookbookReducers;

// Actions
const submitRecipe = recipe => ({
  type: SUBMIT_RECIPE_REQUESTING,
  recipe,
});

const getRecipeList = () => ({
  type: GET_RECIPE_LIST_REQUESTING,
});

const setRecipeList = list => ({
  type: GET_RECIPE_LIST_SUCCESS,
  list,
});

const submitIngredient = ingredient => ({
  type: SUBMIT_INGREDIENT_REQUESTING,
  ingredient,
});

const getIngredientList = () => ({
  type: GET_INGREDIENT_LIST_REQUESTING,
});

const setIngredientList = list => ({
  type: GET_INGREDIENT_LIST_SUCCESS,
  list,
});

const submitTip = tip => ({
  type: SUBMIT_TIP_REQUESTING,
  tip,
});

const getTipList = () => ({
  type: GET_TIP_LIST_REQUESTING,
});

const setTipList = list => ({
  type: GET_TIP_LIST_SUCCESS,
  list,
});

export const cookbookActions = {
  submitRecipe,
  getRecipeList,
  setRecipeList,
  submitIngredient,
  getIngredientList,
  setIngredientList,
  submitTip,
  getTipList,
  setTipList,
};
