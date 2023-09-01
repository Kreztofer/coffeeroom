'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const Welcome = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="lg:w-[23%] w-[100%]">
      <div className="flex rounded-lg bg-white shadow-md h-auto m-auto flex-col gap-4 p-4">
        <h2>
          Welcome to the{' '}
          <span className="text-myblue font-bold">coffeeroom</span>
        </h2>
        <hr />
        <div className="flex flex-col gap-3">
          <button
            onClick={() => loginModal.onOpen()}
            className="bg-myblue text-white py-2 font-bold rounded-md hover:scale-[1.02] duration-150"
          >
            Login
          </button>
          <button
            onClick={() => registerModal.onOpen()}
            className="bg-myblue text-white py-2 font-bold rounded-md hover:scale-[1.02] duration-150"
          >
            Register
          </button>
        </div>
      </div>
      <div className="hidden lg:block w-[95%] m-auto">
        <div className="flex mt-4 w-full justify-between">
          <p className="underline text-[12px] text-gray-400">Privacy Terms</p>
          <p className="underline text-[12px] text-gray-400">Advertising</p>
          <p className="underline text-[12px] text-gray-400">Cookies</p>
        </div>
        <p className="mt-3 text-[12px] text-gray-400"> Dominicua © {year}</p>
      </div>
    </div>
  );
};

export default Welcome;
