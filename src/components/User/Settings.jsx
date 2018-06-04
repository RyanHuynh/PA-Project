import React, { Component } from 'react';
import { Modal, Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import DragModal from '../Common/DragModal';
import { TextButton } from '../Common/Buttons';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      activeSetting: 'plan',
    };
  }
  renderSettingMenu() {
    const { activeSetting } = this.state;
    return (
      <ul id="user-setting-menu">
        <TextButton
          className={`${activeSetting === 'plan' ? 'selected' : ''}`}
          noBorderPadding
          onClick={() => { this.setState({ activeSetting: 'plan' }); }}
        >
          Plan
        </TextButton>
        <TextButton
          className={`${activeSetting === 'cookbook' ? 'selected' : ''}`}
          noBorderPadding
          onClick={() => { this.setState({ activeSetting: 'cookbook' }); }}
        >
          Cook Book
        </TextButton>
      </ul>
    );
  }
  renderSelectedSetting() {
    if (this.state.activeSetting === 'cookbook') {
      return (<div>Cook Book</div>);
    }
    return (<div>Planner</div>);
  }
  render() {
    return (
      <DragModal
        header="Settings"
        open={this.props.show}
        dimmer
      >
        <Modal.Content>
          <Grid>
            <Grid.Column width={4}>{this.renderSettingMenu()}</Grid.Column>
            <Grid.Column width={12}>{this.renderSelectedSetting()}</Grid.Column>
          </Grid>
        </Modal.Content>
        <footer className="button-group">
          <Button className="dark">Update</Button>
          <Button onClick={this.props.onClose}>Close</Button>
        </footer>
      </DragModal>
    );
  }
}
Settings.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};
export default Settings;
