import MainMenu from '../MainMenu/MainMenu';
import UserMenu from '../UserMenu/UserMenu';
import AuthMenu from '../UserMenu/AuthMenu';

const Header = () => {
  return (
    <header>
      <MainMenu />
      <UserMenu />
      <AuthMenu />
    </header>
  );
};

export default Header;
