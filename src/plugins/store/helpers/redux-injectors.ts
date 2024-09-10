import { useInjectReducer as useReducer } from 'redux-injectors';
import { InjectReducerParams, RootStateKeyType } from './injector-typings';

export function useInjectReducer<Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>,
) {
  return useReducer(params);
}
