// import { createStore, compose, applyMiddleware } from 'redux';
// import { promiseMiddleware } from '@adobe/redux-saga-promise';
// import createSagaMiddleware from 'redux-saga';
// // import { connectRouter } from 'connected-react-router';
// import { routerMiddleware } from 'connected-react-router';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
// import history from 'helpers/history';
// import rootSaga from './saga';
// import createReducer from './reducers';

// const logger = createLogger({
//   // ...options
// });

// const sagaMiddleware = createSagaMiddleware();
// // const _routerMiddleware = routerMiddleware(history);
// function createSagaInjector(runSaga, rootSaga) {
//   const injectedSagas = new Map();

//   const isInjected = (key) => injectedSagas.has(key);

//   const injectSaga = (key, saga) => {
//     if (isInjected(key)) return;
//     const task = runSaga(saga);
//     injectedSagas.set(key, task);
//   };

//   injectSaga('root', rootSaga);
//   return injectSaga;
// }

// const store =
//   process.env.NODE_ENV === 'development'
//     ? createStore(
//         createReducer(),
//         {},
//         composeWithDevTools(
//           applyMiddleware(
//             routerMiddleware(history),
//             promiseMiddleware,
//             sagaMiddleware,
//             // logger,
//           ),
//         ),
//       )
//     : createStore(
//         createReducer(),
//         {},
//         compose(
//           applyMiddleware(
//             routerMiddleware(history),
//             promiseMiddleware,
//             sagaMiddleware,
//           ),
//         ),
//       );

// store.asyncReducers = {};
// store.injectReducer = (key, reducer) => {
//   store.asyncReducers[key] = reducer;
//   store.replaceReducer(createReducer(store.asyncReducers));
//   return store;
// };

// store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);
// export default store;

import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    middleware: (defaultMiddleware) => [...defaultMiddleware(), ...middlewares],
    devTools: true,
    /* istanbul ignore next line */
    // (process.env.NODE_ENV !== 'production' ||
    //   process.env?.PUBLIC_URL?.length) ??
    // 0 > 0,
    enhancers,
  });

  return store;
}
