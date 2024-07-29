const users = [
  {
    email: 'demchukv@gmail.com',
    password: '123password',
    role: 'admin',
  },
  {
    email: 'demchukv@windowslive.com',
    password: '123password',
    role: 'admin',
  },
  {
    email: 'demchukv@meta.ua',
    password: '123password',
    role: 'admin',
  },
];

export const getUserByEmail = (email) => {
  const user = users.find((user) => user.email === email);
  return user;
};
