import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import './style.scss';

export default class Previewer extends React.PureComponent {
  static defaultProps = {
    value: '',
  };

  static propTypes = {
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.hostEle = React.createRef();
  }

  componentDidMount() {
    const { value } = this.props;
    this.setContent(value);
  }

  componentDidUpdate() {
    const { value } = this.props;
    this.setContent(value);
  }

  setContent(value) {
    this.hostEle.current.innerHTML = marked(value);
  }

  render() {
    return <div ref={this.hostEle} className="me-previewer" />;
  }
}
