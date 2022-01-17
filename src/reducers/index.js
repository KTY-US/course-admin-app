import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import courseSlice from './course';
import courseDetailSlice from './courseDetail';
import userSlice from './user';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		course: courseSlice.reducer,
		courseDetail: courseDetailSlice.reducer,
		user: userSlice.reducer
	}
});
export default store;
