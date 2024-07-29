'use client';

import SocialLogin from '@/app/components/SocialLogin';
import { doCredentialsLogin } from '@/app/actions/index';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

const SignIn = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const response = await doCredentialsLogin(formData);
      if (!!response) {
        setError(response.error.message);
      } else {
        router.push('/'); // redirect to personal page
      }
    } catch (e) {
      console.log('Something went wrong: ' + e);
      setError('Something went wrong: ' + e);
    }
  };
  return (
    <div>
      <div>{error}</div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <p>&nbsp;</p>
      <p>or sign in with:</p>
      <SocialLogin />
    </div>
  );
};

export default SignIn;
