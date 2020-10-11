import { IAppAction } from 'src/store/store.types';

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
  return state;
};
