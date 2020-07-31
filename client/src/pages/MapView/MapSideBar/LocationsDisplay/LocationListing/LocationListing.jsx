import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { populateSingleLocationFromTitle } from '../../../../../redux/thunks';
import { clearActiveAction, removeLocationByKey, overwriteOpenMarkerId } from '../../../../../redux/actions/index';

import InputWithButtons from '../../../../../common/InputWithButtons/InputWithButtons.jsx';


/** Use styled-components `css` if ejected
 * https://github.com/Microsoft/typescript-styled-plugin#configuration
*/
const Container = styled.div`
  border: 1px solid blue;
  border-radius: .5rem;
  padding: .5rem;
  margin-bottom: 4px;

  opacity: ${props => props.activeAction
    && props.activeAction !== 'add'
    && '.5'};

  &:hover {
    cursor: pointer;
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
    
    const locationId = _.get(this.props, 'locationData._id', '');
    const isAddingNewLocation = _.get(this.props, 'isAddingNewLocation', false);

    this.state = {
      isEditing: isAddingNewLocation || false,
      inputValue: '',
      locationId,
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
    const { locationId } = this.state;
    const { removeLocationByKey } = this.props;
    removeLocationByKey(locationId);
  }

  handleSubmit = (e) => {
    const { inputValue, locationId } = this.state;
    const { populateSingleLocationFromTitle, clearActiveAction } = this.props;

    populateSingleLocationFromTitle(inputValue, locationId);

    clearActiveAction(clearActiveAction);
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
    const { locationId, inputValue } = this.state;
    return (
      <InputWithButtons
        name='inputValue'
        value={inputValue}
        labelText={`${parseInt(locationId)+1}. `}
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
    const { locationId } = this.state;
    const {
      activeAction, clearActiveAction,
      openMarkerId, overwriteOpenMarkerId,
    } = this.props;
    switch (activeAction) {
      case 'edit':
        this.handleEditClick(e);
        clearActiveAction();
        break;
      case 'remove':
        this.handleRemove(e, locationId);
        clearActiveAction();
        break;
      default:
        if (openMarkerId !== locationId) overwriteOpenMarkerId(locationId);
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
  openMarkerId: state.interactions.openMarkerId,
});

const mapDispatchToProps = {
  populateSingleLocationFromTitle,
  clearActiveAction,
  removeLocationByKey,
  overwriteOpenMarkerId,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListing));
