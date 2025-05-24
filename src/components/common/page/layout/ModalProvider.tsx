
"use client"

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  resize: boolean;
  onHandleSize: () => void;
  onExit: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
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
