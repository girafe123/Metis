import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import './style.scss';

const LoadingBlock = (props) => {
  const { loading, children, className } = props;
  return (
    <div className={`me-loading-block ${className}`}>
      { children }
      { loading ? (
        <div className="me-loading-overlay">
          <div className="me-loading-icon">
            <CircularProgress />
          </div>
        </div>) : null }
    </div>
  );
};

LoadingBlock.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

LoadingBlock.defaultProps = {
  loading: false,
  children: [],
  className: '',
};

export default LoadingBlock;
