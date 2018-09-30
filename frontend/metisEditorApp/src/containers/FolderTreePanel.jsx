import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import TreeView from '../components/TreeView';
import LoadingBlock from '../components/LoadingBlock';
import ContextMenuContext from '../contexts/ContextMenuContext';

import { setActiveDoc } from '../actions';


class FolderTreePanel extends React.Component {
  state = {
    showLoading: false,
  };

  onSelectHandler = (node) => {
    console.log(node)
  };

  getContextMenuOptions = (node) => {
    const id = node.id;

    return [
      {label: '新建文件夹', action: this.createFolder(id)},
      {label: '删除文件夹', action: this.deleteFolder(id)}
    ];
  };

  createFolder = (id) => () => {
    console.log('新建文件夹', id);
  };

  deleteFolder = (id) => () => {
    console.log('删除文件夹', id);
    this.setState({
      showLoading: true,
    });

    setTimeout(() => {
      this.setState({
        showLoading: false,
      });
    }, 10000);
  };

  render() {
    const { folders } = this.props;
    const { showLoading } = this.state;
    return (
      <LoadingBlock loading={showLoading}>
        <ContextMenuContext.Consumer>
          {
            ({ showContextMenu }) => <TreeView 
              nodes={folders} 
              onSelect={this.onSelectHandler} 
              onContextMenu={(x, y, node) => {
                showContextMenu(x, y, this.getContextMenuOptions(node));
              }}
            />
          }
        </ContextMenuContext.Consumer>
      </LoadingBlock>
    );
  }
}

export default connect((state, props) => {
  return {
    folders: state.folders,
  };
})(FolderTreePanel);
