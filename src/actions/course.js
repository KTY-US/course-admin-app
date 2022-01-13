import { toast } from 'react-toastify';

import * as api from '../apis/course.js';
import { courseActions } from '../reducers/course.js';
import { courseDetailActions } from '../reducers/courseDetail.js';
import { getUserInformationFromStorage } from '../helpers/localStorage';

export const getCourses = (page, rowPerPage, userId) => async (dispatch) => {
	try {
		dispatch(courseActions.changeIsLoading(true));
		const { data } = await api.getCourses(page, rowPerPage, userId);
		dispatch(courseActions.storeCourses(data));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(courseActions.changeIsLoading(false));
	}
};

export const getCourseDetails = async (id) => async (dispatch) => {
	try {
		dispatch(courseActions.changeIsLoading(true));
		const { data: course } = await api.getCourseDetails(id);
		dispatch(courseDetailActions.storeCourseDetails(course));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(courseActions.changeIsLoading(false));
	}
};

export const checkOwner = async (courseId) => {
	try {
		const { userId } = getUserInformationFromStorage();
		const { data } = await api.checkOwner(courseId, userId);
		return data;
	} catch (error) {
		//toast.error(error.message);
	} finally {
		//not thing
	}
};
