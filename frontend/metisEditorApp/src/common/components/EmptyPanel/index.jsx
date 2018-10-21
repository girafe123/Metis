import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const EmptyPanel = (props) => {
  const { icon, text } = props;
  return (
    <div className="me-empty-block">
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
};

EmptyPanel.defaultProps = {
  icon: '',
  text: '',
};

export default EmptyPanel;
