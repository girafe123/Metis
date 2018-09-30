import React from 'react';
import marked from 'marked';

export default class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.hostEle = React.createRef();
  }
  componentDidMount() {
    this.setContent(this.props.value);
  }
  componentDidUpdate() {
    this.setContent(this.props.value);
  }
  setContent(value) {
    this.hostEle.current.innerHTML = marked(value);
  }
  render() {
    return <div ref={this.hostEle} className="me-previewer"></div>;
  }
}