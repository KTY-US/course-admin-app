import API from './helper';

// API Course
export const getCourses = (page, rowsPerPage, userId) =>
	API.get(`/courses?userId=${userId}&page=${page}&rowsPerPage=${rowsPerPage}`);
export const getCourseDetails = (id) => API.get(`/courses/${id}`);
export const checkOwner = (courseId, userId) => API.get(`/courses/check-owner/${courseId}/${userId}`);
