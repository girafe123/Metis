import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

export default class ToggleButton extends React.PureComponent {
  static defaultProps = {
    onChange: () => null,
  };

  static propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  onClickHandler = () => {
    const { options, onChange } = this.props;
    const activeIndex = this.findActive();
    const newIndex = (activeIndex + 1) % options.length;
    const activeItem = options[newIndex];
    onChange(activeItem.value);
  }

  findActive() {
    const { value, options } = this.props;
    const activeIndex = options.findIndex(item => item.value === value);
    return activeIndex > -1 ? activeIndex : 0;
  }

  render() {
    const { options } = this.props;
    const activeIndex = this.findActive();
    const activeItem = options[activeIndex];
    return (
      <Tooltip title={activeItem.text}>
        <IconButton onClick={this.onClickHandler} color="primary">
          <Icon className={activeItem.icon} fontSize="inherit" />
        </IconButton>
      </Tooltip>
    );
  }
}
