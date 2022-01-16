import * as api from '../apis/auth';
import { authActions } from '../reducers/auth';

export const signIn = (formData, navigate, setErrorCredential) => async (dispatch) => {
	try {
		dispatch(authActions.changeIsLoading(true));
		dispatch(authActions.changeSignInPending(true));
		const { data } = await api.signIn(formData);
		await dispatch(authActions.storeUser(data));
		navigate('/', { replace: true });
	} catch ({ response }) {
		setErrorCredential('Sign in failed!');
	} finally {
		dispatch(authActions.changeIsLoading(false));
		dispatch(authActions.changeSignInPending(false));
	}
};

export const changeLoading = () => async (dispatch) => {
	dispatch(authActions.changeIsLoading(true));
	dispatch(authActions.changeSignUpPending(false));
};
