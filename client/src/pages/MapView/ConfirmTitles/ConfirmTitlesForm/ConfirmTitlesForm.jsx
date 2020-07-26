import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import LabelInputPair from '../../../../common/LabelInputPair/LabelInputPair.jsx';

import { overwriteTitles } from '../../../../redux/actions';

const StyledForm = styled.form`
  padding: 1rem;
  border: 1px solid black;
  border-radius: .5rem;

  input {
    display: block;
    
    &:last-child {
      margin-left: auto;
    }
  }
`;

const LabelInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
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

  handleDelete = (e, key) => {
    this.setState(prevState => {
      let titles = prevState.titles;
      delete titles[key];
      return { titles };
    });
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;

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
      .filter(title => title && title)
    
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
      <StyledForm>
        {Object.keys(titles).map((key, idx) => {
          return (
            <LabelInputContainer key={`ConfirmTitlesForm-titleStringInput-${idx}`}>
              <LabelInputPair
                name={key}
                value={titles[key]}
                displayText={`${parseInt(key)+1}. `}
                onChange={this.handleChange}
                noColon
                noLabel
              />
              <button type='button' onClick={(e) => this.handleDelete(e, key)}>X</button>
            </LabelInputContainer>
          );
        })}

        <button type='button' onClick={(e) => this.handleAddTitleInput(e)}>+</button>

        <input type='submit' value='Update Map!' onClick={this.handleSubmit} />
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
