import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const EmptyPanel = (props) => {
  const { icon, text, className } = props;
  return (
    <div className={`me-empty-block ${className}`}>
      <div className="me-empty-center">
        <p><i className={icon} /></p>
        <p>{text}</p>
      </div>
    </div>
  );
};

EmptyPanel.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

EmptyPanel.defaultProps = {
  icon: '',
  text: '',
  className: '',
};

export default EmptyPanel;
