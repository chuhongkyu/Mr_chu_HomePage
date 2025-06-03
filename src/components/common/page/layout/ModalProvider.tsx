
"use client"

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';
import { ModalContextType } from './ModalType';
import { WithChildren } from '@/types/global';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<WithChildren> = ({ children }) => {
  const [resize, setResize] = useState(true);
  const router = useRouter();

  const onHandleSize = () => setResize(!resize);
  const onExit = () => router.push("/");

  return (
    <ModalContext.Provider value={{ resize, onHandleSize, onExit }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
