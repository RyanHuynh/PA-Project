const Ingredient = require('../models/Ingredient');

exports.saveIngredient = (req, res, next) => {
  const ingredient = new Ingredient({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    where: req.body.where,
  });

  ingredient.save((err) => {
    if (err) { return next(err); }
    return res.send({ success: true });
  });
};

exports.getIngredientList = (req, res, next) => {
  Ingredient.find({}, (err, docs) => {
    if (err) { return next(err); }
    return res.send({
      success: true,
      list: docs
    });
  });
};
