import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth';
import userSlice from './user';

const store = configureStore({
	reducer: { auth: authSlice.reducer, user: userSlice.reducer }
});

export default store;
