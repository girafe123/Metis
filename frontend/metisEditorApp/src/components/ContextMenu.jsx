import React from 'react';

const ContextMenu = (props) => {
  const { options, x, y, afterAction, contextMenuRef } = props;
  return <div className="dropdown-menu me-context-menu" ref={contextMenuRef} style={{ left: x, top: y, display: 'block' }}>
    {
      options.map((item, i) => {
        return <a key={i} 
          className="dropdown-item" 
          href="#" 
          onClick={() => {
            item.action();
            afterAction(item);
          }}>
            {item.label}
        </a>
      })
    }
  </div>
}

export default ContextMenu;
