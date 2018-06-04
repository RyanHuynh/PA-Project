import React from 'react';

const DataPoint = props => (
  <svg viewBox="0 0 100 100" {...props}>
    <path
      className="st0"
      d="M50 100C22.4 100 0 77.6 0 50S22.4 0 50 0s50 22.4 50 50-22.4 50-50 50zm0-82.5c-17.9 0-32.5 14.6-32.5 32.5S32.1 82.5 50 82.5 82.5 67.9 82.5 50 67.9 17.5 50 17.5z"
    />
    <circle className="st0" cx={50} cy={50} r={11.7} />
  </svg>
);

export default DataPoint;
