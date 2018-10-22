import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-day.css';
import './style.scss';

export default class Editor extends React.PureComponent {
  static defaultProps = {
    value: '',
    onChange: () => null,
  };

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  hostEle = React.createRef();

  componentDidMount() {
    const { value, onChange } = this.props;
    this.editor = CodeMirror(this.hostEle.current, {
      mode: 'markdown',
      value,
      theme: '3024-day',
      scrollbarStyle: 'simple'
    });
    this.editor.on('change', (cm) => {
      const v = cm.getValue();
      onChange(v);
    });
  }

  componentWillUnmount() {
    this.editor = null;
  }

  render() {
    return (<div ref={this.hostEle} className="me-editor" />);
  }
}
