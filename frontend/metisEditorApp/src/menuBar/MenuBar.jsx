import React from 'react';
import './style.scss';

export default class MenuBar extends React.PureComponent {
  render() {
    return (
      <div className="me-menu-bar">
        <a className="me-logo">Metis</a>
      </div>
    );
  }
}
