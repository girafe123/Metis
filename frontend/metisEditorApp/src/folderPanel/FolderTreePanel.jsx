import React from 'react';
import { connect } from 'react-redux';

import TreeView from '../common/components/TreeView';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';
import ConfirmDialog from '../common/components/ConfirmDialog';
import IconButtonWithTip from '../common/components/IconButtonWithTip';
import ContextMenuContext from '../common/contexts/ContextMenuContext';

import FolderFormDialog from './FolderFormDialog';
import RecycleBinModal from '../recycleBin';

import { getFolders, createFolder, updateFolder, setActiveFolder, deleteFolder } from './actions';

import './style.scss';

class FolderTreePanel extends React.Component {
  state = {
    editingFolderModel: null,
    title: '',
    confirmDialog: null,
    showRecycleBinModal: false,
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
        folder,
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
    const { confirmDialog: { folder } } = this.state;
    dispatch(deleteFolder(folder.id));
    this.onConfirmDialogCancel();
  };

  onConfirmDialogCancel = () => {
    this.setState({
      confirmDialog: null,
    });
  };

  showRecycleBinModal = () => {
    this.setState({
      showRecycleBinModal: true,
    });
  };

  closeRecycleBinModal = () => {
    this.setState({
      showRecycleBinModal: false,
    });
  };

  renderConfirmDialog() {
    const { confirmDialog } = this.state;
    if (confirmDialog) {
      return (
        <ConfirmDialog
          open
          title="警告"
          message={confirmDialog.msg}
          onOk={this.onConfirmDialogOK}
          onCancel={this.onConfirmDialogCancel}
        />
      );
    }

    return null;
  }

  renderFolderFormDialog() {
    const { editingFolderModel, title } = this.state;

    if (editingFolderModel) {
      return (
        <FolderFormDialog
          onClose={this.closeFolderModal}
          onSubmit={this.submitFolderModal}
          folder={editingFolderModel}
          title={title}
        />
      );
    }

    return null;
  }

  renderRecycleBinModal() {
    const { showRecycleBinModal } = this.state;
    if (showRecycleBinModal) {
      return <RecycleBinModal onClose={this.closeRecycleBinModal} />;
    }

    return null;
  }

  render() {
    const { folders, showLoading, currentFolder } = this.props;

    return (
      <LoadingBlock loading={showLoading}>
        <div className="me-folder-panel">
          <div className="me-toolbar">
            <IconButtonWithTip onClick={this.showRecycleBinModal} icon="fas fa-recycle" title="回收站" />
            <IconButtonWithTip onClick={this.createRootFolderModal} icon="fa fa-plus-circle" title="新建文件夹" />
            <IconButtonWithTip onClick={this.loadFolders} icon="fa fa-sync-alt" title="刷新" />
          </div>
          { this.renderFolderFormDialog() }
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
        { this.renderRecycleBinModal() }
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
