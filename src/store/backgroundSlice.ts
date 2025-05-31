import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BackgroundState {
  isBackground: boolean;
}

const initialState: BackgroundState = {
  isBackground: true,
};

const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    toggleBackground: (state) => {
      state.isBackground = !state.isBackground;
    },
    setBackground: (state, action: PayloadAction<boolean>) => {
      state.isBackground = action.payload;
    },
  },
});

export const { toggleBackground, setBackground } = backgroundSlice.actions;
export default backgroundSlice.reducer;