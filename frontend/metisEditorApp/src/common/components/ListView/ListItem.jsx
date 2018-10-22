import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const className = classNames({
      active,
    }, 'me-doc-item');
    return (
      <li className={className} onContextMenu={this.contextMenuHandler}>
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
