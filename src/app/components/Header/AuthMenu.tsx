import Link from 'next/link';
import { LogOut } from '@/app/components/logout';

const AuthMenu = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href="/signin">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <LogOut />
        </li>
      </ul>
    </div>
  );
};

export default AuthMenu;
