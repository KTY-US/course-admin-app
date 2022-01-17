import { toast } from 'react-toastify';

import * as api from '../apis/course.js';
import { courseActions } from '../reducers/course.js';
import { courseDetailActions } from '../reducers/courseDetail.js';
// import { getUserInformationFromStorage } from '../helpers/localStorage';

export const getCourses = (page, rowPerPage, sortMode, searchString) => async (dispatch) => {
	try {
		dispatch(courseActions.changeIsLoading(true));
		const { data } = await api.getCourses(page, rowPerPage, sortMode, searchString);
		dispatch(courseActions.storeCourses(data));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(courseActions.changeIsLoading(false));
	}
};


export const getCourseDetails = (id) => async (dispatch) => {
	try {
		dispatch(courseDetailActions.changeIsLoading(true));
		const { data: course } = await api.getCourseDetails(id);
		dispatch(courseDetailActions.storeCourseDetails(course));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(courseDetailActions.changeIsLoading(false));
	}
};
