'use client';
import { SafeUser } from '@/app/types';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full py-4 bg-[#fff] z-10 shadow-sm">
      <Container>
        <div className="flex items-center gap-5">
          <Logo />
          <Search />
        </div>
        <UserMenu currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Navbar;
