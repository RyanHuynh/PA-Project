/* eslint-disable no-cond-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Modal,
  Button,
  Grid,
  Tab,
} from 'semantic-ui-react';
import DragModal from '../../Common/DragModal';

const UNIT_DICTIONARY = ['g'];
const ingredientRegex = /(?:^|[-+])\s*(\d+|\d+[.]\d+)\s*([a-z]+)(.*)$/gmi;
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
    this.parseIngredient = this.parseIngredient.bind(this);
  }
  submitRecipe() {
    this.props.onSubmit(this.state);
  }
  parseIngredient(e) {
    const { value } = e.target;
    const ingredients = [];
    let m;
    while ((m = ingredientRegex.exec(value)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === ingredientRegex.lastIndex) {
        ingredientRegex.lastIndex += 1;
      }
      const entry = {};
      m.forEach((match, groupIndex) => {
        if (groupIndex === 0) {
          entry.str = match;
        } else if (groupIndex === 1) {
          entry.amount = match;
        } else if (groupIndex === 2) {
          entry.unit = UNIT_DICTIONARY.indexOf(match) !== -1 ? match : 'unit';
        } else if (groupIndex === 3) {
          entry.qStr = match;
        }
      });
      ingredients.push(entry);
    }
    console.log(ingredients);
    this.setState({
      ingredients: value,
    });
  }
  renderImageUploader() {
    return (<div>Image</div>);
  }
  renderMainPanel() {
    const panes = [
      { menuItem: 'Info', render: () => <Tab.Pane attached={false}>{this.renderInfo()}</Tab.Pane> },
      { menuItem: 'Ingredients', render: () => <Tab.Pane attached={false}>{this.renderIngredients()}</Tab.Pane> },
      { menuItem: 'Steps', render: () => <Tab.Pane attached={false}>{this.renderSteps()}</Tab.Pane> },
    ];
    return (
      <Tab menu={{ text: true }} panes={panes} />
    );
  }
  renderInfo() {
    const {
      name,
      author,
      serving,
      category,
    } = this.state;
    return (
      <Form>
        <Form.Input
          label="Name"
          defaultValue={name}
          onBlur={(e) => { this.setState({ name: e.target.value }); }}
          placeholder="Enter Recipe's Name"
        />
        <Form.Input
          label="Author/Source"
          defaultValue={author}
          onBlur={(e) => { this.setState({ author: e.target.value }); }}
          placeholder="Author or Source Name"
        />
        <Form.Input
          label="Serving Size"
          defaultValue={serving}
          onBlur={(e) => { this.setState({ serving: e.target.value }); }}
        />
        <Form.Dropdown
          selection
          label="Category"
          placeholder="Select Category"
          value={category}
          onChange={(e, data) => { this.setState({ category: data.value }); }}
          options={this.categoryOptions}
        />
      </Form>
    );
  }
  renderIngredients() {
    const {
      ingredients,
    } = this.state;
    return (
      <Form>
        <Form.TextArea
          label="Ingredidents"
          rows={20}
          defaultValue={ingredients}
          onBlur={this.parseIngredient}
        />
      </Form>
    );
  }
  renderSteps() {
    const {
      steps,
    } = this.state;
    return (
      <Form>
        <Form.TextArea
          label="Steps"
          rows={20}
          defaultValue={steps}
          onBlur={(e) => { this.setState({ steps: e.target.value }); }}
        />
      </Form>
    );
  }
  render() {
    return (
      <DragModal
        open
        header="Add New Recipe"
        dimmer
        size="large"
      >
        <Modal.Content>
          <Grid>
            <Grid.Column width="6">{this.renderImageUploader()}</Grid.Column>
            <Grid.Column width="10">{this.renderMainPanel()}</Grid.Column>
          </Grid>
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
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default CreateRecipeForm;
