import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = (props) => {
  const { open, onCancel, title, message, onOk } = props;
  return (
    <Dialog
      open={open}
      onClose={onCancel}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          取消
        </Button>
        <Button onClick={onOk} color="primary" autoFocus>
          确定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
};

ConfirmDialog.defaultProps = {
  open: false,
  onOk: () => null,
  onCancel: () => null,
  title: '',
};


export default ConfirmDialog;
