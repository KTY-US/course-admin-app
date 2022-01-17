import API from './helper';

// User APIs

export const createAdmin = (data) => API.post('/admins/create', data);
