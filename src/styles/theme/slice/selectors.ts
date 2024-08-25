import { createSelector } from '@reduxjs/toolkit';

import { initialState } from '.';
import { themes } from '../themes';
import { isSystemDark } from '../utils';
import { RootState } from '@types';

export const selectTheme = createSelector(
  [(state: RootState) => state.theme || initialState],
  (theme) => {
    if (theme.selected === 'system') {
      return isSystemDark ? themes.dark : themes.light;
    }
    return themes[theme.selected];
  },
);

export const selectThemeKey = createSelector(
  [
    (state: RootState) => state.theme || initialState,
    (state: RootState) => 'state',
  ],
  (theme, x) => theme.selected,
);
