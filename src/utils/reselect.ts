import { createSelector } from 'reselect';
import _ from 'lodash';

export const selectState = (state, reducerPath, fieldPath, defaulValue) => {
  return createSelector(
    () => _.get(state, reducerPath),
    (selectedReducer) =>
      _.isEmpty(fieldPath)
        ? selectedReducer
        : _.get(selectedReducer, fieldPath, defaulValue),
  )();
};

export const select = (state, fieldPath, defaulValue) => {
  return createSelector(
    () => state,
    (state) =>
      _.isEmpty(fieldPath) ? state : _.get(state, fieldPath, defaulValue),
  )();
};

export const computeState = (
  state,
  listReducers = [{ fieldPath: '', defaulValue: '' }],
  computeFunction,
) => {
  return createSelector(
    listReducers.map(
      (item) => () => _.get(state, item.fieldPath, item?.defaulValue),
    ),
    computeFunction,
  )();
};
