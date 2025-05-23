import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeTypes} from '../../constants';

interface ThemeState {
  themeType: ThemeTypes;
}

const initialState: ThemeState = {
  themeType: ThemeTypes.Light, // default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeType(state, action: PayloadAction<ThemeTypes>) {
      state.themeType = action.payload;
    },
    toggleTheme(state) {
      state.themeType =
        state.themeType === ThemeTypes.Dark
          ? ThemeTypes.Light
          : ThemeTypes.Dark;
    },
  },
});

export const {setThemeType, toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;
