import axios from 'axios';

const API = axios.create({ baseURL: 'https://100058.pythonanywhere.com/api/get-data-by-collection/'})


export const createDocument = (newDoc) => API.post('/documents', newDoc);

