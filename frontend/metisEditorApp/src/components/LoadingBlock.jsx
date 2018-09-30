import React from 'react';

const LoadingBlock = (props) => {
  const { loading, children, className = '' } = props;
  return <div className={`me-loading-block ${className}`}>
    { children }
    { loading ? <div className="me-loading-overlay"><i className="fas fa-spinner"></i></div> : null }
  </div>
}

export default LoadingBlock;
