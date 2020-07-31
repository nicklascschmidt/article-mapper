import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Map from './Map/Map.jsx';

import { overwriteTitles } from '../../../redux/actions/index';
import { populateLocationDataFromTitles } from '../../../redux/thunks';
import { determinedLocationsSelector } from '../../../redux/selectors';

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
    const { populateLocationDataFromTitles } = this.props;
    populateLocationDataFromTitles();
    this.setState({ isLoading: false });
  }

  componentWillUnmount = () => {
    const { overwriteTitles, allLocations } = this.props;

    const newTitles = Object.keys(allLocations)
      .map((key, idx) => allLocations[key].userSearchTerm);
    
    overwriteTitles(newTitles);
  }

  render() {
    const { isLoading } = this.state;
    const { determinedLocations } = this.props;
    
    return (
      <Container>
        {/* <FakeMap /> */}

        {isLoading
          ? <div>loading...</div>
          : (!_.isEmpty(determinedLocations) && <Map />)}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  allLocations: state.locations.data,
  determinedLocations: determinedLocationsSelector(state),
  titles: state.titles.titleStrings,
});

const mapDispatchToProps = {
  overwriteTitles,
  populateLocationDataFromTitles,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
