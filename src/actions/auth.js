import { toast } from 'react-toastify';

import * as api from '../api/auth';
import { authActions } from '../reducers/auth';
import { getUrlFromStorage, deleteUrlFromStorage } from '../helpers/localStorage';

export const signIn = (formData, navigate, setErrorCredential) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsLoading(true));
		dispatch(authActions.changeSignInPending(true));
		const { data } = await api.signIn(formData);
		await dispatch(authActions.storeUser(data));
		navigate(getUrlFromStorage(), { replace: true });
		deleteUrlFromStorage();
	} catch ({ response }) {
		setErrorCredential(response?.data.message);
	} finally {
		dispatch(authActions.changeIsLoading(false));
		dispatch(authActions.changeSignInPending(false));
	}
};

export const changeLoading = () => async (dispatch) => {
	dispatch(authActions.changeIsLoading(true));
	dispatch(authActions.changeSignUpPending(false));
};
