import { switchMap } from 'rxjs/operators';
import {
  ofType,
  ActionsObservable,
  StateObservable,
  Epic
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import csv from 'csvtojson';
import request from 'request';
import { IAppAction, IStoreState } from 'src/store/store.types';
import { IRoutedData } from './routes-data.interfaces';

export const getRouteDataFromWebEpic: Epic = (
  actions$: ActionsObservable<IAppAction<string>>,
  store$: StateObservable<IStoreState>
): Observable<IAppAction<IRoutedData[]>> =>
  actions$.pipe(
    ofType('ROUTES_DATA_GET_FROM_WEB_TEST'),
    switchMap(({ payload }) => {
      let jsonObjectFromCsv: IRoutedData[] = [];
      csv()
        .on('error', (error: Error) => {
          console.log(error);
          window.alert(error);
        })
        .fromStream(request.get(payload!) as any)
        .then(jsonObject => {
          jsonObjectFromCsv = jsonObject;
        });

      return of({ type: 'ACTION_FROM_EPIC', payload: jsonObjectFromCsv });
    })
  );
