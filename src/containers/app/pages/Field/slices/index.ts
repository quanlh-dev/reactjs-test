import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@plugins/store/helpers';
import { useInjectReducer } from '@plugins/store/helpers';
import { FieldState } from './types';
import { getFields } from '../../../../../services/field.service';
import { FieldType, IField } from '../field.constants';

const DEFAULT_ITEMS: IField[] = [
  {
    type: FieldType.NUMBER_FIELD_SPEC,
    name: 'field number 1',
    offsetFrom: 0,
    offsetTo: 5,
    description: 'this is description',
    id: 1,
  },
  {
    type: FieldType.STRING_FIELD_SPEC,
    name: 'field string 1',
    offsetFrom: 1,
    offsetTo: 3,
    description: 'this is description',
    id: 2,
  },
];

export const initialState: FieldState = {
  items: DEFAULT_ITEMS,
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
        if (action.payload?.length) state.items = action.payload;
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
