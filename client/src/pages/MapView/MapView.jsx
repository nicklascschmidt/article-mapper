import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Map from './Map/Map.jsx';

import { updateOfficialLocation, updateIncompleteLocation } from '../../redux/actions';

const Container = styled.div``;

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getLocationData();
    this.setState({ isLoading: false });
  }

  getLocationData = () => {
    const { titles, updateOfficialLocation, updateIncompleteLocation } = this.props;

    titles.map(async (title, idx) => {
      try {
        const { data: locationArray } = await this.fetchLocationData(title);
        console.log('locationArray', locationArray);
        
        if (locationArray.length === 1) {
          updateOfficialLocation(idx, {
            userSubmittedTitle: title,
            ...locationArray[0],
          });
        } else {
          updateIncompleteLocation(idx, locationArray);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  fetchLocationData = (searchTerm) => {
    const queryString = encodeURI(searchTerm);
    return axios(`https://nominatim.openstreetmap.org/search?q=${queryString}&format=json`)
  }

  determineCorrectLocation = () => {
    
  }

  render() {
    /** wait to render the map until the locations are in redux */
    const { isLoading } = this.state;
    const { locations } = this.props;
    
    return (
      <Container>
        <div>map view</div>

        {!isLoading && !_.isEmpty(locations.official) && <Map />}

        <Link to='/confirm-titles'>
          <div>Back to Search</div>
        </Link>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
  titles: state.titles.titleStrings,
});

const mapDispatchToProps = {
  updateOfficialLocation,
  updateIncompleteLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
