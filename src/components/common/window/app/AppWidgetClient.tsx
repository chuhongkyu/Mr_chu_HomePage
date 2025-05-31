"use client";

import dynamic from 'next/dynamic';

const AppWidget = dynamic(() => import('./AppWidget'), {
  ssr: false
});

const AppWidgetClient = () => {
  return <AppWidget />;
};

export default AppWidgetClient; 