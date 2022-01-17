import { createSlice } from '@reduxjs/toolkit';

const initialCourseDetailState = {
	details: null,
	isLoading: false
};

const courseDetailSlice = createSlice({
	name: 'courseDetail',
	initialState: initialCourseDetailState,
	reducers: {
		changeIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		storeCourseDetails(state, action) {
			state.details = action.payload;
		},
	}
});

export const courseDetailActions = courseDetailSlice.actions;

export default courseDetailSlice;
