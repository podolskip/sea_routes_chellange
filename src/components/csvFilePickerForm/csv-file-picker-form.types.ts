import { IAppAction } from 'src/store/store.types';
import { IRoutedData } from 'src/store/routesData/routes-data.interfaces';

export interface ICsvFilePickerFormProps {
  classes: { [key: string]: string };
  clearAllLoaders: () => IAppAction;
  getRoutesDataFromWeb: () => IAppAction;
  getRoutesDataFromWebFulfilled: (
    csvFileLink: IRoutedData[]
  ) => IAppAction<IRoutedData[]>;
}

export enum IsCsvFileLinkValidENUM {
  yes = 'yes',
  no = 'no',
  untouched = 'untouched'
}

export type linkValidationOprionsTypes = 'yes' | 'no' | 'untouched';

export interface ICsvFilePickerFormState {
  csvFileLink: string;
  isCsvFileLinkValid: linkValidationOprionsTypes;
}
