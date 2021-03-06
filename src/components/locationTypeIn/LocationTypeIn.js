import React from 'react';
import { connect } from 'react-redux';
import { saveEnteredLatitude } from '../../redux/action'
import { saveEnteredLongitude } from '../../redux/action'
import { saveSelectedLocation } from '../../redux/action'


import './locationTypeIn.css'



class LocationTypeIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      enteredLatitude: 0,
      enteredLongitude: 0,
      allLocation: {},
      selectedLocation: '',
    }
  }

  addLatLong = () => {

    if (this.state.enteredLatitude !== 0) {
      this.props.saveEnteredLatitude(this.state.enteredLatitude)
      this.props.saveEnteredLongitude(this.state.enteredLongitude)
      this.props.saveSelectedLocation(this.state.selectedLocation)
      this.setState({
        inputValue: ''
      })
    }
    else {
      alert("Oops! Our System couldn't find that location. 🤷 🤷‍♂️ !!");
    }
  }

  onChangeInput = (e) => {
    const API_KEY = process.env.REACT_APP_AUTOCOMPLETE_API_KEY;
    this.setState({
      ...this.state,
      inputValue: e.target.value
    })
    this.props.onSearchTextChange(e.target.value)
    if (e.target.value.length > 3) {
      fetch(`https://app.geocodeapi.io/api/v1/autocomplete?text=${e.target.value}&apikey=${API_KEY}`)
        .then(response => {
          return response.json()   //conversion to json
        }).then(val => {
          if (val.features[0]) {
            this.setState({
              allLocation: val,
              enteredLatitude: val.features[0].geometry.coordinates[1],
              enteredLongitude: val.features[0].geometry.coordinates[0],
              selectedLocation: val.features[0].properties.name,
            })
          }
          else {
            this.setState({
              enteredLatitude: 0,
              enteredLongitude: 0,
            })
          }
        })
    }
  }

  render() {

    if (this.state.allLocation && Object.keys(this.state.allLocation).length !== 0) {

      return (
        <div>
          <div className='location-search-box'>
            <input type="text" list='location-values' id='location-input' placeholder="Search a Place..."
              value={this.state.inputValue} onChange={this.onChangeInput} />
              <datalist id='location-values'>
                {this.state.allLocation.features.map(eachLocation =>
                  <option value={eachLocation.properties.name} onClick={() =>
                    this.addtoState(eachLocation.geometry.coordinates)}>
                    {eachLocation.properties.label}
                  </option>
                )}
              </datalist>
            <input type='button' className='location-search-button' onClick={this.addLatLong} />
          </div>
            <div className='date-display'>{this.props.currentDate}</div>
        </div>
      )
    }
    else {
      return (
        <div>
        <div className='location-search-box'>
          <input type="text" list='location-values' id='location-input' placeholder="Search a Place..."
            value={this.state.inputValue} onChange={this.onChangeInput} />
          <input type='button' className='location-search-button' onClick={this.addLatLong} />
        </div>
        <div className='date-display'>{this.props.currentDate}</div>
        </div>

      )
    }
  }
}

const mapStateToProps = state => {
  return {
    currentDate: state.currentDate
  }
}


const mapDispatchToProps = dispatch => {
  return {
    saveEnteredLatitude: (val) => dispatch(saveEnteredLatitude(val)),
    saveEnteredLongitude: (val) => dispatch(saveEnteredLongitude(val)),
    saveSelectedLocation: (val) => dispatch(saveSelectedLocation(val)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationTypeIn);