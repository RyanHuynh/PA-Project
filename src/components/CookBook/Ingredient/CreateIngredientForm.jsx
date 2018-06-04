import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'semantic-ui-react';

class CreateIngredientForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
    };
    this.submitIngredient = this.submitIngredient.bind(this);
  }
  submitIngredient() {
    this.props.onSubmit(this.state);
  }
  render() {
    const { name } = this.state;
    return (
      <Modal
        open={this.props.open}
      >
        <Modal.Header>Add New Ingredient</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Name"
              defaultValue={name}
              onBlur={(e) => { this.setState({ name: e.target.value }); }}
              placeholder="Enter Recipe's Name"
            />
            <Form.Dropdown
              fluid
              search
              selection
              label="Category"
              placeholder="Select Category"
              onChange={(e, data) => { this.setState({ category: data.value }); }}
              options={this.categoryOptions}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button onClick={this.submitIngredient}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
CreateIngredientForm.prototype.categoryOptions = [
  { text: 'Condiment', value: 'CONDIMENT' },
  { text: 'Meat', value: 'MEAT' },
  { text: 'Veggie', value: 'VEGGIE' },
];
CreateIngredientForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};
export default CreateIngredientForm;
