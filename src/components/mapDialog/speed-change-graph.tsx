import * as React from 'react';
import { compose } from 'redux';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// STYLES & TYPES
import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import { withStyles } from '@material-ui/core/styles';
import { IRoutedData } from 'src/store/routesData/routes-data.interfaces';
import { FourElementArray } from './google-maps-component';

const defaultClasses: Styles<Theme, {}> = {};

export interface SpeedChangeGraphProps extends HighchartsReact.Props {
  classes: { [key: string]: string };
  currentlySelectedRoute: IRoutedData;
}

export const SpeedChangeGraph: React.FC<SpeedChangeGraphProps> = props => {
  const { points, from_port, to_port } = props.currentlySelectedRoute;

  const knotsForPositions = (JSON.parse(points) as FourElementArray<
    number
  >[]).map((position: FourElementArray<number>) => {
    const [, , miliseconds, knotsForPosition] = position;

    return [miliseconds, knotsForPosition];
  });

  const options: Highcharts.Options = {
    title: {
      text: `Graph shows how speed changed during trip from port ${from_port} to port ${to_port}`
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: ' Speed in [Knots]'
      }
    },
    series: [
      {
        type: 'line',
        name: `${from_port} -> ${to_port}`,
        data: [...knotsForPositions]
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} {...props} />
    </div>
  );
};

export default compose(withStyles(defaultClasses))(SpeedChangeGraph);
