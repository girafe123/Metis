import React from 'react';
import './style.scss';

export default class MenuBar extends React.PureComponent {
  render() {
    return (
      <div className="me-menu-bar">
        <a className="me-logo" href="/">Metis</a>

        <a className="float-right" href="/accounts/logout">
          <i className="fas fa-sign-out-alt" />
        </a>
      </div>
    );
  }
}
