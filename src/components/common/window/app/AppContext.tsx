"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { AppItem } from "./AppType";
import { initialApps } from "./AppData";


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
