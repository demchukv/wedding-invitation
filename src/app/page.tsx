import { auth } from '@/auth';

export interface PageProps {}

export default async function Page({}: PageProps) {
  const session = await auth();
  console.log('session: ', session);
  return (
    <main>
      <h1>Home page</h1>
      <p>
        Welcome{' '}
        {session
          ? session.user.name
            ? session?.user?.name
            : session?.user?.email
          : 'guest'}
        !
      </p>
    </main>
  );
}
