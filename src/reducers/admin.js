import { createSlice } from '@reduxjs/toolkit';

const initialAdminState = {
	isLoading: true,
	admins: [],
	total: 0
};

const adminSlice = createSlice({
	name: 'admin',
	initialState: initialAdminState,
	reducers: {
		changeIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		storeUsers(state, action) {
			state.admins = action.payload.admins;
			state.total = action.payload.total;
		}
	}
});

export const adminActions = adminSlice.actions;

export default adminSlice;
