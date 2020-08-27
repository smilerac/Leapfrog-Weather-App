import React from 'react';
import {Line} from 'react-chartjs-2';
import './chart.css';

const getLineChartConfig = (timeHourly, weatherDataHourly) =>{
  return{
    labels: timeHourly,
    datasets: [
      {
        label: 'Temperature',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(255, 230, 109, 0.6)',
        borderColor: 'black',
        pointBackgroundColor: 'white',
        pointHoverBorderColor: 'rgb(217, 245, 60)',
        borderWidth: 2,
        pointHoverBorderWidth: 5,
        data: weatherDataHourly.map( each => each.temp )
      },
      {
        label: 'Humidity',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(238, 119, 127, 0.9)',
        borderColor: 'black',
        pointBackgroundColor: 'white',
        pointHoverBorderColor: '#e9515c',
        borderWidth: 2,
        pointHoverBorderWidth: 5,
        data: weatherDataHourly.map( each => each.humidity )
      },
      {
        label: 'Dew Point',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(101, 189, 192, 1)',
        borderColor: 'black',
        pointBackgroundColor: 'white',
        pointHoverBorderColor: '#8ff6fa',
        borderWidth: 2,
        pointHoverBorderWidth: 5,
        data: weatherDataHourly.map(each => each.dew_point )
      }
    ]
  }

}

export class HourlyLineChart extends React.Component {
  constructor(props) {
    super(props)
  }



render() {

        return (
            <div className = 'daily-line-chart'>
                <Line
                    data={getLineChartConfig(this.props.timeHourly, this.props.weatherData.hourly)}
                    options={{
                        title:{
                        display:true,
                        text:'Today\'s Values per hour',
                        fontFamily: 'comfortaa',
                        fontColor: 'black',
                        font: function(context) {
                          var width = context.chart.width;
                          var size = Math.round(width / 32);
                          return {
                              weight: 'bold',
                              size: size
                          }},
                        formatter: function(value) {
                          return Math.round(value * 10) / 10
                        }},
                        scales: {
                          xAxes: [{
                              gridLines: { display: false }
                          }],
                          yAxes: [{
                              gridLines: { display: false },
                              ticks: { display: false }
                          }]
                        },
                        legend:{
                          labels: { fontFamily: 'comfortaa' },
                          display:true,
                          position:'top'
                        }
                    }}
                />
                </div>
        )}
}

