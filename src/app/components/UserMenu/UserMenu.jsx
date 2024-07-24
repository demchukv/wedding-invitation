import Link from 'next/link';

const UserMenu = () => {
  return (
    <ul>
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li>
        <Link href="/register">Register</Link>
      </li>
    </ul>
  );
};

export default UserMenu;
