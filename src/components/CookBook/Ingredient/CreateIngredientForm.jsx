import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Tab, Modal, Button } from 'semantic-ui-react';
import DragModal from '../../Common/DragModal';

const CategoryOptions = [
  { text: 'Condiment', value: 'CONDIMENT' },
  { text: 'Meat', value: 'MEAT' },
  { text: 'Veggie', value: 'VEGGIE' },
];
class CreateIngredientForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      alias: '',
      category: '',
      description: '',
      where: '',
    };
    this.submitIngredient = this.submitIngredient.bind(this);
  }
  submitIngredient() {
    this.props.onSubmit(this.state);
  }
  renderImageUploader() {
    return (
      <p>Image Uploader</p>
    )
  }  
  renderMainPanel() {
    const panes = [
      { menuItem: 'Info', render: () => <Tab.Pane attached={false}>{this.renderInfo()}</Tab.Pane> },
      { menuItem: 'Nutrition Fact', render: () => <Tab.Pane attached={false}>{this.renderNutrition()}</Tab.Pane> },
    ];
    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    );
  }
  renderInfo() {
    const {
      name,
      alias,
      category,
      description,
      where,
    } = this.state;
    return (
      <Form>
        <Form.Input
          label="Name"
          value={name}
          onChange={(e) => { this.setState({ name: e.target.value }); }}
        />
        <Form.Input
          label="Alias"
          value={alias}
          onChange={(e) => { this.setState({ alias: e.target.value }); }}
        />
        <Form.Dropdown
          selection
          value={category}
          label="Category"
          placeholder="Select Category"
          onChange={(e, data) => { this.setState({ category: data.value }); }}
          options={CategoryOptions}
        />
        <Form.TextArea
          label="Description"
          value={description}
          rows={5}
          onChange={(e) => { this.setState({ description: e.target.value }); }}
        />
        <Form.Input
          label="Where To Buy"
          value={where}
          onChange={(e) => { this.setState({ where: e.target.value }); }}
        />
      </Form>
    );
  }
  renderNutrition() {
    return (
      <p>TO DO</p>
    )
  }
  render() {
    return (
      <DragModal
        open
        header="Add New Ingredient"
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
          <Button className="dark" onClick={this.submitIngredient}>
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
CreateIngredientForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default CreateIngredientForm;
