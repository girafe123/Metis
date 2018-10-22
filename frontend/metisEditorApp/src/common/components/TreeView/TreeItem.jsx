import React from 'react';
import PropTypes from 'prop-types';

const ToggleIcon = (props) => {
  const { open, onClick, className } = props;
  const icon = open ? 'fa-caret-down' : 'fa-caret-right';
  return (<a onClick={onClick} className={className}><i className={`fas ${icon}`} /></a>);
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

    const icon = expandChildren ? 'fa-folder-open' : 'fa-folder';

    return (
      <li>
        <header onClick={this.onClickHander} onContextMenu={this.contextMenuHandler} className={node.id === activeNodeId ? 'active' : ''}>
          { hasChildren ? <ToggleIcon className="me-tree-toggle" open={expandChildren} onClick={this.onExpandHandler} /> : null }
          <i className={`far ${icon}`} />
          <span className="me-tree-title">{ node.name }</span>
        </header>
        { this.renderChildren() }
      </li>
    );
  }
}
