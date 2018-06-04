
export const unitOptions = [
  { text: 'g', value: 'GRAM' },
  { text: 'kg', value: 'KILOGRAM' },
  { text: 'oz', value: 'OUNCE' },
  { text: 'lb', value: 'POUND' },
  { text: 'tsp', value: 'TEASPOON' },
  { text: 'tbsp', value: 'TABLESPOON' },
  { text: 'fl oz', value: 'FLUIDOUNCE' },
  { text: 'cup', value: 'CUP' },
  { text: 'pt', value: 'PINT' },
  { text: 'qt', value: 'QUART' },
];

export const getNameForUnitType = unit => (
  unitOptions.filter(entry => (entry.value === unit))[0].text
);

export const getNameForIngredientId = (ingredientList, id) => (
  ingredientList.filter(entry => (entry.id === id))[0].name
);
