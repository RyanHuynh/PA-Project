import React from 'react';
import PropTypes from 'prop-types';

import { TextButton } from './Buttons';
import DropdownMenu from './DropdownMenu';

// Styles
import './FilterSortBy.scss';

const FilterSortBy = props => (
  <div className="filter-sort">
    <div className="filter-sort-options">
      <DropdownMenu
        className="filterby"
        label="Filter by:"
        value={props.filterValue}
        onChange={props.filterOnChange}
        options={props.filterDropdownOptions || [
          { key: 'custom', text: 'Custom', value: 'custom' },
          { key: 'all', text: 'Show All', value: 'all' },
          { key: 'auto', text: 'Auto', value: 'auto' },
        ]}
      />
      <TextButton
        className={`edit-filter-button transparent ${(props.filterValue === 'auto' || props.filterValue === 'all') ? 'hidden' : ''}`}
        onClick={props.filterEditBtnOnClick}
      >Edit
      </TextButton>
      <DropdownMenu
        className="sortby"
        label="Sort By:"
        value={props.sortValue}
        onChange={props.sortOnChange}
        options={props.sortDropdownOptions}
      />
      {props.extraOptions}
    </div>
    <div className="filter-labels">
      {props.filterLabels}
    </div>
  </div>
);

FilterSortBy.propTypes = {
  filterValue: PropTypes.string,
  filterOnChange: PropTypes.func,
  filterDropdownOptions: PropTypes.arrayOf(PropTypes.object),
  filterEditBtnOnClick: PropTypes.func,
  filterLabels: PropTypes.arrayOf(PropTypes.object),
  sortValue: PropTypes.string,
  sortOnChange: PropTypes.func,
  sortDropdownOptions: PropTypes.arrayOf(PropTypes.object),
  extraOptions: PropTypes.node,
};

export default FilterSortBy;
