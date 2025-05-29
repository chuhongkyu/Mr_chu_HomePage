"use client";

import dynamic from 'next/dynamic';

const AppWrapper = dynamic(() => import('@/components/common/window/app/AppWrapper'), {
    ssr: false,
  });
  
const AppWrapperClientLoader = () => {
  return <AppWrapper />;
}

export default AppWrapperClientLoader