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

const defaultClasses: Styles<Theme, {}> = {
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

export const MapDialog: React.FC<IMapDialogProps> = ({
  classes,
  analysisDialogOpen,
  currentlySelectedRoute,
  closeDialogBox
}) => {
  return analysisDialogOpen ? (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={analysisDialogOpen}
      onClose={closeDialogBox}
      aria-labelledby="max-width-dialog-title"
      scroll={'body'}
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
            currentlySelectedRoute={currentlySelectedRoute ?? []}
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
