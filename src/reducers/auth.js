import { createSlice, current } from '@reduxjs/toolkit';

import {
	saveUserInformationToStorage,
	deleteUserInformationFromStorage,
	getUserInformationFromStorage
} from '../helpers/localStorage';

const initialAuthState = {
	isLoading: true,
	ggSignInPending: false,
	signInPending: false,
	isProfileLoading: false,
	authData: null,
	userInfo: {}
};
const authKeys = ['userId', 'token', 'firstName', 'lastName'];
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
		},
		storeProfile(state, action) {
			const data = action?.payload;
			state.email = data['email'];
			state.userInfo = profileKeys.reduce((o, key) => ({ ...o, [key]: data[key] }), {});
		},
		freeUser(state) {
			deleteUserInformationFromStorage();
			state.authData = null;
		},
		updateProfile(state, action) {
			const data = action?.payload;
			const { userInfo: currentUserInfo } = current(state);
			if (data) {
				const newData = profileKeys.reduce((o, key) => ({ ...o, [key]: data[key] }), {});
				state.userInfo = { ...currentUserInfo, ...newData };
			}
			const currentUser = getUserInformationFromStorage();
			currentUser.firstName = state.userInfo.firstName;
			currentUser.lastName = state.userInfo.lastName;
			saveUserInformationToStorage(currentUser);
		}
	}
});

export const authActions = authSlice.actions;

export default authSlice;
