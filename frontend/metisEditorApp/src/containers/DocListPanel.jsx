import React, { Fragment } from 'react';
import { connect } from 'react-redux'

import ListView from '../components/ListView';
import LoadingBlock from '../components/LoadingBlock';

import { setActiveDoc } from '../actions';

class DocListPanel extends React.Component {
  state = {
    showLoading: false,
  };

  onSelectHandler = (item) => {
    const { dispatch } = this.props;
    dispatch(setActiveDoc(item));
    this.setState({
      showLoading: true,
    });

    setTimeout(() => {
      this.setState({
        showLoading: false,
      })
    }, 10000)
  }

  render() {
    const { list } = this.props;
    const { showLoading } = this.state;
    return <LoadingBlock loading={showLoading} >
      <ListView list={list} onSelect={this.onSelectHandler} />
    </LoadingBlock>
  }
}

export default connect((state, props) => {
  return {
    list: state.docList,
  };
})(DocListPanel);
