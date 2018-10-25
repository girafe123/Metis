import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ToolBar from './ToolBar';
import Editor from '../common/components/Editor';
import Previewer from '../common/components/Previewer';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';
import { downloadFile } from '../common/utils/utils';

import { switchMode, updateDocument } from './actions';

import './style.scss';

class DocPanel extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.doc && props.doc.id !== state.id) {
      return {
        title: props.doc.title,
        content: props.doc.content,
        id: props.doc.id,
        isPublic: props.doc.isPublic,
        isDirty: false,
      };
    }

    return null;
  }

  state = {
    title: '',
    content: '',
    id: '',
    isPublic: false,
    isDirty: false,
  };

  onChangeHandler = (v) => {
    this.setState({
      content: v,
      isDirty: true,
    });
  };

  onSwitchHandler = (v) => {
    const { dispatch } = this.props;
    dispatch(switchMode(v));
  };

  onTitleChangeHandler = (v) => {
    this.setState({
      title: v,
      isDirty: true,
    });
  };

  onIsPublicChangeHandler = (v) => {
    this.setState({
      isPublic: v,
      isDirty: true,
    });
  };

  onSaveHandler = () => {
    const { dispatch } = this.props;
    const { title, content, id, isPublic, isDirty } = this.state;
    if (isDirty) {
      dispatch(updateDocument({ title, content, id, isPublic }));
      this.setState({
        isDirty: false,
      });
    }
  }

  onDownloadHandler = () => {
    const { doc: { type } } = this.props;
    const { title, content } = this.state;
    downloadFile(title, content, type);
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, doc } = this.props;
    if (prevState.id && doc.id !== prevState.id && prevState.isDirty) {

      const { title, content, id, isPublic } = prevState;
      dispatch(updateDocument({ title, content, id, isPublic }));
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload ', (e) => {
      const event = e || window.event;
      if (this.state.isDirty && event) {
        e.returnValue = '有未同步的改动请先提交';
      }
      return '有未同步的改动请先提交';
    });
  }

  render() {
    const { mode, isSaveLoading, isDocLoading, doc } = this.props;
    const { title, content, isDirty, isPublic } = this.state;

    let inner;
    if (!doc) {
      inner = <EmptyPanel text="当前没有选择文档" icon="far fa-sticky-note" />;
    } else {
      inner = (
        <Fragment>
          <ToolBar
            onSwitch={this.onSwitchHandler}
            onTitleChange={this.onTitleChangeHandler}
            onSave={this.onSaveHandler}
            isSaveLoading={isSaveLoading}
            title={title}
            mode={mode}
            isSaveDisabled={!isDirty}
            isPublic={isPublic}
            onIsPublicChange={this.onIsPublicChangeHandler}
            onDownload={this.onDownloadHandler}
          />
          {
            mode === 'preview'
              ? <Previewer value={content} />
              : <Editor key={doc.id} value={content} onChange={this.onChangeHandler} onSave={this.onSaveHandler} />
          }
        </Fragment>
      );
    }

    return (
      <LoadingBlock loading={isDocLoading} className="me-doc-container">
        { inner }
      </LoadingBlock>
    );
  }
}

export default connect((state) => {
  return {
    doc: state.editor.currentDocument,
    mode: state.editorState.mode,
    isDocLoading: state.editorState.isCurrentDocmentLoading,
    isSaveLoading: state.editorState.isCurrentDocumentSaving,
  };
})(DocPanel);
