import React from 'react';
import csv from 'csvtojson';
import request from 'request';
import { compose } from 'redux';
import { connect } from 'react-redux';
// Redux Actions
import * as routesDataActions from 'src/store/routesData/routes-data.actions';
// Material ui Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//Styles && types
import { Styles } from '@material-ui/core/styles/withStyles';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  ICsvFilePickerFormProps,
  IsCsvFileLinkValidENUM,
  linkValidationOprionsTypes,
  ICsvFilePickerFormState
} from './csv-file-picker-form.types';
import { IRoutedData } from 'src/store/routesData/routes-data.interfaces';

const defaultClasses: Styles<Theme, {}> = {
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'Calc(100vw-50)'
  },
  textField: {
    margin: '0 15px',
    width: '80vw'
  },
  getDataBtn: {
    margin: '15px'
  }
};

export class CsvFilePickerForm extends React.Component<
  ICsvFilePickerFormProps,
  ICsvFilePickerFormState
> {
  constructor(props: ICsvFilePickerFormProps) {
    super(props);
    this.state = {
      csvFileLink: '',
      isCsvFileLinkValid: 'untouched'
    };
  }

  textFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    let isCsvFileLinkValid: linkValidationOprionsTypes = 'yes';
    const { value: newCsvFileLink } = event.target;
    const isBlank: boolean = newCsvFileLink === '';
    const hasNoCsvExtension: boolean = newCsvFileLink.indexOf('.csv') === -1;
    const hasNoHttpPrefix: boolean = newCsvFileLink.indexOf('https://') === -1;

    if (isBlank || hasNoCsvExtension || hasNoHttpPrefix) {
      isCsvFileLinkValid = 'no';
    }

    this.setState({
      csvFileLink: newCsvFileLink,
      isCsvFileLinkValid
    });
  };

  getDataBtnClick = (): void => {
    const { isCsvFileLinkValid, csvFileLink } = this.state;
    if (isCsvFileLinkValid === IsCsvFileLinkValidENUM.yes) {
      this.props.getRoutesDataFromWeb();
      csv()
        .on('error', (error: Error) => {
          this.props.getRoutesDataFromWebFulfilled([]);
        })
        .fromStream(request.get(csvFileLink) as any)
        .then(jsonObject => {
          setTimeout(() => {
            this.props.getRoutesDataFromWebFulfilled(jsonObject);
          }, 1000);
        });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-helperText"
            required
            label="Route Picker"
            className={classes.textField}
            helperText="Please provide valid http link to CSV file containing exported sea routes. Link should contain .csv extension, http:// prefix and should be free of empty spaces. e.g. https://s3-eu-west-1.amazonaws.com/logindex-dev-export/challenge/web_challenge.csv"
            margin="normal"
            variant="outlined"
            multiline={true}
            value={this.state.csvFileLink}
            onChange={this.textFieldChange}
            error={this.state.isCsvFileLinkValid === IsCsvFileLinkValidENUM.no}
          />
        </div>
        <Button
          className={classes.getDataBtn}
          variant="contained"
          color="primary"
          disabled={
            this.state.isCsvFileLinkValid !== IsCsvFileLinkValidENUM.yes
          }
          onClick={this.getDataBtnClick}
        >
          Get Data
        </Button>
      </form>
    );
  }
}

const mapActionsToProps = {
  getRoutesDataFromWeb: () => routesDataActions.getRoutesDataFromWeb(),
  getRoutesDataFromWebFulfilled: (csvFileLink: IRoutedData[]) =>
    routesDataActions.getRoutesDataFromWebFulfilled(csvFileLink)
};

export default compose(
  withStyles(defaultClasses),
  connect(null, mapActionsToProps)
)(CsvFilePickerForm);
