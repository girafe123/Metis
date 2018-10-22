import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ToggleIcon = (props) => {
  const { open, onClick, className } = props;
  const iconClassName = classNames({
    'fa-caret-down': open,
    'fa-caret-right': !open,
  }, 'fas');
  return (<a onClick={onClick} className={className}><i className={iconClassName} /></a>);
};

ToggleIcon.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

ToggleIcon.defaultProps = {
  open: false,
  onClick: () => null,
  className: '',
};

export default class TreeItem extends React.PureComponent {
  static defaultProps = {
    onSelect: () => null,
    onContextMenu: () => null,
    activeNodeId: null,
  };

  static propTypes = {
    node: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    onContextMenu: PropTypes.func,
    activeNodeId: PropTypes.number,
  };

  state = {
    expandChildren: false,
  };

  contextMenuHandler = (e) => {
    const { onContextMenu, node } = this.props;
    e.stopPropagation();
    e.preventDefault();
    onContextMenu(e.clientX, e.clientY, node);
  }

  onExpandHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { expandChildren } = this.state;
    this.setState({
      expandChildren: !expandChildren,
    });
  }

  onClickHander = () => {
    const { node, onSelect } = this.props;
    onSelect(node);
  }

  renderChildren() {
    const { node: { children }, onSelect, onContextMenu, activeNodeId } = this.props;
    const { expandChildren } = this.state;
    if (expandChildren && children && children.length > 0) {
      return (
        <ul className="me-tree-node">
          {
            children.map(node => <TreeItem key={node.id} node={node} onSelect={onSelect} onContextMenu={onContextMenu} activeNodeId={activeNodeId} />)
          }
        </ul>
      );
    }

    return null;
  }

  render() {
    const { node, activeNodeId } = this.props;
    const { expandChildren } = this.state;
    const hasChildren = node.children && node.children.length > 0;

    const iconClassName = classNames({
      'fa-folder-open': expandChildren,
      'fa-folder': !expandChildren,
    }, 'far');

    const activeClassName = classNames({
      active: node.id === activeNodeId,
    }, 'text-ellipsis');
    return (
      <li>
        <header onClick={this.onClickHander} onContextMenu={this.contextMenuHandler} className={activeClassName}>
          { hasChildren ? <ToggleIcon className="me-tree-toggle" open={expandChildren} onClick={this.onExpandHandler} /> : null }
          <i className={iconClassName} />
          <span className="me-tree-title">{ node.name }</span>
        </header>
        { this.renderChildren() }
      </li>
    );
  }
}
