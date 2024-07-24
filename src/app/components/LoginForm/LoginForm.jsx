'use client';

import { requestLogin } from '@/lib/weddingApi';

const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  const res = await requestLogin({ email, password });
  console.log(res);
};
const LoginForm = () => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
