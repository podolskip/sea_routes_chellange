import { Styles, CSSProperties } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles';
import backgroundImage from 'src/assets/tanker_ship_from_top3.jpg';

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

export const defaultClasses: Styles<Theme, {}> = {
  header: {
    ...parallax,
    backgroundImage: `url(${backgroundImage})`
  },
  headerInfo: {
    // backgroundColor: 'rgb(0,0,0)', /* Fallback color */
    backgroundColor: 'rgba(0,0,0, 0.7)' /* Black w/opacity/see-through */,
    color: 'white',
    fontWeight: 'bold',
    border: '3px solid #f1f1f1',
    position: 'absolute',
    top: '50%,',
    left: '50%,',
    transform: 'translate(10%, 50%)',
    zIndex: 2,
    width: '80%',
    padding: '20px',
    textAlign: 'center'
  },
  filePickerSection: {
    ...container,
    height: '400px'
  },
  routePickerSection: {
    ...container,
    ...parallax,
    backgroundImage: `url(${backgroundImage})`
  },
  routePickerArticle: {
    ...container,
    width: '50%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: '15px',
    margin: '20px 0'
  },
  footer: {
    ...container,
    height: '200px'
  }
};
