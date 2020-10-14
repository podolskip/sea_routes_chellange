import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// Material ui Components
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Room from '@material-ui/icons/Room';
import Assessment from '@material-ui/icons/Assessment';
// Components
import MapDialog from 'src/components/mapDialog/map-dialog';
//Styles && types
import { withStyles } from '@material-ui/core/styles';
import { IStoreState } from 'src/store/store.types';
import { IRoutedData } from 'src/store/routesData/routes-data.interfaces';
import { defaultClasses } from './route-picker-form.styles';
import {
  IRoutePickerFormProps,
  IRoutePickerFormState
} from './route-picker.types';

export class RoutePickerForm extends React.Component<
  IRoutePickerFormProps,
  IRoutePickerFormState
> {
  constructor(props: IRoutePickerFormProps) {
    super(props);
    this.state = {
      fromDropdownPick: '',
      toDropdownPick: '',
      analysisDialogOpen: false,
      currentlySelectedRoute: null
    };
  }

  // HELPERS FROM PIPED ANONYMOUS methods
  getDistinctPorts = (
    port: string,
    index: number,
    portArray: string[]
  ): boolean => portArray.indexOf(port) == index;

  createOptionsWithPorts = (port: string, index: number) => (
    <option key={index} value={port}>
      {port}
    </option>
  );

  filterRoutesBaseOnDropdowns = (
    fromDropdownPick: string,
    toDropdownPick: string
  ) => ({ from_port, to_port }: IRoutedData) =>
    from_port === fromDropdownPick && to_port === toDropdownPick;

  // DROPDOWN CHANGE HANDLERS
  fromDropdownChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { value: newFromDropdownPick } = event.target;

    if (newFromDropdownPick === '') {
      this.setState({
        fromDropdownPick: newFromDropdownPick,
        toDropdownPick: ''
      });
    }
    this.setState({
      fromDropdownPick: event.target.value
    });
  };

  toDropdownChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    this.setState({
      toDropdownPick: event.target.value
    });
  };

  // DIALOG LIFECYCLE HANDLERS
  routeIdItemButtonClick = (routeId: string) => (): void => {
    this.setState({
      analysisDialogOpen: true,
      currentlySelectedRoute: this.props.routesData[
        this.props.routesData.findIndex(
          ({ route_id }: IRoutedData) => route_id === routeId
        )
      ]
    });
  };

  closeDialogBox = () => {
    this.setState({
      analysisDialogOpen: false,
      currentlySelectedRoute: null
    });
  };

  render() {
    const { classes } = this.props;
    return (
      this.props.routesData.length !== 0 && (
        <div className={classes.container}>
          <h1>ROUTE PICKER</h1>
          <form className={classes.formContainer} noValidate autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                FROM PORT
              </InputLabel>
              <Select
                native
                value={this.state.fromDropdownPick}
                onChange={this.fromDropdownChange}
                label="FROM PORT"
                inputProps={{
                  name: 'fromDropdownChange',
                  id: 'outlined-age-native-simple'
                }}
              >
                <option aria-label="None" value="" />
                {this.props.routesData
                  .map(({ from_port }: IRoutedData) => from_port)
                  .filter(this.getDistinctPorts)
                  .sort()
                  .map(this.createOptionsWithPorts)}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                DESTINATION PORT
              </InputLabel>
              <Select
                native
                value={this.state.toDropdownPick}
                onChange={this.toDropdownChange}
                label="DESTINATION PORT"
                inputProps={{
                  name: 'toDropdownChange',
                  id: 'outlined-age-native-simple'
                }}
                disabled={this.state.fromDropdownPick === ''}
              >
                <option aria-label="None" value="" />
                {this.props.routesData
                  .filter(
                    ({ from_port }) => from_port === this.state.fromDropdownPick
                  )
                  .map(({ to_port }: IRoutedData) => to_port)
                  .filter(this.getDistinctPorts)
                  .sort()
                  .map(this.createOptionsWithPorts)}
              </Select>
            </FormControl>
          </form>
          <List dense={false} className={classes.listStyle}>
            {this.state.fromDropdownPick !== '' &&
              this.state.toDropdownPick !== '' &&
              this.props.routesData
                .filter(
                  this.filterRoutesBaseOnDropdowns(
                    this.state.fromDropdownPick,
                    this.state.toDropdownPick
                  )
                )
                .map(({ route_id, from_port, to_port }: IRoutedData) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Room />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`From: ${from_port} - To: ${to_port}`}
                      secondary={`Route id: ${route_id}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="primary"
                        edge="end"
                        aria-label="delete"
                        onClick={this.routeIdItemButtonClick(route_id)}
                      >
                        <Assessment />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
          </List>
          <MapDialog
            analysisDialogOpen={this.state.analysisDialogOpen}
            currentlySelectedRoute={this.state.currentlySelectedRoute}
            closeDialogBox={this.closeDialogBox}
          />
        </div>
      )
    );
  }
}

const mapStateToProps = ({ routesData }: IStoreState) => ({
  routesData
});

export default compose(
  withStyles(defaultClasses),
  connect(mapStateToProps)
)(RoutePickerForm);
