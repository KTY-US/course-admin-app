import { toast } from 'react-toastify';

import * as api from '../apis/user';
import { userActions } from '../reducers/user';

export const getUsers = (page, rowPerPage, sortMode, searchString) => async (dispatch) => {
	try {
		dispatch(userActions.changeIsLoading(true));
		const { data } = await api.getUsers(page, rowPerPage, sortMode, searchString);
		dispatch(userActions.storeUsers(data));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(userActions.changeIsLoading(false));
	}
};

export const changeUserCode = async (data) => {
	try {
		const changeResult = await api.changeUserCode(data);
		if (changeResult) {
			toast.success('The user code has changed successfully');
		} else {
			toast.error('Change the user code has fail');
		}
	} catch (error) {
		toast.error(error.message);
	}
};
