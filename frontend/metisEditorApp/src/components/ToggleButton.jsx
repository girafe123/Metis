import React from 'react';

export default class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    const { value, options} = this.props;
    const activeIndex = this.findActive();
    const newIndex = (activeIndex + 1) % options.length;
    const activeItem = options[newIndex];
    this.props.onChange(activeItem.value);
  }

  findActive() {
    const { value, options} = this.props;
    const activeIndex = options.findIndex(item => item.value === value);
    return activeIndex > -1 ? activeIndex : 0;
  }

  render() {
    const activeIndex = this.findActive();
    const activeItem = this.props.options[activeIndex];
    return <button className="btn btn-link" onClick={this.onClickHandler}><i className={activeItem.icon}/></button>
  }
}