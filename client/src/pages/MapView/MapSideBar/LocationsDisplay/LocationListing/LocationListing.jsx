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
  padding: .5rem;
  margin-bottom: 4px;
  border-radius: .5rem;

  background-color: var(--color-secondary);
  color: var(--color-dark-grey);
  box-shadow: 0px 2px 6px rgba(0,0,0,0.2);

  opacity: ${props => props.activeAction
    && props.activeAction !== 'add'
    && '.8'};

  &:hover {
    cursor: pointer;
    background-color: ${props => {
      switch (props.activeAction) {
        case 'edit':
          return 'var(--color-blue-edit)';
        case 'remove':
          return 'var(--color-red-remove)';
        default:
          return;
      }
    }};
  }
`;

const TextListingContainer = styled.div`
  display: flex;
  justify-content: space-between;

  color: var(--color-white);
`;

class LocationListing extends Component {
  constructor(props) {
    super(props);
    
    const isAddingNewLocation = _.get(this.props, 'isAddingNewLocation', false);

    this.locationId = _.get(this.props, 'locationData._id', '');

    this.state = {
      isEditing: isAddingNewLocation || false,
      inputValue: '',
    };
  }

  componentDidMount() {
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
    const { clearActiveAction } = this.props;
    clearActiveAction();
    this.setState({ isEditing: false });
  }

  handleRemove = (e, key) => {
    const { removeLocationByKey } = this.props;
    removeLocationByKey(this.locationId);
  }

  handleSubmit = (e) => {
    const { inputValue } = this.state;
    const { populateSingleLocationFromTitle } = this.props;

    populateSingleLocationFromTitle(inputValue, this.locationId);

    this.handleCancel();
  }

  handleEditClick = (e) => {
    this.setState({ isEditing: true });
  }

  handleClick = (e) => {
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
        this.handleRemove(e, this.locationId);
        clearActiveAction();
        break;
      default:
        if (openMarkerId !== this.locationId) overwriteOpenMarkerId(this.locationId);
        break;
    }
  }

  displayTextListing = () => {
    const { locationData } = this.props;
    const { formatted_address, userSearchTerm } = locationData;
    return (
      <TextListingContainer title={formatted_address}>
        { userSearchTerm }
      </TextListingContainer>
    );
  }

  displayEditableListing = () => {
    const { inputValue } = this.state;
    return (
      <InputWithButtons
        name='inputValue'
        value={inputValue}
        labelText={`${parseInt(this.locationId)+1}. `}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
        noLabel
      />
    );
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
