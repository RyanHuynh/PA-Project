import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import ArrowDropDown from '../../assets/img/ArrowDropDown';
import Pagination from './Pagination';

import './Table.scss';

export default class RSTable extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // set state based off of nextProps sorted
    if (nextProps.sorted) {
      const { sort } = prevState;
      if (sort.length === nextProps.sorted.length) {
        let equivalence = true;
        for (let i = 0; i < sort.length; i += 1) {
          if (sort[i].id !== nextProps.sorted[i].id || sort[i].desc !== nextProps.sorted[i].desc) {
            equivalence = false;
            break;
          }
        }
        if (equivalence) {
          return null;
        }
      }
      return {
        sort: nextProps.sorted,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      sort: [{ id: props.defaultSortedId, desc: props.defaultSortedDesc }],
    };
  }

  makeHeader(title, accessor, id = null) {
    const isSorted = this.state.sort.find(item => item.id === (id || accessor));
    if (isSorted) {
      return (<span className="rs-header-title">{title}<ArrowDropDown transform={!isSorted.desc ? 'rotate(180)' : null} /></span>);
    }
    return (<span>{title}</span>);
  }

  render() {
    const {
      changePage,
      total,
      pageSize,
      currentPage,
      records,
      setSort,
      columns,
      defaultSortedId,
      defaultSortedDesc,
      manualSort,
      containerClass,
      tableClassName,
      sorted,
    } = this.props;
    const reactTableProps = { ...this.props };
    delete reactTableProps.changePage;
    reactTableProps.onPageChange = (pageIndex) => {
      changePage(pageIndex);
    };
    reactTableProps.pages = Math.ceil(total / pageSize);
    reactTableProps.page = currentPage;
    reactTableProps.data = records;
    delete reactTableProps.records;
    delete reactTableProps.currentPage;
    delete reactTableProps.total;
    delete reactTableProps.pageSize;
    reactTableProps.onSortedChange = (newSorted) => {
      this.setState({ sort: newSorted });
      if (!sorted || manualSort) {
        setSort(newSorted);
      }
    };
    reactTableProps.columns = columns.map(column => ({
      ...column,
      Header: this.makeHeader(column.title, column.accessor, column.id),
    }));
    reactTableProps.defaultSorted = [{ id: defaultSortedId, desc: !!defaultSortedDesc }];
    delete reactTableProps.setSort;
    const tableContainerClass = `rs-table-container ${containerClass || ''}`;
    reactTableProps.className = `rs-table ${tableClassName || ''}`;
    delete reactTableProps.containerClass;
    return (
      <section className={tableContainerClass}>
        <ReactTable
          {...reactTableProps}
          showPageSizeOptions={false}
          minRows={0}
          showPagination={false}
          resizable={false}
          showPaginationBottom={false}
          manual={manualSort}
        />
        {total > 0 ? (
          <Pagination
            currentPage={currentPage}
            changePage={changePage}
            total={total}
            pageSize={pageSize}
          />
        ) : null}
      </section>
    );
  }
}

RSTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  records: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  columns: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  defaultSortedId: PropTypes.string.isRequired,
  defaultSortedDesc: PropTypes.bool,
  manualSort: PropTypes.bool,
  changePage: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
  tableClassName: PropTypes.string,
  sorted: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

RSTable.defaultProps = {
  defaultSortedDesc: true,
  manualSort: true,
  containerClass: '',
  tableClassName: '',
};
