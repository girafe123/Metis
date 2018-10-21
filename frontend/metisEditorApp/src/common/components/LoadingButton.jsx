import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const LoadingButton = (props) => {
  const { loading, icon, onClick, disabled, text } = props;
  const iconClass = loading ? 'fas fa-sync-alt sync-animation' : icon;
  const tooltip = loading ? '同步中' : text;
  return (
    <Tooltip title={tooltip}>
      <label>
        <IconButton onClick={onClick} disabled={disabled}>
          <Icon className={iconClass} fontSize="inherit" />
        </IconButton>
      </label>
    </Tooltip>
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
