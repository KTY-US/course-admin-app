import API from './helper';

// API Course
export const getCourses = (page, rowsPerPage, sortMode, accountId) =>
	API.get(`/courses/all?accountId=${accountId ? '' : accountId}&page=${page}&rowsPerPage=${rowsPerPage}&sortMode=${sortMode}`);
export const getCourseDetails = (id) => API.get(`/courses/${id}`);
export const checkOwner = (courseId, userId) => API.get(`/courses/check-owner/${courseId}/${userId}`);

