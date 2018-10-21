import React from 'react';
import PropTypes from 'prop-types';

import TreeItem from './TreeItem';
import Scrollbar from '../Scrollbar';
import './style.scss';

export default class TreeView extends React.PureComponent {
  static defaultProps = {
    nodes: [],
    onSelect: () => null,
    onContextMenu: () => null,
  };

  static propTypes = {
    nodes: PropTypes.array,
    onSelect: PropTypes.func,
    onContextMenu: PropTypes.func,
  };

  render() {
    const { nodes, onSelect, onContextMenu } = this.props;
    return (
      <Scrollbar>
        <div className="me-tree-view">
          <ul className="me-tree-node">
            {
              nodes.map(node => <TreeItem key={node.id} node={node} onSelect={onSelect} onContextMenu={onContextMenu} />)
            }
          </ul>
        </div>
      </Scrollbar>
    );
  }
}
