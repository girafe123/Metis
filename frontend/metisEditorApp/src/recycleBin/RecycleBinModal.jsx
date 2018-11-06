import React from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import Scrollbar from '../common/components/Scrollbar';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';

import { queryRecyleBin, restoreFolderAndDocument, deleteFolderAndDocument } from './actions';
import RecycleBinFile from './RecycleBinFile';

import './style.scss';

class RecycleBinModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const { recycleBin: { folders, documents } } = props;
    this.state = {
      selectedFolder: folders.reduce((res, item) => {
        res[item.id] = false;
        return res;
      }, {}),
      selectedDoc: documents.reduce((res, item) => {
        res[item.id] = false;
        return res;
      }, {}),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(queryRecyleBin());
  }

  onRestore = () => {
    const { dispatch } = this.props;
    const { selectedFolder, selectedDoc } = this.state;
    const folders = Object.keys(selectedFolder).filter(id => selectedFolder[id]);
    const docs = Object.keys(selectedDoc).filter(id => selectedDoc[id]);
    dispatch(restoreFolderAndDocument(folders, docs));
    this.setState({
      selectedFolder: [],
      selectedDoc: [],
    });
  };

  onDelete = () => {
    const { dispatch } = this.props;
    const { selectedFolder, selectedDoc } = this.state;
    const folders = Object.keys(selectedFolder).filter(id => selectedFolder[id]);
    const docs = Object.keys(selectedDoc).filter(id => selectedDoc[id]);
    dispatch(deleteFolderAndDocument(folders, docs));
    this.setState({
      selectedFolder: [],
      selectedDoc: [],
    });
  }

  toggleFolderSelect = (id, v) => {
    this.setState(update(this.state, {
      selectedFolder: {
        [id]: {
          $set: v,
        },
      },
    }));
  };

  toggleDocSelect = (id, v) => {
    this.setState(update(this.state, {
      selectedDoc: {
        [id]: {
          $set: v,
        },
      },
    }));
  };

  onRefresh = () => {
    const { dispatch } = this.props;
    dispatch(queryRecyleBin());
  }

  renderContent() {
    const { recycleBin } = this.props;
    const { selectedFolder, selectedDoc } = this.state;
    return (
      <Scrollbar>
        {
          recycleBin.folders.map((folder) => {
            return (
              <RecycleBinFile
                key={`f${folder.id}`}
                type="folder"
                name={folder.name}
                checked={selectedFolder[folder.id]}
                onCheck={v => this.toggleFolderSelect(folder.id, v)} />
            );
          })
        }
        {
          recycleBin.documents.map((doc) => {
            return (
              <RecycleBinFile
                key={`d${doc.id}`}
                type="document"
                name={doc.title}
                checked={selectedDoc[doc.id]}
                onCheck={v => this.toggleDocSelect(doc.id, v)} />
            );
          })
        }
      </Scrollbar>
    );
  }

  render() {
    const { onClose, recycleBin, showLoading } = this.props;
    const { selectedFolder, selectedDoc } = this.state;
    const hasSelect = Object.keys(selectedFolder).length > 0 || Object.keys(selectedDoc).length > 0;
    const showEmpty = recycleBin.folders.length === 0 && recycleBin.documents.length === 0;

    return (
      <Dialog
        open
        onClose={onClose}
        fullWidth
      >
        <DialogTitle>回收站</DialogTitle>
        <DialogContent>
          <LoadingBlock loading={showLoading}>
            <div className="me-recyle-bin clearfix">
              { showEmpty ? <EmptyPanel text="没有任何文件" icon="far fa-sticky-note" /> : this.renderContent() }
            </div>
          </LoadingBlock>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onRefresh} color="primary">
            刷新
          </Button>
          <Button onClick={this.onRestore} color="primary" disabled={!hasSelect}>
            还原
          </Button>
          <Button onClick={this.onDelete} color="primary" disabled={!hasSelect}>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect((state) => {
  return {
    recycleBin: state.editor.recycleBin,
    showLoading: state.editorState.isRecycleBinLoading,
  };
})(RecycleBinModal);
