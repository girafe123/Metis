import React from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import ListView from '../common/components/ListView';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';
import ContextMenuContext from '../common/contexts/ContextMenuContext';

import { getDocument, createDocument, getDocuments, deleteDocument } from './actions';
import { DocumentType } from '../common/utils/Enums';

import './style.scss';

class DocListPanel extends React.Component {
  componentDidUpdate(prevProps) {
    const { folderId } = this.props;
    if (prevProps.folderId !== folderId) {
      this.loadDocuments();
    }
  }

  onSelectHandler = (item) => {
    const { dispatch } = this.props;
    dispatch(getDocument(item.id));
  }

  createDocument = () => {
    const { dispatch, folderId } = this.props;
    dispatch(createDocument({
      title: '新建文档',
      content: '',
      type: DocumentType.Markdown,
      isPublic: false,
      folder: folderId,
    }));
  };

  deleteDocument = id => () => {
    const { dispatch } = this.props;
    dispatch(deleteDocument(id));
  };

  loadDocuments = () => {
    const { dispatch, folderId } = this.props;
    dispatch(getDocuments(folderId));
  }

  getContextMenuOptions = node => [
    { label: '删除文档', action: this.deleteDocument(node.id) },
  ];

  render() {
    const { docId, list, showLoading } = this.props;
    return (
      <LoadingBlock loading={showLoading}>
        <div className="me-doc-list-panel">
          <div className="me-toolbar">
            <IconButton onClick={this.createDocument}>
              <Icon className="fa fa-plus-circle" fontSize="inherit" />
            </IconButton>
            <IconButton onClick={this.loadDocuments}>
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
              </ContextMenuContext.Consumer>) : <EmptyPanel text="没有任何文档" icon="fas fa-list" />
          }
        </div>
      </LoadingBlock>
    );
  }
}

export default connect((state) => {
  const { currentDocument, currentFolder } = state.editor;
  return {
    list: state.editor.documentList || [],
    docId: currentDocument ? currentDocument.id : null,
    folderId: currentFolder ? currentFolder.id : null,
    showLoading: state.editorState.isDocumentListLoading,
  };
})(DocListPanel);
