import {
  ROUTES_DATA_GET_FROM_WEB,
  ROUTES_DATA_GET_FROM_WEB_FULFILLED
} from './routes-data.types';
import { IAppAction } from 'src/store/store.types';
import { IRoutedData } from './routes-data.interfaces';

export const getRoutesDataFromWeb = (): IAppAction<string> => ({
  type: ROUTES_DATA_GET_FROM_WEB,
  isLoading: true
});

export const getRoutesDataFromWebFulfilled = (
  payload: IRoutedData[]
): IAppAction<IRoutedData[]> => ({
  type: ROUTES_DATA_GET_FROM_WEB_FULFILLED,
  payload,
  isLoading: false
});
