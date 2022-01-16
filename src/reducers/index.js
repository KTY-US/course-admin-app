import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import courseSlice from './course';

const store = configureStore({
	reducer: { auth: authSlice.reducer, course: courseSlice.reducer }
});

export default store;
