import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './progressPie.scss';

function renderSubtitles(subtitles) {
  let yPosition = 20;
  return subtitles.map((subtitle) => {
    const subtitleElement = (
      <text key={subtitle} x="16" y={yPosition}>{subtitle}</text>
    );
    yPosition += 4;
    return subtitleElement;
  });
}

const ProgressPie = (props) => {
  const svgProps = { ...props };
  delete svgProps.percentage;
  const percentage = props.percentage ? props.percentage : (props.numerator / props.denominator) * 100;
  let className = 'progress-pie';
  if (svgProps.className) {
    className = `${className} ${svgProps.className}`;
    delete svgProps.className;
  }

  return (
    <svg {...svgProps} className={className} viewBox="0 0 32 32">
      <circle r="16" cx="16" cy="16" strokeDasharray={`${percentage} 100`} className="pie-progress-bg" />
      { percentage ? (<title>{percentage}</title>) : null}
      {props.subtitles ? (
        <Fragment>
          <circle r="14" cx="16" cy="16" strokeDasharray={`${percentage} 100`} className="pie-progress-text-bg" />
          <text x="16" y="15" className="pie-progress-title">{props.percentage ? `${props.percentage}%` : `${props.numerator}/${props.denominator}`}</text>
          <Fragment>
            {renderSubtitles(props.subtitles)}
          </Fragment>
        </Fragment>
      ) : null }
    </svg>
  );
};

export default ProgressPie;

ProgressPie.propTypes = {
  percentage: PropTypes.number,
  numerator: PropTypes.number,
  denominator: PropTypes.number,
  subtitles: PropTypes.arrayOf(PropTypes.string),
};
