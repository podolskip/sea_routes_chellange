import { IAppAction } from 'src/store/store.types';
import { CLEAR_ALL_LOADERS } from './loader.types';
export type LoaderState = number;

export const loaderReducer = (
  state: LoaderState = 0,
  action: IAppAction<boolean>
) => {
  if (action.isLoading === true) {
    return state + 1;
  }
  if (action.isLoading === false) {
    return state - 1;
  }
  if (action.type === CLEAR_ALL_LOADERS) {
    return 0;
  }
  return state;
};
