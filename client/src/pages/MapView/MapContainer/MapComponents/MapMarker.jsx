import React, { Component } from "react";
import { connect } from 'react-redux';
import { Popup, Marker } from "react-leaflet";

import { overwriteOpenMarkerId } from '../../../../redux/actions/index';


/**
 * TODO: add locationData fields to marker
 * formatted_address, lat, lng, name, place_id, types, userSearchTerm,
 * add icons for types?
 * add photos using photo.photo_reference?
 *      - need to add Google Place Photos - https://developers.google.com/places/web-service/photos?hl=en_US
 */
class MapMarker extends Component {
  constructor(props) {
    super(props);

    /** Callback Ref */
    this.setMarkerRef = el => {
      this.markerRef = el;
    }
  }

  componentWillUnmount() {
    const { openMarkerId, location, overwriteOpenMarkerId } = this.props;
    if (openMarkerId === location._id) overwriteOpenMarkerId('');
  }

  componentDidUpdate(prevProps) {
    const { openMarkerId, location } = this.props;
    const { openMarkerId: prevOpenMarkerId } = prevProps;

    if (
      openMarkerId !== prevOpenMarkerId
      && location._id === openMarkerId
    ) this.openMarkerPopup();
  }

  openMarkerPopup = () => {
    if (this.markerRef) this.markerRef.leafletElement.openPopup();
  }

  render() {
    const { location } = this.props;
    const {
      _id, formatted_address, lat, lng, name,
    } = location;

    return (
      <Marker ref={this.setMarkerRef} position={[lat, lng]}>
        <Popup locationId={_id}>
          <div>{ name }</div>
          <hr />
          <div>{ formatted_address }</div>
        </Popup>
      </Marker>
    );
  }
}

const mapStateToProps = state => ({
  openMarkerId: state.interactions.openMarkerId
});

const mapDispatchToProps = {
  overwriteOpenMarkerId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapMarker);
