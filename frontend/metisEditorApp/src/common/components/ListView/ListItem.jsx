import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { DocumentType } from '../../utils/Enums';

const DocumentTypeIcons = {
  [DocumentType.Markdown]: 'fab fa-markdown',
  unknown: 'far fa-question-circle',
};


export default class ListItem extends React.PureComponent {
  clickHandler = () => {
    const { onClick, item } = this.props;
    onClick(item);
  }

  contextMenuHandler = (e) => {
    const { onContextMenu, item } = this.props;
    e.stopPropagation();
    e.preventDefault();
    onContextMenu(e.clientX, e.clientY, item);
  }

  render() {
    const { item, active } = this.props;
    const className = classNames({
      active,
    }, 'me-doc-item');
    const isPublicClassName = classNames({
      'far fa-eye': item.isPublic,
      'far fa-eye-slash': !item.isPublic,
    });
    return (
      <li className={className} onContextMenu={this.contextMenuHandler}>
        <a onClick={this.clickHandler}>
          <header className="text-ellipsis">{item.title}</header>
          <div className="row me-doc-item-body">
            <div className="col-6 text-left">
              <i className={DocumentTypeIcons[item.type] || DocumentTypeIcons.unknown} />
            </div>
            <div className="col-6 text-right">
              <span className="me-doc-time mr-3">{moment(item.updateTime).fromNow()}</span>
              <i className={isPublicClassName} />
            </div>
          </div>
        </a>
      </li>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  onContextMenu: PropTypes.func,
};

ListItem.defaultProps = {
  onClick: () => null,
  onContextMenu: () => null,
  active: false,
};
