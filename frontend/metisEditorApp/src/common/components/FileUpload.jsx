import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

export default class FileUpload extends React.Component {
  static defaultProps = {
    loading: false,
    icon: '',
    disabled: false,
    text: '',
    className: '',
    onUpload: () => null,
  };

  static propTypes = {
    loading: PropTypes.bool,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string,
    onUpload: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { onUpload } = this.props;
    const dom = this.fileInput.current;
    const formData = new FormData();
    for (let file of dom.files) {
      formData.append('attachments', file, file.name);
    }
    onUpload(formData);
  }

  onClickHandler = () => {
    this.fileInput.current.click();
  }

  render() {
    const { loading, icon, disabled, text, className } = this.props;
    const iconClass = classNames({
      'fas fa-sync-alt sync-animation': loading,
      [icon]: !loading,
    });
    const tooltip = loading ? '同步中' : text;
    return (
      <Tooltip title={tooltip} className={className}>
        <form style={{ display: 'inline-block' }}>
          <input type="file" name="attachment" className="me-hidden" ref={this.fileInput} onChange={this.onSubmitHandler} />
          <IconButton disabled={disabled} color="primary" onClick={this.onClickHandler}>
            <Icon className={iconClass} fontSize="inherit" />
          </IconButton>
        </form>
      </Tooltip>
    );
  }
}
