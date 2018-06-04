import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button, Label } from 'semantic-ui-react';
import { ingredientList } from '../propTypes';
import DragModal from '../../Common/DragModal';
import {
  unitOptions,
  getNameForUnitType,
  getNameForIngredientId,
} from '../../Common/CookBookUtil';

class CreateRecipeForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
      ingredients: [],
      amountInput: '',
      unitInput: '',
      ingredientInput: '',
    };
    this.submitRecipe = this.submitRecipe.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
  }
  submitRecipe() {
    this.props.onSubmit(this.state);
  }
  addIngredient() {
    const {
      ingredients,
      amountInput,
      unitInput,
      ingredientInput,
    } = this.state;
    ingredients.push({
      id: ingredientInput,
      amount: amountInput,
      unit: unitInput,
    });
    this.setState({
      ingredients,
      amountInput: '',
      ingredientInput: '',
      unitInput: '',
    });
  }
  renderIngredientList() {
    const { amountInput, unitInput, ingredientInput } = this.state;
    const ingredients = this.state.ingredients.map(ingredient => (
      <div key={ingredient.id}>
        {`_ ${ingredient.amount} ${getNameForUnitType(ingredient.unit)} ${getNameForIngredientId(this.props.ingredientList, ingredient.id)}`}
      </div>
    ));
    return (
      <React.Fragment>
        <Form.Group>
          <Form.Field>
            <label>Ingredients</label>
          </Form.Field>
          {ingredients}
        </Form.Group>
        <Form.Group inline widths="equal">
          <Form.Input
            value={amountInput}
            onChange={(e) => { const val = parseInt(e.target.value, 10); this.setState({ amountInput: isNaN(val) ? "" : val }); }}
            placeholder="Enter Amount"
            width={3}
          />
          <Form.Dropdown
            selection
            search
            placeholder="Select Unit"
            width={3}
            value={unitInput}
            options={unitOptions}
            onChange={(e, data) => { this.setState({ unitInput: data.value }); }}
          />
          <Form.Dropdown
            ref={this.ingredientIdRef}
            selection
            search
            width={7}
            placeholder="Select Ingredient's Name"
            value={ingredientInput}
            options={this.props.ingredientList.map(ingredient => ({ text: ingredient.name, value: ingredient.id }))}
            onChange={(e, data) => { this.setState({ ingredientInput: data.value }); }}
          />
          <Form.Button
            width={3}
            onClick={this.addIngredient}
            disabled={amountInput === '' || unitInput === '' || ingredientInput === ''}
          >
            Add
          </Form.Button>
        </Form.Group>
      </React.Fragment>
    );
  }
  render() {
    const { name } = this.state;
    return (
      <DragModal
        open={this.props.open}
        header="Add New Recipe"
        dimmer
        size="small"
      >
        <Modal.Content>
          <Form>
            <Form.Input
              label="Name"
              defaultValue={name}
              onBlur={(e) => { this.setState({ name: e.target.value }); }}
              placeholder="Enter Recipe's Name"
            />
            <Form.Dropdown
              selection
              label="Category"
              placeholder="Select Category"
              onChange={(e, data) => { this.setState({ category: data.value }); }}
              options={this.categoryOptions}
            />
            {this.renderIngredientList()}
          </Form>
        </Modal.Content>
        <footer className="button-group">
          <Button className="dark" onClick={this.submitRecipe}>
            Submit
          </Button>
          <Button onClick={this.props.onClose}>
            Cancel
          </Button>
        </footer>
      </DragModal>
    );
  }
}
CreateRecipeForm.prototype.categoryOptions = [
  { text: 'Breakfast', value: 'BREAKFAST' },
  { text: 'Dessert', value: 'DESSERT' },
  { text: 'Meal', value: 'MEAL' },
  { text: 'Sauce', value: 'SAUCE' },
];
CreateRecipeForm.propTypes = {
  ingredientList,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};
export default CreateRecipeForm;
