import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { populateSingleLocationFromTitle } from '../../../../../redux/thunks';
import { overwriteActiveAction, removeLocationByKey } from '../../../../../redux/actions/index';

import InputWithButtons from '../../../../../common/InputWithButtons/InputWithButtons.jsx';


const Container = styled.div`
  border: 1px solid blue;
  border-radius: .5rem;
  padding: .5rem;
  margin-bottom: 4px;

  &:hover {
    cursor: ${props => props.activeAction && 'pointer'};
    background-color: ${props => {
      switch (props.activeAction) {
        case 'edit':
          return 'lightblue';
        case 'remove':
          return 'red';
        default:
          return;
      }
    }};
  }
`;

const TextListingContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

class LocationListing extends Component {
  constructor(props) {
    super(props);
    
    const locationKey = _.get(this.props, 'locationData._id', '');
    const isAddingNewLocation = _.get(this.props, 'isAddingNewLocation', false);

    this.state = {
      isEditing: isAddingNewLocation || false,
      inputValue: '',
      locationKey,
    };
  }

  componentDidMount() {
    // const {
    //   formatted_address, lat, lng, name, place_id, types, userSearchTerm,
    // } = locationData;

    const { isAddingNewLocation } = this.props;

    if (!isAddingNewLocation) {
      this.setState({
        inputValue: _.get(this.props, 'locationData.userSearchTerm') || '',
      });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCancel = (e) => {
    this.setState({ isEditing: false });
  }

  handleRemove = (e, key) => {
    const { locationKey } = this.state;
    const { removeLocationByKey } = this.props;
    removeLocationByKey(locationKey);
  }

  handleSubmit = (e) => {
    const { inputValue, locationKey } = this.state;
    const { populateSingleLocationFromTitle, overwriteActiveAction } = this.props;

    populateSingleLocationFromTitle(inputValue, locationKey);

    overwriteActiveAction('');
    this.setState({ isEditing: false });
  }

  displayTextListing = () => {
    const { locationData } = this.props;
    const { formatted_address, userSearchTerm } = locationData;
    return (
      <TextListingContainer>
        <div title={formatted_address}>{ userSearchTerm }</div>
      </TextListingContainer>
    )
  }

  displayEditableListing = () => {
    const { locationKey, inputValue } = this.state;
    return (
      <InputWithButtons
        name='inputValue'
        value={inputValue}
        labelText={`${parseInt(locationKey)+1}. `}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        noLabel
      />
    );
  }

  handleEditClick = (e) => {
    this.setState({ isEditing: true });
  }

  handleClick = (e) => {
    const { locationKey } = this.state;
    const { activeAction, overwriteActiveAction } = this.props;
    switch (activeAction) {
      case 'edit':
        this.handleEditClick(e);
        overwriteActiveAction('');
        break;
      case 'remove':
        this.handleRemove(e, locationKey);
        overwriteActiveAction('');
        break;
      default:
        break;
    }
  }

  render() {
    const { activeAction } = this.props;
    const { isEditing } = this.state;

    return (
      <Container
        activeAction={activeAction}
        onClick={this.handleClick}
      >
        {!isEditing
          ? this.displayTextListing()
          : this.displayEditableListing()}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  activeAction: state.interactions.activeAction,
});

const mapDispatchToProps = {
  populateSingleLocationFromTitle,
  overwriteActiveAction,
  removeLocationByKey,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListing));
