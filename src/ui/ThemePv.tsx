import { PropaneSharp } from '@mui/icons-material';
import { ThemeProvider, CssBaseline, Theme } from '@mui/material';
import { ThemeColor } from 'renderer/States/scoresheet';
import { useAppSelector } from 'renderer/Store/hooks';

import {
  themeGreen,
  themeBlue,
  themeBrown,
  themeTeal,
  themePink,
  themeDark,
  themeDefault,
} from '../renderer/theme';

const themes: Record<ThemeColor, Theme> = {
  dark: themeDark,
  green: themeGreen,
  blue: themeBlue,
  brown: themeBrown,
  teal: themeTeal,
  pink: themePink,
  default: themeDefault,
};

interface Props {
  children: JSX.Element;
}

export default (props: Props) => {
  const color: ThemeColor = useAppSelector((state) => state.theme.color);
  return <ThemeProvider theme={themes[color]}>{props.children}</ThemeProvider>;
};
