"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

export interface AppItem {
  type: "folder" | "img" | "icon";
  label: string;
  name: string;
  color: string;
  link: string;
  imgSrc?: string;
};

// 초기 데이터
const initialApps: AppItem[] = [
  { type: "folder", label: "Resume", name: "resume", color: "rgb(224,64,47)", link: "/resume" },
  { type: "folder", label: "About", name: "about", color: "rgb(238,188,17)", link: "/about" },
  { type: "icon", label: "GitHub", name: "github", color: "rgb(0,0,0)", link: "https://github.com/jonghyeon-kim" },
 
  { type: "folder", label: "Unity", name: "unity", color: "rgb(121, 120, 120)", link: "/unity" },

  { type: "img", imgSrc: "/assets/project/삼성액티브자산운용.jpg", label: "삼성액티브자산운용", name: "삼성액티브자산운용", color: "rgb(46,142,214)", link: "/project/f3994247d75c4d7fa97801c5b537a80e" },
  { type: "img", imgSrc: "/assets/project/롯데백화점리뉴얼.jpg", label: "롯데백화점리뉴얼", name: "롯데백화점리뉴얼", color: "rgb(46,142,214)", link: "/project/24c135b5b0e44e77bf8e1f3c998bda2c" },
  { type: "img", imgSrc: "/assets/project/주차연습.jpg", label: "주차연습\n게임", name: "주차연습게임", color: "rgb(46,142,214)", link: "/project/926be7c4f8f34b1e8a2f008d8febf8d6" },
];

// 액션 타입 정의 수정
type Action = 
  | { type: "ADD_APP"; payload: AppItem }
  | { type: "REORDER_APPS"; payload: { sourceIndex: number; destinationIndex: number } }
  | { type: "SET_APPS"; payload: AppItem[] };


// 리듀서 함수 수정
const appReducer = (state: AppItem[], action: Action): AppItem[] => {
  switch (action.type) {
    case "ADD_APP":
      return [...state, action.payload];
    case "SET_APPS":
      return action.payload;
    case "REORDER_APPS":
      const { sourceIndex, destinationIndex } = action.payload;
      const result = Array.from(state);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      return result;
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
