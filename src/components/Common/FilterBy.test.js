/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import FilterBy from './FilterBy';

describe('>>>Common - FilterBy --- Snapshot', () => {
  it('+++capturing Snapshot of FilterBy', () => {
    const renderedValue = renderer.create(<FilterBy
      filters={[{ group: 'activity', value: 'abc', id: '1' }, { group: 'source', value: 'ghi', id: '2' }]}
      filterableItems={[
        { group: 'activity', items: [{ value: 'abc', id: '1' }, { value: 'def', id: '2' }] },
        { group: 'source', items: [{ value: 'ghi', id: '1' }, { value: 'jkl', id: '2' }] },
      ]}
      onComplete={() => {}}
      onSave={() => {}}
      onCancel={() => {}}
    />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });
});

describe('>>>Common - FilterBy', () => {
  let filterBy;
  beforeEach(() => {
    filterBy = mount(<FilterBy
      filters={[{ group: 'activity', value: 'abc', id: '1' }, { group: 'source', value: 'ghi', id: '2' }]}
      filterableItems={[
        { group: 'activity', items: [{ value: 'abc', id: '1' }, { value: 'def', id: '2' }] },
        { group: 'source', items: [{ value: 'ghi', id: '1' }, { value: 'jkl', id: '2' }] },
      ]}
      onComplete={() => {}}
      onSave={() => {}}
      onCancel={() => {}}
    />);
  });

  it('removes a filter if it is clicked on', () => {
    expect(filterBy.find('.filters .filter').length).toEqual(2);
    filterBy.find('.filters .filter').first().find('button').simulate('click');
    expect(filterBy.find('.filters .filter').length).toEqual(1);
  });

  it('adds a filter if it selected in the filterable list', () => {
    expect(filterBy.find('.filters .filter').length).toEqual(2);
    filterBy.find('.filterable-items .available-filter').not('.selected').first().find('button')
      .simulate('click');
    expect(filterBy.find('.filters .filter').length).toEqual(3);
  });

  it('removes a filter if it deselected in the filterable list', () => {
    expect(filterBy.find('.filters .filter').length).toEqual(2);
    filterBy.find('.filterable-items .available-filter .selected').first().find('button')
      .simulate('click');
    expect(filterBy.find('.filters .filter').length).toEqual(1);
  });
});
