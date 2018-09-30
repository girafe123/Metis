import React, { Fragment } from 'react';

const ContextMenuContext = React.createContext({
  showContextMenu: () => null,
});

export default ContextMenuContext;
