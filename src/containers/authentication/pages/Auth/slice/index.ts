import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@plugins/store/helpers';
import { useInjectReducer, useInjectSaga } from '@plugins/store/helpers';
import { ProfileState } from './types';

export const initialState: ProfileState = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
  role: '',
  permissions: [],
};

const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<ProfileState>) {
      state = action.payload;
    },
  },
});

export const { actions: profileActions, reducer } = slice;

export const useProfileSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
