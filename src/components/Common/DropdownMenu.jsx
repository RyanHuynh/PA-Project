import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Components
import ArrowDropDown from '../../assets/img/ArrowDropDown';

// Styles
import './DropdownMenu.scss';

const DropdownMenu = ({
  className,
  label,
  labelClassName,
  options,
  value,
  onChange,
  dropdown,
}) => (
  <div className={(className) ? `rs-dropdown-menu ${className}` : 'rs-dropdown-menu'}>
    {label && <span className={`rs-dropdown-label ${labelClassName || ''}`}>{label}</span>}
    <Dropdown
      value={value}
      onChange={onChange}
      icon={(<ArrowDropDown />)}
      options={options}
      scrolling
      {...dropdown}
    />
  </div>
);

DropdownMenu.propTypes = {
  label: PropTypes.node,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.bool,
    ]),
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.bool,
  ]),
  dropdown: PropTypes.shape({}),
};

export default DropdownMenu;
