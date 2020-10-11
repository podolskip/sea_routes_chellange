import { Styles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles';

export const defaultClasses: Styles<Theme, {}> = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'Calc(100vw-50)'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'Calc(100vw-50)'
  },
  formControl: {
    margin: '20px',
    minWidth: '200px'
  },
  listStyle: {
    minWidth: '400px'
  }
};
