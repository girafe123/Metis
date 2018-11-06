import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class RecycleBinFile extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onCheck: PropTypes.func,
  };

  static defaultProps = {
    type: 'folder',
    name: '',
    checked: false,
    onCheck: () => null,
  };

  render() {
    const { type, name, checked, onCheck } = this.props;
    const isFolder = type === 'folder';
    const icon = classNames({
      'far fa-folder': isFolder,
      'far fa-sticky-note': !isFolder,
    });
    const tileClass = classNames({
      active: checked,
    }, 'me-folder-tile');
    return (
      <a className={tileClass} onClick={() => onCheck(!checked)}>
        <i className={icon} />
        <p className="text-ellipsis">{name}</p>
      </a>
    );
  }
}
