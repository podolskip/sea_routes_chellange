import { CLEAR_ALL_LOADERS } from './loader.types';
import { IAppAction } from 'src/store/store.types';

export const clearAllLoaders = (): IAppAction => ({
  type: CLEAR_ALL_LOADERS
});
