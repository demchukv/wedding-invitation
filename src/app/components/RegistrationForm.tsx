'use client';
import SocialLogin from '@/app/components/SocialLogin';

import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get('name');
      const email = formData.get('email');
      const password = formData.get('password');
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      response.status === 201 && router.push('/'); // to login page

      // check and inform about possible errors
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>&nbsp;</p>
      <p>or sign up with:</p>
      <SocialLogin />
    </div>
  );
};

export default RegistrationForm;
