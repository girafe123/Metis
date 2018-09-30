import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-day.css';
import '../scss/style.scss';

export default class Editor extends React.PureComponent {
  static defaultProps = {
    value: '',
  }
  hostEle = React.createRef();
  componentDidMount() {
    this.editor = CodeMirror(this.hostEle.current, {
      mode: 'markdown',
      value: this.props.value,
      theme: '3024-day'
    });
    this.editor.on('change', (cm, obj) => {
      const value = cm.getValue();
      this.props.onChange(value);
    })
  }

  componentWillUnmount() {
    this.editor = null;
  }

  render() {
    return <div ref={this.hostEle} className="me-editor"></div>;
  }
}