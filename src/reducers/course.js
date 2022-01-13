import { createSlice, current } from '@reduxjs/toolkit';

const initialCourseState = {
	isLoading: true,
	courses: [],
	total: 0,
	myCourses: [],
	joinedCourses: []
};

const courseSlice = createSlice({
	name: 'course',
	initialState: initialCourseState,
	reducers: {
		changeIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		storeCourses(state, action) {
			state.courses = action.payload.courses;
			state.total = action.payload.total;
		},
		createCourse(state, action) {
			state.courses = [...state.courses, action.payload];
		},
		storeMyCourses(state, action) {
			state.myCourses = action.payload;
		},
		storeJoinedCourses(state, action) {
			state.joinedCourses = action.payload;
		},
		leaveCourse(state, action) {
			const currentState = current(state);
			const courseId = action.payload;
			const joinedCourses = [];
			currentState.joinedCourses.forEach((course) => {
				if (course.id !== courseId) {
					joinedCourses.push(course);
				}
			});
			state.joinedCourses = joinedCourses;
		},
		deleteCourse(state, action) {
			const currentState = current(state);
			const courseId = action.payload;
			const myCourses = [];
			currentState.myCourses.forEach((course) => {
				if (course.id !== courseId) {
					myCourses.push(course);
				}
			});
			state.myCourses = myCourses;
		}
	}
});

export const courseActions = courseSlice.actions;

export default courseSlice;
