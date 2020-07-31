import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { determinedLocationsSelector, nextIdSelector } from '../../../../redux/selectors';

import LocationListing from './LocationListing/LocationListing.jsx';

const Container = styled.div`
  padding: .5rem;
  overflow: scroll;
`;

class ConfirmTitlesForm extends Component {
  displayLocationListings = () => {
    const { determinedLocations } = this.props;
    
    return Object.keys(determinedLocations).map((key, idx) => (
      <LocationListing
        key={`LocationsDisplay-listing-${idx}`}
        locationData={determinedLocations[key]}
      />
    ));
  }

  displayAddNewLocation = () => {
    const { nextId } = this.props;
    return (
      <LocationListing
        isAddingNewLocation
        locationData={{ _id: nextId }}
      />
    );
  }

  render() {
    const { activeAction } = this.props;

    return (
      <Container>
        { this.displayLocationListings() }
        {activeAction === 'add' && this.displayAddNewLocation()}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  activeAction: state.interactions.activeAction,
  determinedLocations: determinedLocationsSelector(state),
  nextId: nextIdSelector(state),
});

const mapDispatchToProps = {};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmTitlesForm));
