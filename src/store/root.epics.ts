import { combineEpics, Epic } from 'redux-observable';
import { getRouteDataFromWebEpic } from './routesData/routes-data.epics';

export const rootEpic: Epic = combineEpics(getRouteDataFromWebEpic);
