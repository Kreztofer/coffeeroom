import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import getCurrentUser from './actions/getCurrentUser';

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
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pt-[75px]">{children}</div>
      </body>
    </html>
  );
}
