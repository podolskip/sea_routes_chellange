import { combineReducers } from 'redux';
import { IStoreState } from './store.types';
import { routesDataReducer } from './routesData/routes-data.reducers';
import { loaderReducer } from './loader/loader.reducers';

export const rootReducer = combineReducers<IStoreState>({
  routesData: routesDataReducer,
  activeLoaders: loaderReducer
});
