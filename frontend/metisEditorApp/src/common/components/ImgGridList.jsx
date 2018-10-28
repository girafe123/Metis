import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Scrollbar from './Scrollbar';

const styles = theme => ({
  root: {
    height: 400,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: 12,
  },
});

function ImgGridList(props) {
  const { classes, items, onDelete, onCopy } = props;

  return (
    <div className={classes.root}>
      <Scrollbar>
        <GridList cellHeight={150} className={classes.gridList}>
          {items.map((item, i) => (
            <GridListTile key={item.id}>
              <img src={item.file} alt={item.name} />
              <GridListTileBar
                title={item.name}
                actionIcon={(
                  <Fragment>
                    <IconButton className={classes.icon} onClick={() => onDelete(item, i)}>
                      <Icon className="far fa-trash-alt" fontSize="inherit" />
                    </IconButton>
                    <IconButton className={classes.icon} onClick={() => onCopy(item, i)}>
                      <Icon className="far fa-copy" fontSize="inherit" />
                    </IconButton>
                  </Fragment>
                )}
            />
            </GridListTile>
          ))}
        </GridList>
      </Scrollbar>
    </div>
  );
}

ImgGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

ImgGridList.defaultProps = {
  items: [],
};

export default withStyles(styles)(ImgGridList);
