import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import { recipeList, ingredientList } from '../propTypes';
import CreateRecipeForm from '../Recipe/CreateRecipeForm';
import CreateIngredientForm from '../Ingredient/CreateIngredientForm';
import CreateTipForm from '../Tip/CreateTipForm';
import { foodActions } from '../../../redux/food';

class Dashboard extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if ((prevState.showRecipeForm && nextProps.recipeRequestStatus) ||
      (prevState.showIngredientForm && nextProps.ingredientRequestStatus)) {
      return {
        showRecipeForm: false,
        showIngredientForm: false,
        showTipForm: false,
      };
    }
    return null;
  }
  constructor() {
    super();
    this.state = {
      showRecipeForm: false,
      showIngredientForm: false,
      showTipForm: false,
    };
    this.submitRecipe = this.submitRecipe.bind(this);
    this.submitIngredient = this.submitIngredient.bind(this);
  }
  componentDidMount() {
    this.props.getRecipeList();
    this.props.getIngredientList();
  }
  submitRecipe(recipe) {
    this.props.submitRecipe(recipe);
  }
  submitIngredient(ingredient) {
    this.props.submitIngredient(ingredient);
  }
  submitTip(tip) {
    this.props.submitTip(tip);
  }
  renderTableRow() {
    return this.props.recipeList.map(recipe => (
      <Table.Row key={recipe.id}>
        <Table.Cell>{recipe.name}</Table.Cell>
        <Table.Cell>{recipe.category}</Table.Cell>
        <Table.Cell>{recipe.prepTime}</Table.Cell>
      </Table.Row>
    ));
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={() => { this.setState({ showRecipeForm: true }); }}>Add Recipe</Button>
        <Button onClick={() => { this.setState({ showIngredientForm: true }); }}>Add Ingredient</Button>
        <Button onClick={() => { this.setState({ showTipForm: true }); }}>Add Tip</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderTableRow()}
          </Table.Body>
        </Table>
        <CreateRecipeForm
          open={this.state.showRecipeForm}
          ingredientList={this.props.ingredientList}
          onSubmit={this.submitRecipe}
          onClose={() => { this.setState({ showRecipeForm: false }); }}
        />
        <CreateIngredientForm
          open={this.state.showIngredientForm}
          onSubmit={this.submitIngredient}
          onClose={() => { this.setState({ showIngredientForm: false }); }}
        />
        <CreateTipForm
          open={this.state.showTipForm}
          onSubmit={this.submitTip}
          onClose={() => { this.setState({ showTipForm: false }); }}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  recipeList: state.food.recipe.recipeList,
  recipeRequestStatus: state.food.recipe.successful,
  ingredientList: state.food.ingredient.ingredientList,
  ingredientRequestStatus: state.food.ingredient.successful,
});
const mapDispatchToProps = dispatch => ({
  submitRecipe: recipe => dispatch(foodActions.submitRecipe(recipe)),
  getRecipeList: () => dispatch(foodActions.getRecipeList()),
  submitIngredient: recipe => dispatch(foodActions.submitIngredient(recipe)),
  getIngredientList: () => dispatch(foodActions.getIngredientList()),
  submitTip: tip => dispatch(foodActions.submitTip(tip)),
  getTipList: () => dispatch(foodActions.getTipList()),
});
Dashboard.propTypes = {
  recipeList,
  ingredientList,
  submitRecipe: PropTypes.func,
  getRecipeList: PropTypes.func,
  submitIngredient: PropTypes.func,
  getIngredientList: PropTypes.func,
  submitTip: PropTypes.func,
  getTipList: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
