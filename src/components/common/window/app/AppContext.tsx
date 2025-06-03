"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { AppItem, AppMoveAction, Area } from "./AppType";
import { cloum1Apps, cloum2Apps, cloum3Apps, cloum4Apps } from "./AppData";
import { WithChildren } from "@/types/global";


const initialAreas: Area[] = [
    // 나를 소개하는 쪽 및 정적 페이지
    { id: "area1", apps: cloum1Apps },
    // 스타트업 프로젝트
    { id: "area2", apps: cloum2Apps },
    // 더즈떄 했던 고객사 프로젝트
    { id: "area3", apps: cloum3Apps },
    // 개인 프로젝트, 포트폴리오 류
    { id: "area4", apps: cloum4Apps }
];

// 리듀서 함수
const appReducer = (state: Area[], action: AppMoveAction): Area[] => {
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


const AppContext = createContext<{
    areas: Area[];
    dispatch: React.Dispatch<AppMoveAction>;
} | null>(null);


export const AppProvider = ({ children }: WithChildren) => {
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
