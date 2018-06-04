import axios from 'axios';

const RList = [{ id: 1, name: 'aaaa' }];
let RCounter = 1;
const IList = [{ id: 1, name: 'aaaa' }];
let ICounter = 1;
const TList = [{ id: 1, name: 'aaaa' }];
let TCounter = 1;
export default class CookBookService {
  static getRecipeList() {
    return [...RList];
  }

  static submitRecipe(recipe) {
    RList.push({ ...recipe, id: ++RCounter });
    return {
      success: true,
    };
  }

  static getIngredientList() {
    return [...IList];
  }

  static submitIngredient(ingredient) {
    IList.push({ ...ingredient, id: ++ICounter });
    return {
      success: true,
    };
  }

  static getTipList() {
    return [...IList];
  }

  static submitTip(tip) {
    TList.push({ ...tip, id: ++TCounter });
    return {
      success: true,
    };
  }
}
