import * as actionTypes from './routes-data.types';
import { IAppAction } from 'src/store/store.types';
import { IRoutedData } from './routes-data.interfaces';

export const routesDataReducer = (
  state: IRoutedData[] = [],
  { type, payload }: IAppAction<string | IRoutedData[]>
): IRoutedData[] => {
  switch (type) {
    case actionTypes.ROUTES_DATA_GET_FROM_WEB_FULFILLED:
      return payload as IRoutedData[];
    case actionTypes.ROUTES_DATA_GET_FROM_WEB:
    default:
      return state;
  }
};
