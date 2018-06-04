import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import Planner from './Planner/Planner';
import CookBook from './CookBook/Dashboard/Dashboard';
import UserAvatar from './User/UserAvatar';

const App = () => (
  <Router>
    <React.Fragment>
      <Menu id="a-nav-bar">
        <Menu.Item>
          <NavLink activeClassName="is-active" to="/p">Plan</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink activeClassName="is-active" to="/f">Cook Book</NavLink>
        </Menu.Item>
        <Menu.Item position="right">
          <UserAvatar />
        </Menu.Item>
      </Menu>
      <Route path="/p" component={Planner} />
      <Route path="/f" component={CookBook} />
    </React.Fragment>
  </Router>
);
export default App;
