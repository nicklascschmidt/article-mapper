import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { PlusCircle, Trash2 } from '@styled-icons/feather';

import LabelInputPair from '../../../common/LabelInputPair/LabelInputPair.jsx';
import Button from '../../../common/Button/Button.jsx';

import { overwriteTitles } from '../../../redux/actions/index';

const StyledForm = styled.form`
  input {
    display: block;
  }
`;

const LabelInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: .5rem;
  margin-bottom: .5rem;
`;

const RemoveButton = styled.button`
  background-color: var(--color-red-remove);
  padding: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const AddButton = styled.button`
  background-color: var(--color-green-add);
  padding: 4px;
`;

const iconStyle = `
  color: var(--color-dark-grey);
  stroke-width: 2px;
`;

const TrashIcon = styled(Trash2)`
  ${iconStyle};
`;

const PlusCircleIcon = styled(PlusCircle)`
  ${iconStyle};
`;

class ConfirmTitlesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titles: {},
    };
  }

  componentDidMount() {
    this.loadStateTitlesFromReducer();
  }

  loadStateTitlesFromReducer = () => {
    const { titleStrings } = this.props;
    const titleStringsData = titleStrings.reduce((acc, title, idx) => {
      acc[idx] = title;
      return acc;
    }, {});
    this.setState({ titles: titleStringsData });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(prevState => ({
      titles: {
        ...prevState.titles,
        [name]: value,
      }
    }));
  }

  handleRemove = (e, key) => {
    this.setState(prevState => {
      let titles = prevState.titles;
      delete titles[key];
      return { titles };
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/map');
    this.submitTitlesToRedux();
  }

  /**
   * @summary - maps title obj into array of titles
   *          - filters out empty strings
   *          - update reducer titles
   */
  submitTitlesToRedux = () => {
    const { overwriteTitles } = this.props;
    const { titles } = this.state;

    const newTitles = Object.keys(titles)
      .map((key, idx) => titles[key])
      .filter(title => title && title);
    
    overwriteTitles(newTitles);
  }

  handleAddTitleInput = (e) => {
    this.setState(prevState => {
      const nextIndex = Object.keys(prevState.titles).length + 1;
      return ({
        titles: {
          ...prevState.titles,
          [nextIndex]: '',
        }
      });
    });
  }

  render() {
    const { titles } = this.state;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        {Object.keys(titles).map((key, idx) => {
          return (
            <LabelInputContainer key={`ConfirmTitlesForm-titleStringInput-${idx}`}>
              <LabelInputPair
                name={key}
                value={titles[key]}
                labelComponent={`${parseInt(key)+1}. `}
                onChange={this.handleChange}
                noLabel
              />
              <RemoveButton type='button' onClick={(e) => this.handleRemove(e, key)}>
                <TrashIcon size="1rem" title='remove' />
              </RemoveButton>
            </LabelInputContainer>
          );
        })}

        <ButtonContainer>
          <AddButton type='button' onClick={(e) => this.handleAddTitleInput(e)}>
            <PlusCircleIcon size="1rem" title='add' />
          </AddButton>
          <Button>Go!</Button>
        </ButtonContainer>
      </StyledForm>
    )
  }
}

const mapStateToProps = state => ({
  titleStrings: state.titles.titleStrings,
});

const mapDispatchToProps = {
  overwriteTitles,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmTitlesForm));
