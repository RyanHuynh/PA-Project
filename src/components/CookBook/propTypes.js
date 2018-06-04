import { arrayOf, shape, string, number } from 'prop-types';

export const ingredient = shape({
  id: number,
  name: string,
  category: string,
  info: string,
});

export const recipe = shape({
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

export const recipeList = arrayOf(recipe);
export const ingredientList = arrayOf(ingredient);
