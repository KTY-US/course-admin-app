import API from './helper';

// User APIs

export const getUsers = (page, rowsPerPage, sortMode, searchString) =>
	API.get(`/users?page=${page}&rowsPerPage=${rowsPerPage}&sortMode=${sortMode}&search=${searchString}`);

export const getUser = (userId) => API.get(`/users/${userId}`);

export const changeStatus = (userId) => API.put(`/users/change-lock-status/${userId}`);

export const checkUserCode = (data) => API.post(`/users/check-code/${data.userId}`, { code: data.code });
