// import { combineReducers } from 'redux';

// import user from './user';
// import config from './config';
// import currentTask from './currentTask';
// import filter from './filter';
// import authorization from './authorization';
// import { connectRouter } from 'connected-react-router';
// import modal from './modal';
// import history from 'helpers/history';

// export default (asyncReducers) =>
//   combineReducers({
//     router: connectRouter(history),
//     user,
//     config,
//     currentTask,
//     authorization,
//     filter,
//     modal,
//     ...asyncReducers,
//   });

/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from '../helpers/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return (state) => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}
