import React from 'react';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class FolderFormDialog extends React.PureComponent {
  state = {
    name: '',
    isPublic: false,
    parentId: null,
  };

  componentDidMount() {
    const { folder } = this.props;
    this.setState({
      name: folder.name,
      isPublic: folder.isPublic,
      parentId: folder.parentId,
    });
  }

  onSubmitHandler = () => {
    const { onSubmit, onClose, folder: { id } } = this.props;
    const { name, isPublic, parentId } = this.state;
    onSubmit({
      name,
      isPublic,
      parentId,
      id,
    });
    onClose();
  };

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onIsPublicChange = (e) => {
    this.setState({
      isPublic: e.target.checked,
    });
  }

  render() {
    const { onClose, title } = this.props;
    const { name, isPublic } = this.state;
    return (
      <Dialog
        open
        onClose={this.closeFolderModal}
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            label="名称"
            value={name}
            onChange={this.onNameChange}
            fullWidth
          />
          <div className="text-right">
            <FormControlLabel
              control={(
                <Checkbox
                  checked={isPublic}
                  onChange={this.onIsPublicChange}
                  value="isPublic"
                  color="primary"
                />
              )}
              label="公开的"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSubmitHandler} color="primary">
            确定
          </Button>
          <Button onClick={onClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
