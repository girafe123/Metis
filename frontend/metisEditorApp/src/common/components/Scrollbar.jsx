import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

export default class Scrollbar extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: [],
  };

  constructor(props) {
    super(props);
    this.hostEle = React.createRef();
  }

  componentDidMount() {
    this.ps = new PerfectScrollbar(this.hostEle.current, {
      wheelSpeed: 0.5,
    });
  }

  componentWillUnmount() {
    this.ps.destroy();
    this.ps = null;
  }

  render() {
    const { children } = this.props;
    return (
      <div ref={this.hostEle} style={{ height: '100%', position: 'relative' }}>
        { children }
      </div>
    );
  }
}
