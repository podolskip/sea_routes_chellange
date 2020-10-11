/* tslint:disable */
/* eslint:disable */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// Components
import ErrorBoundary from 'src/error-boundary';
import CsvFilePickerForm from 'src/components/csvFilePickerForm/csv-file-picker-form';
import RoutePickerForm from 'src/components/routePickerForm/route-picker-form';
// Types && styles
import './App.css';
import backgroundImage from 'src/assets/tanker_ship_from_top3.jpg';
import { Styles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { container, parallax } from './app.styles';
import ModalLoader from 'src/components/modalLoader/modal-loader';
import { IStoreState } from 'src/store/store.types';

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
    // filter: 'blur(8px)',
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

export interface IAppProps {
  classes: { [key: string]: string };
  activeLoaders: number;
}

export const App: React.FC<IAppProps> = ({ classes, activeLoaders }) => {
  return (
    <ErrorBoundary>
      <header className={classes.header}>
        <div className={classes.headerInfo}>
          <h1>TANKER SHIP ROUTE TRACKER</h1>
          <p>By Patryk Podolski</p>
        </div>
      </header>
      <section key="secition_1" className={classes.filePickerSection}>
        <h1>PICK CSV FILE</h1>
        <span key="span_1">
          <CsvFilePickerForm />
        </span>
      </section>
      <section key="secition_2" className={classes.routePickerSection}>
        <article className={classes.routePickerArticle}>
          <span key="span_2">
            <RoutePickerForm />
          </span>
        </article>
      </section>
      <footer className={classes.footer}>
        Created by : Patryk Podolski | firstname.lastname@gmail.com | 987 654
        321
      </footer>
      <ModalLoader loaderOnOff={activeLoaders > 0} />
    </ErrorBoundary>
  );
};

const mapStateToProps = ({ activeLoaders }: IStoreState) => ({
  activeLoaders
});

export default compose(
  withStyles(defaultClasses),
  connect(mapStateToProps)
)(App);
