import React from 'react';

const ToggleIcon = (props) => {
  const { open, onClick, className } = props;
  const icon = open ? 'fa-caret-down' : 'fa-caret-right';
  return <a onClick={onClick} className={className}><i className={`fas ${icon}`}></i></a>;
}


class TreeItem extends React.Component {
  state = {
    expandChildren: false,
  }

  contextMenuHandler = (e) => {
    const { onContextMenu, node } = this.props;
    e.stopPropagation();
    e.preventDefault();
    onContextMenu(e.clientX, e.clientY, node);
  }

  renderChildren() {
    const { node: { children }, onSelect, onContextMenu } = this.props;
    const { expandChildren } = this.state;
    if (expandChildren && children && children.length > 0) {
      return (<ul className="me-tree-node">
        {
          children.map(node => <TreeItem key={ node.id } node={ node } onSelect={ onSelect } onContextMenu={ onContextMenu } />)
        }
      </ul>);
    }

    return null;
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

  render() {
    const { node, onContextMenu } = this.props;
    const { expandChildren } = this.state;
    const hasChildren = node.children && node.children.length > 0;

    const icon = expandChildren ? 'fa-folder-open' : 'fa-folder';
    return <li>
      <header onClick={ this.onClickHander } onContextMenu={ this.contextMenuHandler } className="text-truncate">
        { hasChildren ? <ToggleIcon className='me-tree-toggle' open={expandChildren} onClick={this.onExpandHandler} /> : null }
        <i className={`far ${icon}`}></i>
        <span className="me-tree-title">{ node.name }</span>
      </header>
      { this.renderChildren() }
    </li>
  }
}

export default class TreeView extends React.Component {
  static defaultProps = {
    nodes: [],
  }

  render() {
    const { nodes, onSelect, onContextMenu } = this.props;
    return <div className="me-tree-view mt-2">
      <ul className="me-tree-node">
        {
          nodes.map(node => <TreeItem key={node.id} node={node} onSelect={onSelect} onContextMenu={ onContextMenu }/>)
        }
      </ul>
    </div>
  }
}