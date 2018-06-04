import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import ArrowPaginationBack from '../../assets/img/ArrowPaginationBack';
import ArrowPaginationNext from '../../assets/img/ArrowPaginationNext';

import './Pagination.scss';

const Pagination = ({
  currentPage,
  changePage,
  total,
  pageSize,
}) => (
  <div className="rs-pagination-container">
    <Button
      disabled={currentPage === 1}
      onClick={() => { changePage(currentPage - 1); }}
      className="rs-pagination-button"
    ><ArrowPaginationBack />
    </Button>
    <span>
      {`Page ${currentPage}/${Math.ceil(total / pageSize)}`}
    </span>
    <Button
      disabled={currentPage >= Math.ceil(total / pageSize)}
      onClick={() => { changePage(currentPage + 1); }}
      className="rs-pagination-button"
    ><ArrowPaginationNext />
    </Button>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
