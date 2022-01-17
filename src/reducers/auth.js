import { createSlice } from '@reduxjs/toolkit';

import { saveUserInformationToStorage, deleteUserInformationFromStorage } from '../helpers/localStorage';

const initialAuthState = {
	isLoading: true,
	ggSignInPending: false,
	signInPending: false,
	isProfileLoading: false,
	authData: null,
	userInfo: {},
	isSignInEd: false
};
const authKeys = ['userId', 'token', 'firstName', 'lastName', 'role'];
const profileKeys = ['firstName', 'lastName'];

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		changeIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		changeSignInPending(state, action) {
			state.signInPending = action.payload;
		},
		storeUser(state, action) {
			const data = action?.payload;

			if (data) {
				const authData = authKeys.reduce((o, key) => ({ ...o, [key]: data[key] }), {});
				saveUserInformationToStorage(authData);

				state.authData = authData;
				state.email = data['email'];
				state.userInfo = profileKeys.reduce((o, key) => ({ ...o, [key]: data[key] }), {});
			}

			state.isSignInEd = !state.isSignInEd;
		},
		freeUser(state) {
			deleteUserInformationFromStorage();
			state.authData = null;
			state.isSignInEd = !state.isSignInEd;
		}
	}
});

export const authActions = authSlice.actions;

export default authSlice;
