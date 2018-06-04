import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Dimmer } from 'semantic-ui-react';
import { TextButton } from './Buttons';

import CheckMark from '../../assets/img/Checkmark';
import ArrowDropDown from '../../assets/img/ArrowDropDown';
import './FilterBy.scss';

export default class FilterBy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      filters: props.filters,
    };
  }

  renderFilters = () => (
    <ul className="filters">
      {this.state.filters.map(filter => (
        <li className="filter" key={`filter-${filter.group}|${filter.id}`}>
          <TextButton onClick={() => {
            this.setState({
              filters: this.state.filters.filter(stateFilter =>
                filter.group !== stateFilter.group || filter.id !== stateFilter.id),
            });
          }}
          >{`${filter.group}: ${filter.value}`}
          </TextButton>
        </li>
      ))}
    </ul>
  );

  renderFilterableItems = filterableItems => (
    filterableItems.map((filterableItem, index) => {
      const content = filterableItem.items.map((item) => {
        const isFiltered = this.state.filters.find(filter => (filter.group === filterableItem.group
          && item.id === filter.id));
        return (
          <li className={`available-filter ${isFiltered ? 'selected' : ''}`} key={`available-filter-${filterableItem.group}|${item.id}`}>
            <CheckMark />
            <TextButton
              noBorderPadding
              onClick={() => {
              if (isFiltered) {
                // remove from filters
                this.setState({
                  filters: this.state.filters.filter(filter =>
                    filter.group !== filterableItem.group || item.id !== filter.id),
                });
              } else {
                // add to filters
                this.setState({
                  filters: [
                    ...this.state.filters,
                    { group: filterableItem.group, value: item.value, id: item.id },
                  ],
                });
              }
            }}
            >{item.value}
            </TextButton>
          </li>
        );
      });
      return (
        <Fragment key={`filter-group-${filterableItem.group}`}>
          <Accordion.Title
            className={`filter-group-name ${this.state.activeIndex === index ? 'selected' : 'not-selected'}`}
            index={index}
            onClick={() => {
              let newIndex = -1;
              if (this.state.activeIndex !== index) {
                newIndex = index;
              }
              this.setState({ activeIndex: newIndex });
            }}
          ><ArrowDropDown />{filterableItem.group}
          </Accordion.Title>
          <Accordion.Content active={this.state.activeIndex === index}>
            <ul className="filterable-items">{content}</ul>
          </Accordion.Content>
        </Fragment>
      );
    })
  );

  render() {
    const {
      filterableItems,
      onComplete,
      onSave,
      onCancel,
    } = this.props;
    return (
      <section className="filter-by">
        <Dimmer.Dimmable>
          <Dimmer inverted active={this.props.readOnly} />
          <header>
            {this.renderFilters()}
          </header>
          <Accordion>
            {this.renderFilterableItems(filterableItems)}
          </Accordion>
        </Dimmer.Dimmable>
        <footer className="footer-buttons button-group">
          <TextButton
            className="dark"
            onClick={() => {
              onSave(this.state.filters);
              onComplete();
            }}
          >Done
          </TextButton>
          <TextButton onClick={() => {
            onCancel();
            onComplete();
          }}
          >Cancel
          </TextButton>
        </footer>
      </section>
    );
  }
}

FilterBy.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  filterableItems: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
  })).isRequired,
  onComplete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};
