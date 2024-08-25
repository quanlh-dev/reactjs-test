import { selectorMapKey, selectors } from '@plugins/store/helpers/selectors';
import { RootState } from '@types';
import { useSelector as useReduxSelector } from 'react-redux';
/**
 * useSelector hook with selectorMapKey and selectors
 * @param selectorFn
 * @param equalityFn
 * @returns
 */
function useSelector<TState = RootState, TSelected = any>(
  selectorFn: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
): TSelected {
  let selectorKey = selectorFn(selectorMapKey) as string;
  selectorKey =
    typeof selectorKey === 'string'
      ? selectorKey
      : (selectorKey as any)?.__key__;
  const selector =
    selectorKey && selectors?.[selectorKey]
      ? selectors?.[selectorKey]
      : selectorFn;
  return useReduxSelector(selector, equalityFn);
}

export default useSelector;
