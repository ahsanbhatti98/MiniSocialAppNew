import {DarkTheme, LightTheme, ThemeColors} from '../styles';
import {ThemeTypes} from '../constants';
import {useTypedSelector} from './useTypedSelected';

export type AppThemeColorsType =
  | typeof ThemeColors
  | typeof DarkTheme
  | typeof LightTheme;

const useTheme = () => {
  const themeType: ThemeTypes = useTypedSelector(
    state => state.theme.themeType,
  );

  const isDarkTheme: boolean = themeType === ThemeTypes.Dark;

  const AppTheme = {
    ...ThemeColors,
    ...(isDarkTheme ? DarkTheme : LightTheme),
  };

  return {isDarkTheme, AppTheme, themeType};
};

export {useTheme};
