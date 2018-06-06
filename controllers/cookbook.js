const Ingredient = require('../models/Ingredient');
const ESClient = require('../elasticsearch/main');

exports.saveIngredient = (req, res, next) => {
  const {
    name,
    alias,
    category,
    description,
    where,
  } = req.body;
  const ingredient = new Ingredient({
    name,
    alias,
    category,
    description,
    where,
  });

  const ingredientES = {
    index: 'cookbook',
    type: 'ingredient',
    body: {
      name,
      alias,
    },
  };
  ingredient.save((err, object) => {
    if (err) { return next(err); }
    // Add to ES
    ESClient.create({
      ...ingredientES,
      id: object.id,
    });
    return res.send({ success: true });
  });
};

exports.getIngredientList = (req, res, next) => {
  Ingredient.find({}, (err, docs) => {
    if (err) { return next(err); }
    return res.send({
      success: true,
      list: docs,
    });
  });
};
