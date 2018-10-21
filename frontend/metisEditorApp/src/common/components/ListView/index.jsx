import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';
import Scrollbar from '../Scrollbar';
import './style.scss';

export default class ListView extends React.PureComponent {
  static defaultProps = {
    value: '',
    onSelect: () => null,
    list: [],
    onContextMenu: () => null,
  };

  static propTypes = {
    value: PropTypes.number,
    onSelect: PropTypes.func,
    list: PropTypes.array,
    onContextMenu: PropTypes.func,
  };

  clickHandler = (item) => {
    const { onSelect, value } = this.props;
    if (item.id !== value) {
      onSelect(item);
    }
  }

  render() {
    const { list, value, onContextMenu } = this.props;
    return (
      <Scrollbar>
        <ul className="me-doc-list">
          {
            list.map(item => <ListItem item={item} active={value === item.id} key={item.id} onClick={this.clickHandler} onContextMenu={onContextMenu} />)
          }
        </ul>
      </Scrollbar>
    );
  }
}
