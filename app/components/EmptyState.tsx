'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Heading from './Heading';
import Button from './Button';
import useLoginModal from '../hooks/useLoginModal';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Sorry, no feed ',
  subtitle = 'Try logging in or check your nextwork',
  showReset,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button outline label="login" onClick={() => loginModal.onOpen()} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
