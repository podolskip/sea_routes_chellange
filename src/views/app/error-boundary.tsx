import React from 'react';
import { ReactNode } from 'react-redux';
import ErrorAppDialog from 'src/components/errorAppDialog/error-app-dialog';

export interface IErrorBoundaryState {
  hasError: boolean;
  errorInfoFromApp: null | Error;
}
export interface IErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends React.Component<
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
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorInfoFromApp: error
    };
  }

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
