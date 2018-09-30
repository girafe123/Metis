import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';

import MenuBar from './components/MenuBar';

import DocPanel from './containers/DocPanel';
import DocListPanel from './containers/DocListPanel';
import FolderTreePanel from './containers/FolderTreePanel';

import ContextMenu from './components/ContextMenu';
import ContextMenuContext from './contexts/ContextMenuContext';

export default class App extends React.Component {
  popoverDom = document.querySelector('#popover');
  contextMenuRef = React.createRef();

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

  renderContextMenu() {
    const { contextMenu } = this.state;

    if (contextMenu) {
      return createPortal(<ContextMenu contextMenuRef={this.contextMenuRef} options={contextMenu.options} afterAction={this.closeContextMenu} x={contextMenu.x} y={contextMenu.y}/>, this.popoverDom);
    }

    return null;
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

    this.closeContextMenu()
  }

  componentDidMount() {
    document.addEventListener('click', this.captureCloseContextMenu, true);
  }

  render() {
    return(<Fragment>
      <MenuBar />
      <ContextMenuContext.Provider value={{ showContextMenu: this.showContextMenu }}>
      <main className="me-main container-fluid row">
        <div className="col-2 me-folder-panel">
          <FolderTreePanel />
        </div>
        <div className="col-2 me-doc-panel">
          <DocListPanel />
        </div>
        <div className="col-8 me-editor-panel">
          <DocPanel />
        </div>
      </main>
      </ContextMenuContext.Provider>
      { this.renderContextMenu() }
    </Fragment>);
  }
}
