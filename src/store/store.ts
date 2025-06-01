import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from '@/store/backgroundSlice';
import searchWindowReducer from '@/store/searchWindowSlice';

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
    searchWindow: searchWindowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
