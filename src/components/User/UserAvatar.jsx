import React, { Component } from 'react';
import { Popup, Menu, Icon } from 'semantic-ui-react';
import Settings from './Settings';

class UserAvatar extends Component {
  constructor() {
    super();
    this.state = {
      showSetting: false,
      showAvatarMenu: false,
    };
    this.showSetting = this.showSetting.bind(this);
    this.hideSetting = this.hideSetting.bind(this);
  }
  showSetting() {
    this.setState({
      showSetting: true,
      showAvatarMenu: false,
    });
  }
  hideSetting() {
    this.setState({
      showSetting: false,
    });
  }
  render() {
    const { showAvatarMenu, showSetting } = this.state;
    return (
      <React.Fragment>
        <Popup
          id="user-avatar"
          on="click"
          position="bottom right"
          open={showAvatarMenu}
          trigger={<Icon name="user" className="pointer" size="big" inverted onClick={() => { this.setState({ showAvatarMenu: true }); }} />}
        >
          <Menu borderless vertical>
            <Menu.Item onClick={this.showSetting}>
              Setting
            </Menu.Item>
          </Menu>
        </Popup>
        <Settings show={showSetting} onClose={this.hideSetting} />
      </React.Fragment>
    );
  }
}

export default UserAvatar;
