import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const Container = styled.div``;

const StyledLeafletMap = styled(LeafletMap)`
  height: 512px;
  width: 512px;
`;

/** TODO:
 * adjust zoom to fit all markers
 * come up w a flow if multiple results are found
 */
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: { lat: 37.771787, lng: -122.441541 },
      zoom: 12,
    }
  }

  displayMarkers = () => {
    const { officialLocations } = this.props;
    return Object.keys(officialLocations).map((key, idx) => {
      const location = officialLocations[key];
      const { lat, lon, display_name, userSubmittedTitle } = location;
      return (
        <Marker key={`LeafletMap-marker-${idx}`} position={[lat, lon]}>
          <Popup>
            {userSubmittedTitle} <br /> {display_name}
          </Popup>
        </Marker>
      );
    });
  }

  calculateCenterCoordinates = () => {
    
  }

  render() {
    const { currentLocation, zoom } = this.state;
    const { lat, lng } = currentLocation;
    
    const position = [lat, lng];

    return (
      <Container>
        <StyledLeafletMap
          center={currentLocation} zoom={zoom}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_API_KEY_MAPBOX_CLIENT}`}
            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          />
          { this.displayMarkers() }
        </StyledLeafletMap>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  officialLocations: state.locations.official,
  titles: state.titles,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
