import { createSlice } from '@reduxjs/toolkit';
import { ThemeColor } from './scoresheet';

interface Theme {
  color: ThemeColor;
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { color: 'dark' },
  reducers: {
    changeThemeColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { changeThemeColor } = themeSlice.actions;
export default themeSlice.reducer;
