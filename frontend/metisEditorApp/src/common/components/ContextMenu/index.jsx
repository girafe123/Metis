import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const ContextMenu = (props) => {
  const { options, x, y, afterAction, contextMenuRef } = props;
  return (
    <div className="dropdown-menu me-context-menu" ref={contextMenuRef} style={{ left: x, top: y, display: 'block' }}>
      {
        options.map(item => (
          <a key={item.label}
            className="dropdown-item"
            href="#"
            onClick={() => {
              item.action();
              afterAction(item);
            }}>
            {item.label}
          </a>))
      }
    </div>
  );
};

ContextMenu.propTypes = {
  options: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  afterAction: PropTypes.func,
  contextMenuRef: PropTypes.object,
};

ContextMenu.defaultProps = {
  afterAction: () => null,
};

export default ContextMenu;
