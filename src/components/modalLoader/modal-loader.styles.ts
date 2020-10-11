import { cssRaw, style } from 'typestyle';

cssRaw(`
  .blurAppRootElement {
    filter: blur(0.15rem)
  }
  .loadersZindex {
    z-index: 1400 !important
  }
`);

export const styles = {
  modalStyle: style({
    cursor: 'progress',
    $nest: {
      '& > div:nth-of-type(1)': {
        opacity: '0.5',
        backgroundColor: 'white !important'
      },
      '& div': {
        outline: 'none '
      }
    }
  }),
  divProgressCircle: style({
    zIndex: 1401,
    top: '50%',
    left: '50%',
    position: 'absolute',
    textAlign: 'center',
    display: 'table',
    cursor: 'progress'
  })
};
