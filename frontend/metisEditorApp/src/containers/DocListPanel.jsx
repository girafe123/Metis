import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ListView from '../components/ListView';
import LoadingBlock from '../components/LoadingBlock';

import { setActiveDoc } from '../actions';
import { getDocuments } from '../services/http';

class DocListPanel extends React.Component {
  state = {
    showLoading: false,
    list: [],
  };

  onSelectHandler = (item) => {
    const { dispatch } = this.props;
    dispatch(setActiveDoc(item.id));
  }

  componentDidMount() {
    this.setState({
      showLoading: true,
    });

    getDocuments().then((list) => {
      this.setState({
        showLoading: false,
        list,
      });
    })
  }

  render() {
    const { docId } = this.props;
    const { showLoading, list } = this.state;
    return <LoadingBlock loading={showLoading} >
      <ListView list={list} onSelect={this.onSelectHandler} value={docId} />
    </LoadingBlock>
  }
}

export default connect((state, props) => {
  return {
    list: state.docList,
    docId: state.currentDocId,
  };
})(DocListPanel);
