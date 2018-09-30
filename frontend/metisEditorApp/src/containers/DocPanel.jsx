import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import ToolBar from '../components/ToolBar';
import Editor from '../components/Editor';
import Previewer from '../components/Previewer';
import LoadingBlock from '../components/LoadingBlock';

import { switchMode, updateDocContent, updateDocTitle } from '../actions';
import { getDocument, updateDocument } from '../services/http';

class DocPanel extends React.Component {
  state = {
    isSaveLoading: false,
    isDocLoading: false,
    doc: null,
  };

  onChangeHandler = (v) => {
    this.setState({
      doc: {
        ...this.state.doc,
        content: v,
      },
    });
  };

  onSwitchHandler = (v) => {
    const { dispatch } = this.props;
    dispatch(switchMode(v));
  };

  onTitleChangeHandler = (v) => {
    this.setState({
      doc: {
        ...this.state.doc,
        title: v,
      },
    });
  };

  onSaveHandler = () => {
    this.setState({
      isSaveLoading: true,
    });

    updateDocument(this.state.doc).then((doc) => {
      this.setState({
        isSaveLoading: false,
        doc,
      });
    })
  }

  renderEmpty() {
    return <div>empty</div>
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.docId !== this.props.docId) {
      this.setState({
        isDocLoading: true,
      });
      getDocument(this.props.docId).then((doc) => {
        this.setState({
          doc,
          isDocLoading: false,
        });
      });
    }
  }

  render() {
    const { mode } = this.props;
    const { isSaveLoading, isDocLoading, doc } = this.state;

    if (!doc) {
      return this.renderEmpty();
    }

    const docComponent = mode === 'preview' ? 
      <Previewer value={doc.content} /> : 
      <Editor key={doc.id} value={doc.content} onChange={this.onChangeHandler}/>;

    return(<Fragment>
      <LoadingBlock loading={isDocLoading} className="me-doc-container">
        <ToolBar 
          onSwitch={this.onSwitchHandler}
          onTitleChange={this.onTitleChangeHandler}
          onSave={this.onSaveHandler}
          isSaveLoading={isSaveLoading}
          title={doc.title}
          mode={mode} 
        />
        { docComponent }
      </LoadingBlock>
    </Fragment>);
  }
}

export default connect((state, props) => {
  return {
    docId: state.currentDocId,
    mode: state.mode,
  };
})(DocPanel);
