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
import CommentsModal from './components/modals/CommentsModal';
import getFeedPosts from './actions/getFeedPosts';
import EditMyProfileModal from './components/modals/EditMyProfileModal';

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
  const feed = await getFeedPosts();
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <CommentsModal currentUser={currentUser} feeds={feed} />
          <EditProfileModal currentUser={currentUser} />
          <EditMyProfileModal currentUser={currentUser} />
          <ProfileModal currentUser={currentUser} />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pt-[75px]">{children}</div>
      </body>
    </html>
  );
}
