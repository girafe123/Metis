import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

async function getDocuments() {
  try {
    const response = await axios.get('/api/document');
    console.log(response);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

async function getDocument(id) {
  try {
    const response = await axios.get('/api/document/' + id);
    console.log(response);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

async function updateDocument(doc) {
  try {
    const response = await axios.post('/api/document/edit', doc);
    console.log(response);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export {
  getDocuments,
  getDocument,
  updateDocument,
}