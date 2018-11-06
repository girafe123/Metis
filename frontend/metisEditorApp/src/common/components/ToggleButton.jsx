import React from 'react';
import PropTypes from 'prop-types';

import IconButtonWithTip from './IconButtonWithTip';

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
      <IconButtonWithTip onClick={this.onClickHandler} icon={activeItem.icon} title={activeItem.text} />
    );
  }
}
