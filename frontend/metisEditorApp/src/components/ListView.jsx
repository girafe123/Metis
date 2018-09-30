import React, { Fragment } from 'react';
import { connect } from 'react-redux'

class ListItem extends React.Component {
  clickHandler = () => {
    const { onClick, item } = this.props;
    onClick(item);
  }

  render() {
    const { item, active } = this.props;
    return <li className={`me-doc-item ${active ? 'active' : ''}`}>
      <a onClick={this.clickHandler}>
        <header>{item.title}</header>
      </a>
    </li>
  }
}


export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(item) {
    const { onSelect, value } = this.props;
    if (item.id !== value) {
      onSelect(item);
    }
  }

  render() {
    const { list, value } = this.props;
    return <ul className="me-doc-list">
      {
        list.map(item => <ListItem item={item} active={ value === item.id } key={item.id} onClick={this.clickHandler}/>)
      }
    </ul>;
  }
}