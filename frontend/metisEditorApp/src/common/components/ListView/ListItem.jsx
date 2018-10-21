import React from 'react';
import PropTypes from 'prop-types';

export default class ListItem extends React.PureComponent {
  clickHandler = () => {
    const { onClick, item } = this.props;
    onClick(item);
  }

  contextMenuHandler = (e) => {
    const { onContextMenu, item } = this.props;
    e.stopPropagation();
    e.preventDefault();
    onContextMenu(e.clientX, e.clientY, item);
  }

  render() {
    const { item, active } = this.props;
    return (
      <li className={`me-doc-item ${active ? 'active' : ''}`} onContextMenu={this.contextMenuHandler}>
        <a onClick={this.clickHandler}>
          <header>{item.title}</header>
        </a>
      </li>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  onContextMenu: PropTypes.func,
};

ListItem.defaultProps = {
  onClick: () => null,
  onContextMenu: () => null,
  active: false,
};
