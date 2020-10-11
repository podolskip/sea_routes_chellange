import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './root.reducers';
import { rootEpic } from './root.epics';
import history from 'src/configuration/history';

const epicMiddleware = createEpicMiddleware();

const routerHistoryMiddleware = routerMiddleware(history);

export default function storeConfig() {
  const reduxDevExtensionSetup: any = () =>
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any): any => f;

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...[epicMiddleware, routerHistoryMiddleware]),
      reduxDevExtensionSetup()
    )
  );

  epicMiddleware.run(rootEpic);
  return store;
}
