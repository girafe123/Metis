import axios from 'axios';

export async function getFolders(isDelete) {
  try {
    const response = await axios.get('/api/folder', {
      params: { isDelete },
    });
    return response.data;
  } catch (e) {
    return [];
  }
}
export async function createFolder(folder) {
  try {
    const response = await axios.post('/api/folder', folder);
    return response.data;
  } catch (e) {
    return null;
  }
}
export async function deleteFolder(folderId) {
  try {
    const response = await axios.delete(`/api/folder/${folderId}`);
    return response.data;
  } catch (e) {
    return null;
  }
}
export async function updateFolder(folder) {
  try {
    const response = await axios.put(`/api/folder/${folder.id}`, folder);
    return response.data;
  } catch (e) {
    return null;
  }
}
