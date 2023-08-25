'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-[93%] m-auto flex justify-between items-center">
      {children}
    </div>
  );
};

export default Container;
