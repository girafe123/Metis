import React from 'react';

const LoadingButton = (props) => {
  const { loading, icon, onClick } = props;
  const iconClass = loading ? 'fas fa-sync-alt sync-animation' : icon;
  return <button className="btn btn-link" onClick={onClick}><i className={iconClass}/></button>
}

export default LoadingButton