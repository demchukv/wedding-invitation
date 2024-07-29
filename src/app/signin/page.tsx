import SignIn from '@/app/components/sign-in';

export interface PageProps {}

export default function Page({}: PageProps) {
  return (
    <main>
      <h1>Login</h1>
      <SignIn />
    </main>
  );
}
