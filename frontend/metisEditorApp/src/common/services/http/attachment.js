import axios from 'axios';

export async function getAttachments(doc) {
  try {
    const response = await axios.get('/api/upload', {
      params: { doc },
    });
    return response.data;
  } catch (e) {
    return [];
  }
}
export async function uploadAttachment(documentId, formData) {
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
export async function deleteAttachment(id) {
  try {
    const response = await axios.delete(`/api/upload/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
}
