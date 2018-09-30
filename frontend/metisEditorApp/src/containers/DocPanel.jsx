import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import ToolBar from '../components/ToolBar';
import Editor from '../components/Editor';
import Previewer from '../components/Previewer';
import LoadingBlock from '../components/LoadingBlock';

import { switchMode, updateDocContent, updateDocTitle } from '../actions';

class DocPanel extends React.Component {
  state = {
    isSaveLoading: false,
    isDocLoading: false,
  };

  onChangeHandler = (v) => {
    const { dispatch } = this.props;
    dispatch(updateDocContent(v));
  };

  onSwitchHandler = (v) => {
    const { dispatch } = this.props;
    dispatch(switchMode(v));
  };

  onTitleChangeHandler = (v) => {
    const { dispatch } = this.props;
    dispatch(updateDocTitle(v));
  };

  onSaveHandler = () => {
    this.setState({
      isSaveLoading: true,
      isDocLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isSaveLoading: false,
        isDocLoading: false,
      });
    }, 10000);
  }

  render() {
    const { doc, mode } = this.props;
    const { isSaveLoading, isDocLoading } = this.state;
    const docComponent = mode === 'preview' ? 
      <Previewer value={doc.content} /> : 
      <Editor value={doc.content} onChange={this.onChangeHandler}/>;

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
    doc: state.currentDoc,
    mode: state.mode,
  };
})(DocPanel);
