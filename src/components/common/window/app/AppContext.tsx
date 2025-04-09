"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// 앱 아이템 타입 정의
type AppItem = {
  label: string;
  name: string;
  color: string;
};

// 초기 데이터
const initialApps: AppItem[] = [
  { label: "Resume", name: "resume", color: "rgb(224,64,47)" },
  { label: "About", name: "about", color: "rgb(238,188,17)" },
  { label: "GitHub", name: "github", color: "rgb(0,0,0)" },
  { label: "Project", name: "project", color: "rgb(46,142,214)" },
  { label: "Unity", name: "unity", color: "rgb(121, 120, 120)" },
];

// 액션 타입 정의
type Action = { type: "ADD_APP"; payload: AppItem };

// 리듀서 함수 정의
const appReducer = (state: AppItem[], action: Action): AppItem[] => {
  switch (action.type) {
    case "ADD_APP":
      return [...state, action.payload];
    default:
      return state;
  }
};

// Context 생성
const AppContext = createContext<{
  apps: AppItem[];
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider 컴포넌트
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [apps, dispatch] = useReducer(appReducer, initialApps);

  return (
    <AppContext.Provider value={{ apps, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
