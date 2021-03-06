import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Input, Form, Button, Icon } from 'semantic-ui-react';
import { recipeList, ingredientList } from '../propTypes';
import SearchMagnGlass from '../../../assets/img/SearchMagnGlass';
import CreateRecipeForm from '../Recipe/CreateRecipeForm';
import CreateIngredientForm from '../Ingredient/CreateIngredientForm';
import CreateTipForm from '../Tip/CreateTipForm';
import { cookbookActions } from '../../../redux/cookbook';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      showRecipeForm: false,
      showIngredientForm: false,
      showTipForm: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch() {

  }
  componentDidMount() {
    this.props.getRecipeList();
    this.props.getIngredientList();
    this.props.getTipList();
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
  render() {
    return (
      <div id="f-dashboard">
        <Menu>
          <Menu.Item
            className="search-bar"
          >
            <Input
              icon={<SearchMagnGlass />}
              iconPosition="left"
              placeholder="Search"
              onChange={this.handleSearch}
            />
          </Menu.Item>
          <Menu.Item>
            <Form>
              <Form.Group inline>
                <Form.Field>
                  <label>Show:</label>
                </Form.Field>
                <Form.Checkbox
                  label="Recipe"
                />
                <Form.Checkbox
                  label="Ingredient"
                />
                <Form.Checkbox
                  label="Tip"
                />
              </Form.Group>
            </Form>
          </Menu.Item>
          <Menu.Item position="right">
            <Form>
              <Form.Group inline>                
                <Button icon onClick={() => { this.setState({ showRecipeForm: true }); }}><Icon name='world' /></Button>
                <Button icon onClick={() => { this.setState({ showIngredientForm: true }); }}><Icon name='world' /></Button>
                <Button icon onClick={() => { this.setState({ showTipForm: true }); }}><Icon name='world' /></Button>
              </Form.Group>
            </Form>
          </Menu.Item>
        </Menu>
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipeList: state.cookbook.recipe.recipeList,
  recipeRequestStatus: state.cookbook.recipe.successful,
  ingredientList: state.cookbook.ingredient.ingredientList,
  ingredientRequestStatus: state.cookbook.ingredient.successful,
});
const mapDispatchToProps = dispatch => ({
  submitRecipe: recipe => dispatch(cookbookActions.submitRecipe(recipe)),
  getRecipeList: () => dispatch(cookbookActions.getRecipeList()),
  submitIngredient: recipe => dispatch(cookbookActions.submitIngredient(recipe)),
  getIngredientList: () => dispatch(cookbookActions.getIngredientList()),
  submitTip: tip => dispatch(cookbookActions.submitTip(tip)),
  getTipList: () => dispatch(cookbookActions.getTipList()),
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
