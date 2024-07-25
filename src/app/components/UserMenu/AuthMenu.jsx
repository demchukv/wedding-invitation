import Link from 'next/link';

const AuthMenu = () => {
  return (
    <ul>
      <li>
        <Link href="/invites">Invites</Link>
      </li>
      <li>
        <Link href="/logout">LogOut</Link>
      </li>
    </ul>
  );
};

export default AuthMenu;
