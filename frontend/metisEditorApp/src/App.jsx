import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import ContextMenuContext from './common/contexts/ContextMenuContext';
import Snackbar from './common/components/Snackbar';

import DocPanel from './docPanel';
import DocListPanel from './docListPanel';
import FolderTreePanel from './folderPanel';
import MenuBar from './menuBar';

import { hideMessage } from './common/actions';
import './common/scss/style.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#563d7c',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {
  state = {
    contextMenu: null,
  }

  showContextMenu = (x, y, options) => {
    this.setState({
      contextMenu: {
        x, y, options,
      },
    });
  }

  closeContextMenu = () => {
    this.setState({
      contextMenu: null,
    });
  }

  closeSnackbar = () => {
    const { dispatch } = this.props;
    dispatch(hideMessage());
  }

  renderContextMenu() {
    const { contextMenu } = this.state;
    if (contextMenu) {
      return (
        <Menu
          anchorPosition={{ left: contextMenu.x, top: contextMenu.y }}
          open
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          anchorReference="anchorPosition"
          onClose={this.closeContextMenu}>
          {
            contextMenu.options.map(option => (
              <MenuItem
                key={option.label}
                className='me-ctx-item'
                onClick={() => {
                  option.action();
                  this.closeContextMenu();
                }}>
                {option.label}
              </MenuItem>))
          }
        </Menu>);
    }
    return null;
  }

  renderSnackbar() {
    const { snackbarMessage } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={snackbarMessage.show}
        autoHideDuration={6000}
        onClose={this.closeSnackbar}
        message={snackbarMessage.text}
        type={snackbarMessage.type}
      />
    );
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <MenuBar />
          <ContextMenuContext.Provider value={{ showContextMenu: this.showContextMenu }}>
            <main className="me-main row">
              <div className="col-2 me-panel">
                <FolderTreePanel />
              </div>
              <div className="col-2 me-panel">
                <DocListPanel />
              </div>
              <div className="col-8 me-panel">
                <DocPanel />
              </div>
            </main>
          </ContextMenuContext.Provider>
          { this.renderContextMenu() }
          { this.renderSnackbar() }
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default connect(state => ({
  snackbarMessage: state.editorState.message,
}))(App);
