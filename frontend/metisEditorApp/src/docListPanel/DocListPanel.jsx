import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import ListView from '../common/components/ListView';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';
import ContextMenuContext from '../common/contexts/ContextMenuContext';
import ConfirmDialog from '../common/components/ConfirmDialog';

import { getDocument, createDocument, getDocuments, deleteDocument } from './actions';
import { DocumentType } from '../common/utils/Enums';

import './style.scss';

class DocListPanel extends React.Component {
  state = {
    confirmDialog: null,
  };

  componentDidUpdate(prevProps) {
    const { folder } = this.props;
    if (prevProps.folder !== folder) {
      this.loadDocuments();
    }
  }

  onSelectHandler = (item) => {
    const { dispatch } = this.props;
    dispatch(getDocument(item.id));
  }

  createDocument = () => {
    const { dispatch, folder } = this.props;
    dispatch(createDocument({
      title: '新建文档',
      content: '',
      type: DocumentType.Markdown,
      isPublic: false,
      folder: folder.id,
    }));
  };

  deleteDocument = doc => () => {
    this.setState({
      confirmDialog: {
        id: doc.id,
        msg: `确定要删除 ${doc.title} 吗?`,
      },
    });
  };

  loadDocuments = () => {
    const { dispatch, folder } = this.props;
    dispatch(getDocuments(folder.id));
  }

  getContextMenuOptions = node => [
    { label: '删除文档', action: this.deleteDocument(node) },
  ];

  onConfirmDialogOK = () => {
    const { dispatch } = this.props;
    dispatch(deleteDocument(this.state.confirmDialog.id));
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
    const { docId, list, showLoading, folder } = this.props;
    return (
      <LoadingBlock loading={showLoading}>
        <div className="me-doc-list-panel">
          <div className="me-toolbar">
            <IconButton onClick={this.createDocument} disabled={!folder} color="primary">
              <Icon className="fa fa-plus-circle" fontSize="inherit" />
            </IconButton>
            <IconButton onClick={this.loadDocuments} disabled={!folder} color="primary">
              <Icon className="fa fa-sync-alt" fontSize="inherit" />
            </IconButton>
          </div>
          {
            list.length > 0 ? (
              <ContextMenuContext.Consumer>
                {
                  ({ showContextMenu }) => (
                    <ListView list={list}
                      onSelect={this.onSelectHandler}
                      value={docId}
                      onContextMenu={(x, y, node) => {
                        showContextMenu(x, y, this.getContextMenuOptions(node));
                      }} />)
                }
              </ContextMenuContext.Consumer>) : <EmptyPanel text="没有任何文档" icon="fas fa-align-center" />
          }
        </div>
        { this.renderConfirmDialog() }
      </LoadingBlock>
    );
  }
}

export default connect((state) => {
  const { currentDocument, currentFolder } = state.editor;
  return {
    list: state.editor.documentList || [],
    docId: currentDocument ? currentDocument.id : null,
    folder: currentFolder,
    showLoading: state.editorState.isDocumentListLoading,
  };
})(DocListPanel);
