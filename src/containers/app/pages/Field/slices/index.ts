import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@plugins/store/helpers';
import { useInjectReducer } from '@plugins/store/helpers';
import { FieldState } from './types';
import { getFields } from '../../../../../services/field.service';

export const initialState: FieldState = {
  items: [],
  isLoading: false,
};

export const fetchFieldList = createAsyncThunk('field/fetchlist', async () => {
  const response = await getFields();
  return response?.data?.data?.items ?? [];
});

const slice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    getFields(state, action: PayloadAction<FieldState>) {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFieldList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFieldList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchFieldList.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { actions: fieldActions, reducer } = slice;

export const useFieldSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
