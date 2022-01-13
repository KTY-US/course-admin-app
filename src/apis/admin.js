import API from './helper';

// User APIs

export const checkUserCode = (data) => API.post(`/users/check-code/${data.userId}`, data);

export const updateProfile = (form) => API.post(`/users/update-profile/${form.userId}`, form);

export const loadProfile = (userId) => API.get(`/users/byId/${userId}`);

export const getUserByCode = (userCode) => API.get(`/users/byCode/${userCode}`);
