import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

async function getDocuments(folder) {
  try {
    const response = await axios.get('/api/document', {
      params: { folder },
    });
    return response.data;
  } catch (e) {
    return [];
  }
}
async function getDocument(id) {
  try {
    const response = await axios.get(`/api/document/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
}
async function createDocument(doc) {
  try {
    const response = await axios.post('/api/document', doc);
    return response.data;
  } catch (e) {
    return null;
  }
}
async function updateDocument(doc) {
  try {
    const response = await axios.put(`/api/document/${doc.id}`, doc);
    return response.data;
  } catch (e) {
    return null;
  }
}

async function deleteDocument(id) {
  try {
    const response = await axios.delete(`/api/document/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
}

async function getFolders() {
  try {
    const response = await axios.get('/api/folder');
    return response.data;
  } catch (e) {
    return [];
  }
}
async function createFolder(folder) {
  try {
    const response = await axios.post('/api/folder', folder);
    return response.data;
  } catch (e) {
    return null;
  }
}
async function deleteFolder(folderId) {
  try {
    const response = await axios.delete(`/api/folder/${folderId}`);
    return response.data;
  } catch (e) {
    return null;
  }
}
async function updateFolder(folder) {
  try {
    const response = await axios.put(`/api/folder/${folder.id}`, folder);
    return response.data;
  } catch (e) {
    return null;
  }
}

async function getAttachments(doc) {
  try {
    const response = await axios.get('/api/upload', {
      params: { doc },
    });
    return response.data;
  } catch (e) {
    return [];
  }
}
async function uploadAttachment(documentId, formData) {
  formData.set('document', documentId);
  try {
    const response = await axios.request({
      url: '/api/upload',
      method: 'post',
      data: formData,
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (e) {
    return null;
  }
}
async function deleteAttachment(id) {
  try {
    const response = await axios.delete(`/api/upload/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
}
export {
  getDocuments,
  getDocument,
  updateDocument,
  createDocument,
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
  deleteDocument,
  uploadAttachment,
  getAttachments,
  deleteAttachment,
};
