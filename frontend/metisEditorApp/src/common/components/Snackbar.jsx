import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import { MessageType } from '../utils/Enums';

const variantIcon = {
  [MessageType.Success]: CheckCircleIcon,
  [MessageType.Warning]: WarningIcon,
  [MessageType.Error]: ErrorIcon,
  [MessageType.Info]: InfoIcon,
};

const styles = theme => ({
  [MessageType.Success]: {
    backgroundColor: green[600],
  },
  [MessageType.Error]: {
    backgroundColor: theme.palette.error.dark,
  },
  [MessageType.Info]: {
    backgroundColor: theme.palette.primary.dark,
  },
  [MessageType.Warning]: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MeSnackbar(props) {
  const { classes, className, message, onClose, type, autoHideDuration, open, anchorOrigin } = props;
  const Icon = variantIcon[type];

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}>
      <SnackbarContent
        className={classNames(classes[type], className)}
        message={(
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        )}
      />
    </Snackbar>
  );
}

export default withStyles(styles)(MeSnackbar);
