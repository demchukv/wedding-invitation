'use client';

import { requestRegister } from '@/lib/weddingApi';

const RegisterForm = () => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;
    console.log(email, password, confirmPassword);
    const res = await requestRegister({ email, password });
    console.log(res);
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" name="email" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
