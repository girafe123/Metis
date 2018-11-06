import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButtonWithTip from './IconButtonWithTip';

const LoadingButton = (props) => {
  const { loading, icon, onClick, disabled, text } = props;
  const iconClass = classNames({
    'fas fa-sync-alt sync-animation': loading,
    [icon]: !loading,
  });
  const tooltip = loading ? '同步中' : text;
  return (
    <IconButtonWithTip onClick={onClick} icon={iconClass} disabled={disabled} title={tooltip} />
  );
};

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

LoadingButton.defaultProps = {
  loading: false,
  disabled: false,
};

export default LoadingButton;
