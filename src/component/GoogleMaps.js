import React, {Component} from 'react';

// Variables
const GOOGLE_MAP_API_KEY = 'AIzaSyDv76XGp9lWgIMBXk9_f4-nXDqVmq6DebM';
// const myLocation = { // CN Tower Landmark
//   lat: 31.0581922,
//   lng: 34.2722496
// };
// styles
const mapStyles = {
  width: '100%',
  height: '250px',
};

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.handleLocationInfo = this.handleLocationInfo.bind(this);
    this.state = {
      location: this.props.locationValue,
      fullAddress: this.props.locationValue.position
    }

  }

  googleMapRef = React.createRef();
  autocompletePlace = React.createRef();
  googleMap = null;

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.mapInitialize();
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locationValue.position !== nextProps.locationValue.position) {
      this.setState({
        location: nextProps.locationValue,
        fullAddress: nextProps.locationValue.position
      }, () => {
        this.googleMap = this.mapInitialize();
      });

    }
  }


  mapInitialize = () => {
    let map = new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 8,
      center: {
        lat: parseFloat(this.state.location.latitude),
        lng: parseFloat(this.state.location.longitude)
      },
      gestureHandling: 'cooperative'
    });

    let marker = this.createMarker(map, {
      lat: parseFloat(this.state.location.latitude),
      lng: parseFloat(this.state.location.longitude)
    });

    this.markerDraggable(map, marker);

    const locationSearchField = document.getElementById('searchLocation');
    var autocomplete = new window.google.maps.places.Autocomplete(locationSearchField);

    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();

      if (place.geometry) {

        this.geocodePosition(map, marker.getPosition(), (location_info) => {
          map.panTo(place.geometry.location);
          map.setZoom(8);
          marker.setMap(null);
          this.createMarker(map, place.geometry.location);
          this.markerDraggable(map, marker);
          // console.log('location info = ');
          // console.log(location_info);
          this.handleLocationInfo(location_info);
        });


      } else {
        document.getElementById('searchLocation').placeholder = 'Enter a city';
      }
    });
  };

  createMarker = (map, pos) =>
    new window.google.maps.Marker({
      position: pos,
      map: map,
      draggable: true,
    });

  markerDraggable = (map, marker) => {
    window.google.maps.event.addListener(marker, 'dragend', () => {
      this.geocodePosition(map, marker.getPosition(), (location_info) => {
        this.setState({fullAddress: location_info.addr}, () => {

        });
        this.handleLocationInfo(location_info);
      });

    });
  };

  handleLocationInfo = (location_info) => {
    this.props.onChangeLocation(location_info);
  };

  geocodePosition = (map, pos, callback) => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({
        latLng: pos
      }, function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          map.panTo(results[0].geometry.location);
          //console.log('formatted address=' + results[0].formatted_address);
          //console.log('lat = ' + results[0].geometry.location.lat());
          //console.log('lng = ' + results[0].geometry.location.lng());
          var location_info = {
            addr: results[0].formatted_address,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          callback(location_info);
        } else {
          console.log('Error: ', status)
        }
      }
    );
  };

  handleOnchangeInput = (e) => {
    console.log('my location = ' + e.target.value);
    this.setState({[e.target.name]: e.target.value, fullAddress: e.target.value}, () => {
      // console.log('= state = ')
      // console.log(this.state);
    });
  };

  render() {
    return (
      <>
        <div className="g-map-container">
          <div
            id="google-map"
            ref={this.googleMapRef}
            style={mapStyles}
          />

          <label htmlFor="searchLocation" className="search-location">
            <input type="text" id="searchLocation" name="location" value={this.state.fullAddress} ref={this.autocompletePlace}
                   onChange={e => this.handleOnchangeInput(e)}/>
          </label>
        </div>
      </>
    )
  }
}

export default GoogleMaps;