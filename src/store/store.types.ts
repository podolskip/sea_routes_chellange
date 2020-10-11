import { IRoutedData } from './routesData/routes-data.interfaces';
import { Action } from 'redux';

export interface IAppAction<T = undefined, S = undefined>
  extends Action<string> {
  payload?: T;
  isLoading?: boolean | undefined;
  helper?: S;
}

export interface IStoreState {
  routesData: IRoutedData[];
  activeLoaders: number;
}
