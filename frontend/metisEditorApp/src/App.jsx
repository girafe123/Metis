import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Snackbar from '@material-ui/core/Snackbar';

import ContextMenu from './common/components/ContextMenu';
import ContextMenuContext from './common/contexts/ContextMenuContext';
import Snackbar from './common/components/Snackbar';

import DocPanel from './docPanel';
import DocListPanel from './docListPanel';
import FolderTreePanel from './folderPanel';
import MenuBar from './menuBar';

import { hideMessage } from './common/actions';
import './common/scss/style.scss';

class App extends React.Component {
  popoverDom = document.querySelector('#popover');

  contextMenuRef = React.createRef();

  state = {
    contextMenu: null,
  }

  componentDidMount() {
    document.addEventListener('click', this.captureCloseContextMenu, true);
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

  captureCloseContextMenu = (e) => {
    const host = this.contextMenuRef.current;
    if (host && host.contains(e.target)) {
      return;
    }

    this.closeContextMenu();
  }

  closeSnackbar = () => {
    const { dispatch } = this.props;

    dispatch(hideMessage());
  }

  renderContextMenu() {
    const { contextMenu } = this.state;

    if (contextMenu) {
      return createPortal(
        <ContextMenu
          contextMenuRef={this.contextMenuRef}
          options={contextMenu.options}
          afterAction={this.closeContextMenu}
          x={contextMenu.x}
          y={contextMenu.y}
        />, this.popoverDom,
      );
    }

    return null;
  }

  renderSnackbar() {
    const { snackbarMessage } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
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
        <MenuBar />
        <ContextMenuContext.Provider value={{ showContextMenu: this.showContextMenu }}>
          <main className="me-main container-fluid row">
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
      </Fragment>
    );
  }
}

export default connect(state => ({
  snackbarMessage: state.editorState.message,
}))(App);
