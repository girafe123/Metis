import React from 'react';
import { connect } from 'react-redux';

import ListView from '../common/components/ListView';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';
import ContextMenuContext from '../common/contexts/ContextMenuContext';
import ConfirmDialog from '../common/components/ConfirmDialog';
import FileUpload from '../common/components/FileUpload';
import IconButtonWithTip from '../common/components/IconButtonWithTip';

import { getDocument, createDocument, getDocuments, deleteDocument } from './actions';
import { DocumentType } from '../common/utils/Enums';
import { readFile } from '../common/utils/utils';

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

  importDocument = (files) => {
    const { dispatch, folder } = this.props;

    readFile(files[0]).then(({ title, content }) => {
      dispatch(createDocument({
        title,
        content,
        type: DocumentType.Markdown,
        isPublic: false,
        folder: folder.id,
      }));
    });
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
            <IconButtonWithTip onClick={this.createDocument} icon="fa fa-plus-circle" title="新建文档" disabled={!folder} />
            <FileUpload icon="fas fa-file-import" onUpload={this.importDocument} disabled={!folder} text="导入" />
            <IconButtonWithTip onClick={this.loadDocuments} icon="fa fa-sync-alt" title="刷新" disabled={!folder} />
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
