import React, { Fragment } from 'react';
import { connect } from 'react-redux'

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const { onClick, item } = this.props;
    onClick(item);
  }

  render() {
    const { item } = this.props;
    return <li className="me-doc-item">
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
    const { onSelect } = this.props;
    onSelect(item);
  }

  render() {
    const { list } = this.props;
    return <ul className="me-doc-list">
      {
        list.map(item => <ListItem item={item} key={item.id} onClick={this.clickHandler}/>)
      }
    </ul>;
  }
}