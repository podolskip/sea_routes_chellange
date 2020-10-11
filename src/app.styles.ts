import { Styles, CSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles';

export const globalAppClasses: Styles<Theme, {}> = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'Calc(100vw-50)'
  }
};

export const container: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'Calc(100vw-50)'
};

export const parallax: CSSProperties = {
  minHeight: '300px',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
};
