import React from 'react';
import ToggleButton from './ToggleButton';
import LoadingButton from './LoadingButton';

const editOptions = [{
  icon: 'far fa-edit',
  value: 'edit',
}, {
  icon: 'fas fa-file-invoice',
  value: 'preview',
}];

export default class ToolBar extends React.Component {
  onEditModeChange = (v) => {
    this.props.onSwitch(v);
  };

  onTitleChange = (e) => {
    this.props.onTitleChange(e.target.value);
  };

  onSave = (e) => {
    this.props.onSave(e.target.value);
  };

  render() {
    const { title, mode, isSaveLoading } = this.props;
    return <div className="me-tool-bar">
      <div className="row">
        <div className="col me-tool-doc-title">
          <input value={title} onChange={this.onTitleChange} spellCheck="false"/>
        </div>
        <div className="col">
          <div className="float-left">
            <LoadingButton icon="far fa-save" loading={isSaveLoading} onClick={this.onSave}/>
            <ToggleButton options={editOptions} value={mode} onChange={this.onEditModeChange}/>
          </div>
        </div>
      </div>
    </div>
  }
}