/* eslint react/no-multi-comp: "off" */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popup } from 'semantic-ui-react';

import ArrowDropDown from '../../assets/img/ArrowDropDown';

import './Buttons.scss';

export const IconOnlyButton = props => (
  <Popup
    trigger={<Button disabled={!!props.disabled} className={`icon-only ${props.buttonClass || ''} ${props.noBorderPadding ? 'no-border-padding' : ''}`} onClick={props.onClick}>{props.icon || props.children}</Button>}
    content={props.description}
    className={`resolve-button button-tooltip ${props.tooltipClass || ''}`}
  />);
IconOnlyButton.propTypes = {
  buttonClass: PropTypes.string,
  icon: PropTypes.element,
  description: PropTypes.string,
  children: PropTypes.element,
  tooltipClass: PropTypes.string,
  onClick: PropTypes.func,
  noBorderPadding: PropTypes.bool,
  disabled: PropTypes.bool,
};

// eslint-disable-next-line react/prefer-stateless-function
export class IconTextButton extends Component {
  render() {
    const buttonProps = { ...this.props };
    delete buttonProps.icon;
    delete buttonProps.className;
    delete buttonProps.position;
    if (this.props.position === 'right') {
      return (<Button className={`${this.props.className || ''}`} {...buttonProps}>{this.props.children}{this.props.icon}</Button>);
    }
    return (<Button className={`${this.props.className || ''}`} {...buttonProps}>{this.props.icon}{this.props.children}</Button>);
  }
}

IconTextButton.propTypes = {
  icon: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  position: PropTypes.string,
};

export const TextButton = (props) => {
  const buttonProps = { ...props };
  delete buttonProps.icon;
  delete buttonProps.className;
  delete buttonProps.noBorderPadding;

  return (<Button className={`${props.className || ''} ${props.noBorderPadding ? 'no-border-padding' : ''}`} {...buttonProps}>{props.children}</Button>);
};

TextButton.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  noBorderPadding: PropTypes.bool,
};

// eslint-disable-next-line react/prefer-stateless-function
export class DateButton extends Component {
  render() {
    const {
      buttonClassName, onClick, value, type,
    } = this.props;
    return (
      <IconTextButton
        type={type}
        className={`${buttonClassName || ''} right-icon no-border-padding filter-button`}
        onClick={onClick}
        icon={(<ArrowDropDown />)}
      >
        {value || 'All'}
      </IconTextButton>
    );
  }
}

DateButton.propTypes = {
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  type: PropTypes.string,
};
