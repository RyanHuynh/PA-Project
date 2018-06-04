import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'semantic-ui-react';

class CreateTipForm extends Component {
  constructor() {
    super();
    this.state = {};
    this.submitTip = this.submitTip.bind(this);
  }
  submitTip() {

  }
  render() {
    return (
      <Modal
        open={this.props.open}
      >
        <Modal.Header>Add New Tip</Modal.Header>
        <Modal.Content>
          <Form>
           
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.onClose}>
            Cancel
          </Button>
          <Button onClick={this.submitTip}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

CreateTipForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
export default CreateTipForm;
