'use client';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <p
      onClick={() => router.push('/')}
      className="text-myblue cursor-pointer text-[24px] font-[700]"
    >
      coffeeroom
    </p>
  );
};

export default Logo;
