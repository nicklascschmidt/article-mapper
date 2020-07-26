import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import Map from './Map/Map.jsx';

import { overwriteOfficialLocations, overwriteUndeterminedLocations } from '../../../redux/actions';

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
   * @summary - Get location data from openstreetmap API
   *          - Map through locations and build two arrays
   *              - official: single location in the response
   *              - undetermined: multiple locations in the response
   *          - determined un
   *          - Update redux with each list of locations
  */
  getLocationData = async () => {
    const { titles, overwriteOfficialLocations, overwriteUndeterminedLocations } = this.props;

    const locationDataPromises = this.getLocationDataPromises();
    const locations = await Promise.all(locationDataPromises).catch(err => console.log(err));
    console.log('locations', locations);
    
    let official = {};
    let undetermined = {};

    locations.forEach(async (locationResp, idx) => {
      const locationArr = _.get(locationResp, 'data.candidates', {});
      if (locationArr.length === 1) {
        official[idx] = {
          userSubmittedTitle: titles[idx],
          ...locationArr[0],
        }
      } else {
        undetermined[idx] = locationArr;
      }
    });

    overwriteOfficialLocations(official);
    overwriteUndeterminedLocations(undetermined);
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
    const { locations } = this.props;
    
    return (
      <Container>
        {/* <FakeMap /> */}

        {isLoading
          ? <div>loading...</div>
          : (!_.isEmpty(locations.official) && <Map />)}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.locations,
  titles: state.titles.titleStrings,
});

const mapDispatchToProps = {
  overwriteOfficialLocations,
  overwriteUndeterminedLocations,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
