import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import ToggleButton from '../common/components/ToggleButton';
import LoadingButton from '../common/components/LoadingButton';

const editOptions = [{
  icon: 'fas fa-pencil-alt',
  value: 'preview',
  text: '编辑',
}, {
  icon: 'fas fa-list',
  value: 'edit',
  text: '预览',
}];

export default class ToolBar extends React.PureComponent {
  static defaultProps = {
    title: '',
    onTitleChange: () => null,
    onSave: () => null,
    onSwitch: () => null,
    onDownload: () => null,
    mode: 'edit',
    isSaveLoading: false,
    isSaveDisabled: false,
    isPublic: false,
    onIsPublicChange: () => null,
    onShowAttachmentDialog: () => null,
  };

  static propTypes = {
    title: PropTypes.string,
    onTitleChange: PropTypes.func,
    onDownload: PropTypes.func,
    onSave: PropTypes.func,
    onSwitch: PropTypes.func,
    mode: PropTypes.string,
    isSaveLoading: PropTypes.bool,
    isSaveDisabled: PropTypes.bool,
    isPublic: PropTypes.bool,
    onIsPublicChange: PropTypes.func,
    onShowAttachmentDialog: PropTypes.func,
  };

  onTitleChange = (e) => {
    const { onTitleChange } = this.props;
    onTitleChange(e.target.value);
  };

  onIsPublicChange = (e) => {
    const { onIsPublicChange } = this.props;
    onIsPublicChange(e.target.checked);
  };

  onSave = (e) => {
    const { onSave } = this.props;
    onSave(e.target.value);
  };

  render() {
    const { title, mode, isSaveLoading, onSwitch, isSaveDisabled, isPublic, onDownload, onShowAttachmentDialog } = this.props;
    return (
      <div className="me-tool-bar">
        <div className="row">
          <div className="col-6 me-tool-doc-title">
            <TextField
              value={title}
              onChange={this.onTitleChange}
              fullWidth
            />
          </div>
          <div className="col-3 text-center">
            <FormControlLabel
              control={(
                <Switch
                  checked={isPublic}
                  onChange={this.onIsPublicChange}
                  color="primary"
                />
              )}
              label="公开的"
            />
          </div>
          <div className="col-3 me-tool-doc-btns">
            <Tooltip title="图片">
              <IconButton onClick={onShowAttachmentDialog} color="primary">
                <Icon className="far fa-image" fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="导出">
              <IconButton onClick={onDownload} color="primary">
                <Icon className="fas fa-download" fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <LoadingButton icon="far fa-save" text="保存" loading={isSaveLoading} onClick={this.onSave} disabled={isSaveDisabled} />
            <ToggleButton options={editOptions} value={mode} onChange={onSwitch} />
          </div>
        </div>
      </div>
    );
  }
}
