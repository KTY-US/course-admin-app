import { createSlice } from '@reduxjs/toolkit';

import { saveUserInformationToStorage, deleteUserInformationFromStorage } from '../helpers/localStorage';

const initialAuthState = {
	isLoading: true,
	signInPending: false,
	signUpPending: false,
	isProfileLoading: false,
	authData: null,
	userInfo: {},
	email: ''
};
const authKeys = ['userId', 'token', 'firstName', 'lastName', 'email'];
const profileKeys = ['firstName', 'lastName', 'userCode'];

const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		changeIsLoading(state, action) {
			state.isLoading = action.payload;
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
		},
		storeProfile(state, action) {
			const data = action?.payload;
			state.email = data['email'];
			state.userInfo = profileKeys.reduce((o, key) => ({ ...o, [key]: data[key] }), {});
		},
		freeUser(state) {
			deleteUserInformationFromStorage();
			state.authData = null;
		}
	}
});

export const authActions = authSlice.actions;

export default authSlice;
