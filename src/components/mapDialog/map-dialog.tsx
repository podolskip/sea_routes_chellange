import React from 'react';
import { compose } from 'redux';
// Material UI compoents
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// Components
import GoogleMapsComponent from './google-maps-component';
import SpeedChangeGraph from './speed-change-graph';
// STYLES & TYPES
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import { withStyles } from '@material-ui/core/styles';
import { IRoutedData } from 'src/store/routesData/routes-data.interfaces';
import { IPositionsForGoogleMaps } from './google-maps-component';

const defaultClasses: Styles<Theme, {}> = {
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'Calc(100vw-50)'
  },
  textField: {
    margin: '0 15px',
    width: '80vw'
  },
  getDataBtn: {
    margin: '15px'
  },
  upperCloseButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    color: 'primary'
  }
};

export interface IMapDialogProps {
  classes: { [key: string]: string };
  analysisDialogOpen: boolean;
  currentlySelectedRoute: IRoutedData | null;
  closeDialogBox: () => void;
}

export type FourElementArray<T> = [T, T, T, T];

export const MapDialog: React.FC<IMapDialogProps> = ({
  classes,
  analysisDialogOpen,
  currentlySelectedRoute,
  closeDialogBox
}) => {
  let positionsForGoogleMap: IPositionsForGoogleMaps[] = [];

  if (currentlySelectedRoute) {
    const getLatAngLngFromPosition = (position: FourElementArray<number>) => {
      const [lng, lat, ,] = position;

      return { lat, lng };
    };
    positionsForGoogleMap = (JSON.parse(
      currentlySelectedRoute.points
    ) as FourElementArray<number>[]).map(getLatAngLngFromPosition);
  }

  return analysisDialogOpen ? (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={analysisDialogOpen}
      onClose={closeDialogBox}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">
        {`From: ${currentlySelectedRoute?.from_port} | Destination: ${currentlySelectedRoute?.to_port}`}
      </DialogTitle>

      <DialogContent>
        <IconButton
          aria-label="close"
          className={classes.upperCloseButton}
          onClick={closeDialogBox}
        >
          <CloseIcon />
        </IconButton>
        {currentlySelectedRoute && (
          <GoogleMapsComponent
            positionsForGoogleMap={positionsForGoogleMap ?? []}
          />
        )}
        <br />
        <SpeedChangeGraph
          currentlySelectedRoute={currentlySelectedRoute ?? []}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialogBox} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ) : (
    <></>
  );
};

export default compose(withStyles(defaultClasses))(MapDialog);
