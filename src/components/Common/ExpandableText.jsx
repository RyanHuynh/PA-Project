import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shave from 'shave';

// Styles
import './ExpandableText.scss';

export default class ExpandableText extends Component {
  state = {
    textTruncated: true,
    showMoreLess: false,
  };

  componentDidMount() {
    const element = document.getElementById(this.props.elemId);
    if (element) {
      const { lineHeight } = window.getComputedStyle(element);
      const maxHeight = lineHeight.slice(0, lineHeight.indexOf('px')) * this.props.lines;
      if (element.clientHeight > maxHeight && !this.state.showMoreLess) {
        shave(element, maxHeight);
        this.setState({ showMoreLess: true }); // eslint-disable-line
      }
    }
  }

  toggleText = () => {
    const element = document.getElementById(this.props.elemId);

    if (element) {
      const { lineHeight } = window.getComputedStyle(element);
      const maxHeight = lineHeight.slice(0, lineHeight.indexOf('px')) * this.props.lines;
      if (this.state.textTruncated) {
        element.textContent = this.props.content;
      } else {
        shave(element, maxHeight);
      }
      this.setState(prevState => ({ textTruncated: !prevState.textTruncated }));
    }
  }

  render() {
    return (
      <div className={`${this.props.className} expandable-text`}>
        <div className="expandable-text-content" id={this.props.elemId}>{this.props.content}</div>
        <button className="expand-button" hidden={!this.state.showMoreLess} onClick={this.toggleText}>
          {`See ${(this.state.textTruncated) ? 'more' : 'less'}`}
        </button>
      </div>
    );
  }
}

ExpandableText.propTypes = {
  className: PropTypes.string,
  elemId: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  lines: PropTypes.number.isRequired,
};
