import axios from 'axios';

export async function getDocuments(folder, isDelete) {
  try {
    const response = await axios.get('/api/document', {
      params: { folder, isDelete },
    });
    return response.data;
  } catch (e) {
    return [];
  }
}
export async function getDocument(id) {
  try {
    const response = await axios.get(`/api/document/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
}
export async function createDocument(doc) {
  try {
    const response = await axios.post('/api/document', doc);
    return response.data;
  } catch (e) {
    return null;
  }
}
export async function updateDocument(doc) {
  try {
    const response = await axios.put(`/api/document/${doc.id}`, doc);
    return response.data;
  } catch (e) {
    return null;
  }
}

export async function deleteDocument(id) {
  try {
    const response = await axios.delete(`/api/document/${id}`);
    return response.data;
  } catch (e) {
    return null;
  }
}
