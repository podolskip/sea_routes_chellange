import * as React from 'react';
import Modal from '@material-ui/core/Modal';
// Types
import CircularProgress from '@material-ui/core/CircularProgress';
// import { NProgress } from 'nokia-commons';
import { styles } from './modal-loader.styles';
import { classes } from 'typestyle';

export interface IModalLoaderProps {
  loaderOnOff: boolean;
}

export class ModalLoader extends React.Component<IModalLoaderProps> {
  private manageBlurOnRootComponent = (action: string): void => {
    const appRootElement = document.getElementById('root') as HTMLElement;

    appRootElement.classList[action]('blurAppRootElement');
  };

  render() {
    const { loaderOnOff } = this.props;
    if (loaderOnOff) {
      this.manageBlurOnRootComponent('add');
    } else {
      this.manageBlurOnRootComponent('remove');
    }

    return (
      <Modal
        open={loaderOnOff}
        className={classes(styles.modalStyle, 'loadersZindex')}
        disableAutoFocus={true}
      >
        <CircularProgress
          className={styles.divProgressCircle}
          size={75}
          disableShrink
        />
      </Modal>
    );
  }
}

export default ModalLoader;
