import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ReactNode } from 'react-redux';
import ErrorAppDialog from 'src/components/errorAppDialog/error-app-dialog';
import { clearAllLoaders } from 'src/store/loader/loader.actions';
import { IAppAction } from 'src/store/store.types';

export interface IErrorBoundaryState {
  hasError: boolean;
  errorInfoFromApp: null | Error;
}
export interface IErrorBoundaryProps {
  clearAllLoaders: () => IAppAction;
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfoFromApp: null
    };
  }
  getDerivedStateFromError = (error: Error) => {
    this.props.clearAllLoaders();
    return {
      hasError: true,
      errorInfoFromApp: error
    };
  };

  handleDialogClose = (): void => {
    this.setState({
      hasError: false,
      errorInfoFromApp: null
    });
  };

  render() {
    return (
      <>
        <ErrorAppDialog
          {...this.state}
          handleDialogClose={this.handleDialogClose}
        />
        {this.props.children}
      </>
    );
  }
}

const mapActionsToProps = {
  clearAllLoaders: (): IAppAction => clearAllLoaders()
};

export default compose(connect(null, mapActionsToProps))(ErrorBoundary);
