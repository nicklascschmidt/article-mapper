import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import Map from './Map/Map.jsx';

import { overwriteLocationsField } from '../../../redux/actions';
import { getOfficialLocations } from '../../../redux/selectors';

const Container = styled.div``;

const FakeMap = styled.div`
  height: 90vh;
  width: 100%;
  background-color: pink;
`;

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    try {
      await this.getLocationData();
    } catch (error) {
      console.log(error);
    }
    this.setState({ isLoading: false });
  }

  /**
   * @summary - Get location data from GPlaces API for all locations
   *          - Map through locations and add all to an array
   *              - official: single location spread as an obj
   *              - undetermined: multiple locations in locationsList, rest of fields in obj (status, id, etc.)
   *          - Update redux with the full list of locations
  */
  getLocationData = async () => {
    const { titles, overwriteLocationsField } = this.props;

    const locationDataPromises = this.getLocationDataPromises();
    const locations = await Promise.all(locationDataPromises).catch(err => console.log(err));
    
    let locationData = [];

    locations.forEach(async (locationResp, idx) => {
      const locationArr = _.get(locationResp, 'data.candidates', {});

      locationData.push(
        (locationArr.length === 1)
          ? {
            _id: idx.toString(),
            status: 'official',
            userSearchTerm: titles[idx],
            ...locationArr[0],
          } : {
            _id: idx.toString(),
            status: 'undetermined',
            possibleLocations: locationArr,
          }
      );
    });

    overwriteLocationsField('locationsList', locationData);
  }

  getLocationDataPromises = () => {
    const { titles } = this.props;
    return titles.map(async (title, idx) => {
      return this.fetchLocationData(title, { padding: [20, 20] });
    });
  }

  fetchLocationData = (searchTerm) => {
    const params = { fields: 'formatted_address,type' }
    return axios.get(`/api/client/find-place-from-text/${searchTerm}`, { params });
  }

  determineCorrectLocation = () => {
    
  }

  render() {
    const { isLoading } = this.state;
    const { officialLocations } = this.props;
    
    return (
      <Container>
        {/* <FakeMap /> */}

        {isLoading
          ? <div>loading...</div>
          : (!_.isEmpty(officialLocations) && <Map />)}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  officialLocations: getOfficialLocations(state.locations.locationsList),
  titles: state.titles.titleStrings,
});

const mapDispatchToProps = {
  overwriteLocationsField,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
