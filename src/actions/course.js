import { toast } from 'react-toastify';

import * as api from '../api/course.js';
import { deleteParticipant } from '../api/participants';
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

export const getMyCourses = (userId) => async (dispatch) => {
	try {
		dispatch(courseActions.changeIsLoading(true));
		const { data } = await api.getMyCourses(userId);
		dispatch(courseActions.storeMyCourses(data));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(courseActions.changeIsLoading(false));
	}
};

export const getJoinedCourses = (userId) => async (dispatch) => {
	try {
		dispatch(courseActions.changeIsLoading(true));
		const { data } = await api.getJoinedCourses(userId);
		dispatch(courseActions.storeJoinedCourses(data));
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

export const createCourse = (form, navigate) => async (dispatch) => {
	try {
		dispatch(courseActions.changeIsLoading(true));
		const { data: newCourse } = await api.createCourse(form);
		dispatch(courseActions.createCourse(newCourse));
		await dispatch(await getCourseDetails(newCourse.id));
		navigate(`../../../courses/${newCourse.id}/c`);
		toast.success('Create new course successful!!!');
	} catch ({ response }) {
		toast.error(response?.data.message);
	} finally {
		dispatch(courseActions.changeIsLoading(false));
	}
};

export const updateCourse = (form, navigate) => async (dispatch) => {
	try {
		dispatch(courseDetailActions.changeIsUpdating(true));
		const { data: course } = await api.updateCourse(form);
		dispatch(courseDetailActions.updateCourse(course));
		navigate(`/courses/${course.id}/c`);
		toast.success('Update course successful!!!');
	} catch ({ response }) {
		toast.error(response?.data.message);
	} finally {
		dispatch(courseDetailActions.changeIsUpdating(false));
	}
};

export const leaveCourse = (userId, courseId) => async (dispatch) => {
	try {
		dispatch(courseActions.changeIsLoading(true));
		const deleteForm = {
			userId: userId,
			courseId: courseId
		};
		await deleteParticipant(deleteForm);
		await dispatch(courseActions.leaveCourse(courseId));
		await dispatch(getJoinedCourses(userId));
		toast.success('Leave course successfully!');
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(courseActions.changeIsLoading(false));
	}
};

export const deleteCourse = (courseId) => async (dispatch) => {
	try {
		const user = getUserInformationFromStorage();
		dispatch(courseActions.changeIsLoading(true));
		await api.deleteCourse(courseId);
		await dispatch(courseActions.deleteCourse(courseId));
		await dispatch(getMyCourses(user.userId));
		toast.success('Delete course successfully!');
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(courseActions.changeIsLoading(false));
	}
};

export const checkCourseByCode = (code) => async () => {
	try {
		const { data: courseId } = await api.checkCourseByCode(code);
		return courseId;
	} catch (error) {
		toast.error(error.message);
	} finally {
		//not thing
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
