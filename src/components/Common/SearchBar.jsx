import React from 'react';
import { Input } from 'semantic-ui-react';

// Components
import SearchMagnGlass from './../../assets/img/SearchMagnGlass';

// Styles
import './SearchBar.scss';

const SearchBar = props => (
  <Input
    className="search-bar"
    {...props}
    icon={<SearchMagnGlass />}
    iconPosition="left"
    labelPosition="right"
  />
);

export default SearchBar;
