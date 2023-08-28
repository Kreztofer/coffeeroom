import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import getCurrentUser from './actions/getCurrentUser';
import ProfileModal from './components/modals/ProfileModal';
import EditProfileModal from './components/modals/EditProfileModal';
import ClientOnly from './components/ClientOnly';

const font = Roboto({
  subsets: ['latin'],
  weight: '300',
});
export const metadata: Metadata = {
  title: 'coffeeroom',
  description: 'Best hangout spot for professionals',
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={font.className}>
        <ClientOnly>
          <div>hello</div>
          {/* <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <EditProfileModal currentUser={currentUser} />
          <ProfileModal currentUser={currentUser} />
          <Navbar currentUser={currentUser} /> */}
        </ClientOnly>
        <div className="pt-[75px]">{children}</div>
      </body>
    </html>
  );
}
