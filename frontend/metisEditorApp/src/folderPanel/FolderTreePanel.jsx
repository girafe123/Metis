import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import TreeView from '../common/components/TreeView';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';
import ConfirmDialog from '../common/components/ConfirmDialog';
import ContextMenuContext from '../common/contexts/ContextMenuContext';
import FolderFormDialog from './FolderFormDialog';
import { getFolders, createFolder, deleteFolder, updateFolder, setActiveFolder } from './actions';

import './style.scss';

class FolderTreePanel extends React.Component {
  state = {
    editingFolderModel: null,
    title: '',
    confirmDialog: null,
  }

  componentDidMount() {
    this.loadFolders();
  }

  onSelectHandler = (node) => {
    const { dispatch } = this.props;
    dispatch(setActiveFolder(node));
  };

  loadFolders = () => {
    const { dispatch } = this.props;
    dispatch(getFolders());
  };

  getContextMenuOptions = (node) => {
    return [
      { label: '新建文件夹', action: this.createFolder(node.id) },
      { label: '编辑文件夹', action: this.updateFolder(node) },
      { label: '删除文件夹', action: this.deleteFolder(node) },
    ];
  };

  createFolder = id => () => {
    this.setState({
      editingFolderModel: {
        name: '',
        isPublic: false,
        parentId: id,
      },
      title: '新建文件夹',
    });
  };

  updateFolder = folder => () => {
    this.setState({
      editingFolderModel: folder,
      title: '编辑文件夹',
    });
  };

  deleteFolder = folder => () => {
    this.setState({
      confirmDialog: {
        id: folder.id,
        msg: `确定要删除 ${folder.name} 吗?`,
      },
    });
  };

  createRootFolderModal = () => {
    this.setState({
      editingFolderModel: {
        name: '',
        isPublic: false,
        parentId: null,
      },
      title: '新建文件夹',
    });
  };

  closeFolderModal = () => {
    this.setState({
      editingFolderModel: null,
    });
  };

  submitFolderModal = (data) => {
    const { dispatch } = this.props;
    if (data.id) {
      dispatch(updateFolder(data));
    } else {
      dispatch(createFolder(data));
    }
  };

  onConfirmDialogOK = () => {
    const { dispatch } = this.props;
    dispatch(deleteFolder(this.state.confirmDialog.id));
    this.onConfirmDialogCancel();
  };

  onConfirmDialogCancel = () => {
    this.setState({
      confirmDialog: null,
    });
  };

  renderConfirmDialog() {
    if (this.state.confirmDialog) {
      return (
        <ConfirmDialog
          open
          title="警告"
          message={this.state.confirmDialog.msg}
          onOk={this.onConfirmDialogOK}
          onCancel={this.onConfirmDialogCancel}
        />
      );
    }

    return null;
  }

  render() {
    const { folders, showLoading, currentFolder } = this.props;
    const { editingFolderModel, title } = this.state;

    return (
      <LoadingBlock loading={showLoading}>
        <div className="me-folder-panel">
          <div className="me-toolbar">
            <IconButton onClick={this.createRootFolderModal}>
              <Icon className="fa fa-plus-circle" fontSize="inherit" />
            </IconButton>
            <IconButton onClick={this.loadFolders}>
              <Icon className="fa fa-sync-alt" fontSize="inherit" />
            </IconButton>
          </div>
          {
            editingFolderModel ? (
              <FolderFormDialog
                onClose={this.closeFolderModal}
                onSubmit={this.submitFolderModal}
                folder={editingFolderModel}
                title={title}
              />) : null
          }
          <ContextMenuContext.Consumer>
            {
              ({ showContextMenu }) => (
                folders.length ? (
                  <TreeView
                    nodes={folders}
                    onSelect={this.onSelectHandler}
                    onContextMenu={(x, y, node) => {
                      showContextMenu(x, y, this.getContextMenuOptions(node));
                    }}
                    activeNodeId={currentFolder ? currentFolder.id : null}
                  />) : <EmptyPanel text="没有任何文件夹" icon="far fa-folder" />
              )
            }
          </ContextMenuContext.Consumer>
        </div>
        { this.renderConfirmDialog() }
      </LoadingBlock>
    );
  }
}

export default connect((state) => {
  return {
    folders: state.editor.folderList,
    showLoading: state.editorState.isFolderListLoading,
    currentFolder: state.editor.currentFolder,
  };
})(FolderTreePanel);
