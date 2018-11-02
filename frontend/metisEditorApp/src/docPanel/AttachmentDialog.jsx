import React from 'react';
import update from 'immutability-helper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import FileUpload from '../common/components/FileUpload';
import ImgGridList from '../common/components/ImgGridList';
import LoadingBlock from '../common/components/LoadingBlock';
import EmptyPanel from '../common/components/EmptyPanel';

import { uploadAttachment, getAttachments, deleteAttachment } from '../common/services/http';

export default class AttachmentDialog extends React.PureComponent {
  state = {
    imgs: [],
    loading: true,
    uploading: false,
  };

  componentDidMount() {
    const { documentId } = this.props;
    getAttachments(documentId).then((data) => {
      this.setState({
        imgs: data,
        loading: false,
      });
    });
  }

  onUploadHandler = (files) => {
    const { documentId } = this.props;
    this.setState({
      uploading: true,
    });

    const formData = new FormData();
    for (let file of files) {
      formData.append('attachments', file, file.name);
    }
    uploadAttachment(documentId, formData).then((img) => {
      this.setState(update(this.state, {
        uploading: { $set: false },
        imgs: {
          $unshift: [img],
        },
      }));
    });
  }

  onCopyHandler = (item) => {
    navigator.clipboard.writeText(item.file);
  }

  onDeleteHandler = (item, index) => {
    deleteAttachment(item.id).then((img) => {
      this.setState(update(this.state, {
        imgs: {
          $splice: [[index, 1]],
        },
      }));
    });
  }

  render() {
    const { onClose } = this.props;
    const { imgs, loading, uploading } = this.state;
    return (
      <Dialog
        open
        onClose={onClose}
        fullWidth
      >
        <DialogTitle>
          图片
          <FileUpload icon="fas fa-plus" className="float-right" onUpload={this.onUploadHandler} loading={uploading} text="添加图片" />
        </DialogTitle>
        <DialogContent>
          <LoadingBlock loading={loading}>
            {
              imgs.length ? <ImgGridList items={imgs} onCopy={this.onCopyHandler} onDelete={this.onDeleteHandler} /> : <EmptyPanel text="没有任何图片" icon="far fa-sticky-note" className="me-attachment-dialog" />
            }
          </LoadingBlock>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
