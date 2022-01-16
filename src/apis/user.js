import API from './helper';

// User APIs

export const getUsers = (page, rowsPerPage, sortMode) =>
	API.get(`/users?page=${page}&rowsPerPage=${rowsPerPage}&sortMode=${sortMode}`);
