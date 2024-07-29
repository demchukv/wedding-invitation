import { doLogout } from '@/app/actions/index';

export const LogOut = () => {
  return (
    <div>
      <form action={doLogout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};
