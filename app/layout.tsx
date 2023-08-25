import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import { useSearchParams } from 'next/navigation';

const font = Roboto({
  subsets: ['latin'],
  weight: '300',
});
export const metadata: Metadata = {
  title: 'coffeeroom',
  description: 'Best hangout spot for professionals',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <div className="pt-[75px]">{children}</div>
      </body>
    </html>
  );
}
