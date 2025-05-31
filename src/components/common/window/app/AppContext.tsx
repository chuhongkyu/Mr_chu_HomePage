"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { AppItem } from "./AppType";
import { cloum1Apps, cloum2Apps, cloum3Apps, cloum4Apps } from "./AppData";

type Area = {
    id: string;
    apps: AppItem[];
};

type Action = 
  | { type: "ADD_APP"; payload: { areaId: string; app: AppItem } }
  | { type: "MOVE_APP"; payload: { 
      sourceAreaId: string; 
      destinationAreaId: string;
      sourceIndex: number; 
      destinationIndex: number 
    }}
  | { type: "SET_APPS"; payload: { areaId: string; apps: AppItem[] } };


const initialAreas: Area[] = [
    { id: "area1", apps: cloum1Apps },
    { id: "area2", apps: cloum2Apps },
    { id: "area3", apps: cloum3Apps },
    { id: "area4", apps: cloum4Apps }
];

// 리듀서 함수
const appReducer = (state: Area[], action: Action): Area[] => {
    switch (action.type) {
        case "ADD_APP": {
            return state.map(area => 
                area.id === action.payload.areaId 
                    ? { ...area, apps: [...area.apps, action.payload.app] }
                    : area
            );
        }
        case "MOVE_APP": {
            const { sourceAreaId, destinationAreaId, sourceIndex, destinationIndex } = action.payload;
            
            // 같은 영역 내에서 이동하는 경우
            if (sourceAreaId === destinationAreaId) {
                return state.map(area => {
                    if (area.id === sourceAreaId) {
                        const newApps = Array.from(area.apps);
                        const [removed] = newApps.splice(sourceIndex, 1);
                        newApps.splice(destinationIndex, 0, removed);
                        return { ...area, apps: newApps };
                    }
                    return area;
                });
            }
            
            // 다른 영역으로 이동하는 경우
            return state.map(area => {
                if (area.id === sourceAreaId) {
                    const newApps = Array.from(area.apps);
                    const [removed] = newApps.splice(sourceIndex, 1);
                    return { ...area, apps: newApps };
                }
                if (area.id === destinationAreaId) {
                    const sourceArea = state.find(a => a.id === sourceAreaId);
                    if (!sourceArea) return area;
                    const newApps = Array.from(area.apps);
                    newApps.splice(destinationIndex, 0, sourceArea.apps[sourceIndex]);
                    return { ...area, apps: newApps };
                }
                return area;
            });
        }
        case "SET_APPS": {
            return state.map(area => 
                area.id === action.payload.areaId 
                    ? { ...area, apps: action.payload.apps }
                    : area
            );
        }
        default:
            return state;
    }
};

// Context 생성
const AppContext = createContext<{
    areas: Area[];
    dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider 컴포넌트
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [areas, dispatch] = useReducer(appReducer, initialAreas);

    return (
        <AppContext.Provider value={{ areas, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Context 사용을 위한 Hook
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
