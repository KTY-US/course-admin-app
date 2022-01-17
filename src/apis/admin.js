import API from './helper';

// User APIs

export const createAdmin = (data) => API.post('/admins/create', data);

export const getAdmins = (page, rowsPerPage, sortMode, searchString) =>
	API.get(`/admins?page=${page}&rowsPerPage=${rowsPerPage}&sortMode=${sortMode}&search=${searchString}`);

export const getAdmin = (userId) => API.get(`/admins/${userId}`);
