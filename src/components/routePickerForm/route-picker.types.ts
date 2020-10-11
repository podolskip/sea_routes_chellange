import { IRoutedData } from 'src/store/routesData/routes-data.interfaces';

export interface IRoutePickerFormProps {
  classes: { [key: string]: string };
  routesData: IRoutedData[];
}

export interface IRoutePickerFormState {
  fromDropdownPick: string;
  toDropdownPick: string;
  analysisDialogOpen: boolean;
  currentlySelectedRoute: IRoutedData | null;
}
