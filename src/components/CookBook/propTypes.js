import { arrayOf, shape, string, number } from 'prop-types';

export const ingredientType = shape({
  id: number,
  name: string,
  category: string,
  info: string,
});

export const recipeType = shape({
  id: number,
  name: string,
  category: string,
  prepTime: number,
  ingredients: arrayOf({
    id: number,
    amount: number,
    unit: string,
  }),
  steps: string,
  info: string,
});

export const recipeListType = arrayOf(recipeType);
export const ingredientListType = arrayOf(ingredientType);
