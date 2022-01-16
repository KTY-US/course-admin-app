import API from './helper';

// User APIs

export const checkUserCode = (data) => API.post(`/users/check-code/${data.userId}`, data);
