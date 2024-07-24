import { instance, publicInstance } from './instance';

//AUTH
export const requestRegister = async (formData) => {
  const { data } = await publicInstance.post('/users/register', formData);
  return data;
};

export const requestLogin = async (formData) => {
  const { data } = await publicInstance.post('/users/login', formData);
  return data;
};

export const requestGoogleLogin = async (formData) => {
  const { data } = await publicInstance.get('/users/google', {
    params: formData,
  });
  return data;
};

export const refreshToken = async () => {
  const { data } = await publicInstance.get('/users/refresh');
  return data;
};

export const requestLogout = async () => {
  const { data } = await instance.post('/users/logout');
  return data;
};

export const requestSendVerify = async (verificationToken, formData) => {
  const { data } = await publicInstance.post(
    `/users/verify/${verificationToken}`,
    formData,
  );
  return data;
};

export const requestResendVerify = async (formData) => {
  const { data } = await publicInstance.post('/users/verify', formData);
  return data;
};

export const requestForgotPassword = async (formData) => {
  const { data } = await publicInstance.post(
    '/users/forgot-password',
    formData,
  );
  return data;
};

export const requestResetPassword = async (formData) => {
  const { data } = await publicInstance.post('/users/reset-password', formData);
  return data;
};

// USER
export const requestTotalUsers = async () => {
  const { data } = await publicInstance.get('users/count-users');
  return data;
};

export const requestUserInfo = async () => {
  const { data } = await instance.get('/users/current');
  return data;
};

export const updateUserProfile = async (formData) => {
  const { data } = await instance.patch('/users/current', formData);
  return data;
};

export const uploadUserAvatar = async (formData) => {
  instance.defaults.headers['Content-Type'] = 'multipart/form-data';
  instance.body = formData;
  const { data } = await instance.post('/users/avatar', formData);
  instance.defaults.headers['Content-Type'] = 'application/json';
  return data;
};
