import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ToolBar from './ToolBar';
import Editor from '../common/components/Editor';
import Previewer from '../common/components/Previewer';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';

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
    const { title, content, id, isPublic } = this.state;
    dispatch(updateDocument({ title, content, id, isPublic }));
    this.setState({
      isDirty: false,
    });
  }

  render() {
    const { mode, isSaveLoading, isDocLoading, doc } = this.props;
    const { title, content, isDirty, isPublic } = this.state;
    if (!doc) {
      return <EmptyPanel text="当前没有选择文档" icon="far fa-sticky-note" />;
    }

    const docComponent = mode === 'preview'
      ? <Previewer value={content} />
      : <Editor key={doc.id} value={content} onChange={this.onChangeHandler} />;

    return (
      <Fragment>
        <LoadingBlock loading={isDocLoading} className="me-doc-container">
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
          />
          { docComponent }
        </LoadingBlock>
      </Fragment>
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
