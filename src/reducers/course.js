import { createSlice } from '@reduxjs/toolkit';

const initialCourseState = {
	isLoading: true,
	courses: [],
	total: 0
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
		}
	}
});

export const courseActions = courseSlice.actions;

export default courseSlice;
