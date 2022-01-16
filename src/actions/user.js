import { toast } from 'react-toastify';

import * as api from '../apis/user';
import { userActions } from '../reducers/user';

export const getUsers = (page, rowPerPage, sortMode, searchString) => async (dispatch) => {
	try {
		dispatch(userActions.changeIsLoading(true));
		console.log(searchString);
		const { data } = await api.getUsers(page, rowPerPage, sortMode, searchString);
		dispatch(userActions.storeUsers(data));
	} catch (error) {
		toast.error(error.message);
	} finally {
		dispatch(userActions.changeIsLoading(false));
	}
};
