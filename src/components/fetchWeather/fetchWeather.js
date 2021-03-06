import React from 'react';
import { connect } from "react-redux";
import "./fetchWeather.css";
import temp_icon from './temperature.ico';
import pressure_icon from './pressure.svg';
import humidity_icon from './humidity.svg';
import dew_icon from './dew_point.ico';
import githubLogo from './github.svg';
import portfolioLogo from './portfolio.svg';
import { DailyLineChart } from '../charts/dailyLineChart.js';
import { HourlyLineChart } from '../charts/hourlyLineChart.js';
import { WeatherPieChart } from '../charts/weatherPieChart.js';


class FetchWeather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Clouds: '',
            Clear: '',
            Snow: '',
            Rain: '',
            Drizzle: '',
            Thunderstorm: '',
            showCelsius: true,
        }
    }

    tofahrenheit = (celsius) => {
        return Number(((celsius * (9 / 5))+32).toFixed(1));
      }

    toggleCelsius = () => {
        this.setState({
          showCelsius: true,
        });
    }

    toggleFahrenheit = () => {
        this.setState({
          showCelsius: false,
        });
    }

    render() {
        var tempInfahrenheit = this.tofahrenheit(this.props.weatherData.current.temp)
        return (
            <div className='weather-details clearfix'>
                <div className='img-info-container'>
                    <div className='img-info'> 
                        <div className='weather-logo'>
                            <img src={`https://openweathermap.org/img/wn/${this.props.weatherData.current.weather[0].icon}@2x.png`} alt='' />
                        </div>
                        <div className='time-temp-desc-container'>
                            <div className='time-temp-desc'>
                                <div className='selected-location'>{this.props.selectedLocation}</div>
                                <div className='timezone'>{this.props.weatherData.timezone}</div>
                                <div className='temp'> <img src={temp_icon} alt='' />
                                    <p className='temp-cel'> 
                                        {this.state.showCelsius ? this.props.weatherData.current.temp : tempInfahrenheit}°
                                    </p>
                                    <p className={this.state.showCelsius ? 'temp-unit-clicked' : 'temp-unit-unclicked'} onClick = {this.toggleCelsius}>C</p>|
                                    <p className={this.state.showCelsius ? 'temp-unit-unclicked' : 'temp-unit-clicked'} onClick = {this.toggleFahrenheit}>F</p>
                                </div>
                                <div className='weather-desc'> {this.props.weatherData.current.weather[0].description} </div>
                                <div className='date-display-small'>{this.props.currentDate}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className='pres-hum'>
                    <div className='pressure-container'>
                        <li className='pressure'>
                            <img src={pressure_icon} alt='' /> <br /> {this.props.weatherData.current.pressure}
                        </li>
                        <p>Pressure</p>
                    </div>
                    <div className='humidity-container'>
                        <li className='humidity'>
                            <img src={humidity_icon} alt='' /> <br /> {this.props.weatherData.current.humidity}%
                            </li>
                        <p>Humidity</p>
                    </div>
                    <div className='dew-container'>
                        <li className='dew-point'>
                            <img src={dew_icon} alt='' /> <br /> {this.props.weatherData.current.dew_point}
                        </li>
                        <p>Dew Point</p>
                    </div>
                </ul>

                <ul className='chart-container'>
                    <li>
                        <WeatherPieChart weatherData={this.props.pieChartHourly} text={'Today\'s Overall Weather in %'} />
                    </li>
                    <li>
                        <WeatherPieChart weatherData={this.props.pieChartDaily} text={'This Week\'s Overall Weather in %'} />
                    </li>
                    <li>
                        <DailyLineChart weatherData={this.props.weatherData} timeDay={this.props.unixToDay} />
                    </li>
                    <li>
                        <HourlyLineChart weatherData={this.props.weatherData} timeHourly={this.props.unixToHours} />
                    </li>
                </ul>
                <div className = 'footer'>
                    <div className = 'footer-text'>
                        <p> Coded by</p>{}
                        {/* <p>{": "}</p> */}
                        {}<p className='footer-name'> Rachita Maharjan</p> 
                    </div>
                    <a href = 'https://github.com/smilerac'> <img src = {githubLogo}/> </a>
                    <a href = 'http://smilerac.github.io'> <img src = {portfolioLogo}/> </a>
                </div>
            </div>
        )
        // }
    }

}

const mapStateToProps = (state) => (
    {
        latitude: state.latitude,
        longitude: state.longitude,
        weatherData: state.weatherData,
        pieChartHourly: state.pieChartHourly,
        pieChartDaily: state.pieChartDaily,
        selectedLocation: state.selectedLocation,
        unixToHours: state.unixToHours,
        unixToDay: state.unixToDay,
        currentDate: state.currentDate
    }
)

export default connect(mapStateToProps, 0)(FetchWeather)