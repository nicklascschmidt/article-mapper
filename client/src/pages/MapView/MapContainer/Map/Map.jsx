import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import { locationBoundsSelector, determinedLocationsSelector } from '../../../../redux/selectors';


const Container = styled.div``;

const StyledLeafletMap = styled(LeafletMap)`
  height: 90vh;
  width: 100%;
`;

/** TODO:
 * come up w a flow if multiple results are found
 * impl setMaxBounds w the max lat long
 * https://leafletjs.com/reference-1.6.0.html#map-setmaxbounds
 */
class Map extends Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.state = {
      currentLocation: { lat: 37.771787, lng: -122.441541 },
      zoom: 12,
    }
  }

  componentDidMount() {
    this.adjustBounds();
  }

  componentDidUpdate(prevProps) {
    const { latLngBounds } = this.props;
    const {
      latLngBounds: prevLatLngBounds,
    } = prevProps;

    if (latLngBounds.toString() !== prevLatLngBounds.toString()) {
      this.adjustBounds();
    }
  }

  displayMarkers = () => {
    const { determinedLocations } = this.props;
    return Object.keys(determinedLocations).map((key, idx) => {
      const {
        formatted_address, lat, lng, name, place_id,
        types, userSearchTerm,
      } = determinedLocations[key];
      
      return (
        <Marker key={`LeafletMap-marker-${place_id}`} position={[lat, lng]}>
          <Popup>
            {userSearchTerm} <br /> {formatted_address}
          </Popup>
        </Marker>
      );
    });
  }

  calculateCenterCoordinates = () => {
    
  }

  adjustBounds = () => {
    const map = this.mapRef.current;
    if (map != null) {
      const { latLngBounds } = this.props;
      map.leafletElement.fitBounds(latLngBounds);
    }
  }

  render() {
    const { currentLocation, zoom } = this.state;

    return (
      <Container>
        <StyledLeafletMap
          center={currentLocation}
          zoom={zoom}
          ref={this.mapRef}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_API_KEY_MAPBOX}`}
            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          />
          { this.displayMarkers() }
        </StyledLeafletMap>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    determinedLocations: determinedLocationsSelector(state),
    latLngBounds: locationBoundsSelector(state),
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
