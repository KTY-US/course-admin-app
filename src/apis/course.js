import API from './helper';

// API Course
export const getCourses = (page, rowsPerPage, userId) =>
	API.get(`/courses?userId=${userId}&page=${page}&rowsPerPage=${rowsPerPage}`);
export const getMyCourses = (userId) => API.get(`/courses/my-courses/${userId}`);
export const getJoinedCourses = (userId) => API.get(`/courses/joined-courses/${userId}`);
export const getCourseDetails = (id) => API.get(`/courses/${id}`);
export const createCourse = (form) => API.post('/courses', form);

export const updateCourse = (form) => API.post(`/courses/update-course/${form.courseId}`, form);
export const checkCourseCode = (data) => API.post('/courses/check-courseCode', data);
export const deleteCourse = (courseId) => API.delete(`/courses/delete/${courseId}`);
export const getCourseByIdAndCode = (id, code) => API.get(`/courses/${id}?code=${code}`);
export const checkCourseByCode = (code) => API.get(`/courses/check-by-code/${code}`);
export const checkOwner = (courseId, userId) => API.get(`/courses/check-owner/${courseId}/${userId}`);

export const getAllStudentOfCourse = (courseId) => API.get(`/students-course-list/get-all${courseId}`);
