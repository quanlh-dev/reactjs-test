import { createSelector } from '@reduxjs/toolkit';
import { initialState as themeState } from '@styles/theme/slice';
import { initialState as profileState } from '@containers/authentication/pages/Auth/slice';
import { RootState } from '@types';
import get from 'lodash/get';
import { cloneDeep } from 'lodash';
// type SelectorRootState = Record<key in keyof Root, string>;

// const selectors: SelectorRootState = {

// };
const defaultRootState: RootState = {
  theme: themeState,
  profile: profileState,
};

export const selectors: {
  [key in RecursiveKeyOf<RootState>]?: (state: RootState) => any;
} = {};

export const selectorMapKey: any = cloneDeep(defaultRootState);

function createAllSelectors(state: Record<string, any>, previousKey?: string) {
  for (const key in state) {
    const newKey = previousKey ? `${previousKey}.${key}` : key;
    selectors[newKey] = createSelector(
      [(state: RootState) => get(state, newKey)],
      (value) => value,
    );
    const deepState = state[key];
    if (typeof deepState === 'object') {
      createAllSelectors(deepState, newKey);
    }
  }
}

function createSelectorMapKey(
  state: Record<string, any>,
  previousKey?: string,
) {
  for (const key in state) {
    if (key === '__key__') {
      continue;
    }
    const deepState = state[key];
    const newKey = previousKey ? `${previousKey}.${key}` : key;
    if (typeof deepState === 'object') {
      deepState.__key__ = newKey;
      createSelectorMapKey(deepState, newKey);
    } else {
      state[key] = newKey;
    }
  }
}

createAllSelectors(defaultRootState);
createSelectorMapKey(selectorMapKey);
