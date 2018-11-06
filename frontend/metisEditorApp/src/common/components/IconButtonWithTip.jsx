import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

const IconButtonWithTip = (props) => {
  const { title, onClick, color, icon, fontSize, disabled } = props;
  return (
    <Tooltip title={title}>
      <span>
        <IconButton onClick={onClick} color={color} disabled={disabled}>
          <Icon className={icon} fontSize={fontSize} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

IconButtonWithTip.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

IconButtonWithTip.defaultProps = {
  title: '',
  color: 'primary',
  fontSize: 'inherit',
  disabled: false,
};

export default IconButtonWithTip;
