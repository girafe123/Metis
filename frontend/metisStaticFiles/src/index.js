import CodeMirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
const editor = CodeMirror.fromTextArea(document.getElementById("docEditor"), {
    mode: 'markdown',
    lineNumbers: true
});