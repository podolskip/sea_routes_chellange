import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { IErrorBoundaryState } from 'src/views/app/error-boundary';

interface ErrorAppDialogProps extends IErrorBoundaryState {
  handleDialogClose: () => void;
}

export const ErrorAppDialog: React.FC<ErrorAppDialogProps> = function(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { handleDialogClose, hasError, errorInfoFromApp } = props;
  return (
    <Dialog
      fullScreen={fullScreen}
      open={hasError}
      onClose={handleDialogClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your application returned following error:
          <br />
          {errorInfoFromApp}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleDialogClose} color="primary">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorAppDialog;
