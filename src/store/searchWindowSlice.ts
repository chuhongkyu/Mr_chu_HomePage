import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchWindowState {
  isSearchWindowVisible: boolean;
}

const initialState: SearchWindowState = {
  isSearchWindowVisible: false,
};

const searchWindowSlice = createSlice({
  name: 'searchWindow',
  initialState,
  reducers: {
    toggleSearchWindow: (state) => {
      state.isSearchWindowVisible = !state.isSearchWindowVisible;
    },
    setSearchWindow: (state, action: PayloadAction<boolean>) => {
      state.isSearchWindowVisible = action.payload;
    },
  },
});

export const { toggleSearchWindow, setSearchWindow } = searchWindowSlice.actions;
export default searchWindowSlice.reducer; 