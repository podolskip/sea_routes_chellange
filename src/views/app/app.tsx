import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// Components
import ErrorBoundary from 'src/views/app/error-boundary';
import CsvFilePickerForm from 'src/components/csvFilePickerForm/csv-file-picker-form';
import RoutePickerForm from 'src/components/routePickerForm/route-picker-form';
// Types && styles
import { withStyles } from '@material-ui/core/styles';
import ModalLoader from 'src/components/modalLoader/modal-loader';
import { IStoreState } from 'src/store/store.types';
import { defaultClasses } from './app.styles';

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
        321 | 2k20
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
