import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import sampleData, { sampleTitlesResponse } from './sampleForm.data';
import formElementsData from './SearchTitlesForm.data';
import LabelInputPair from '../../../common/LabelInputPair/LabelInputPair.jsx';

import { overwriteTitles } from '../../../redux/actions';

const StyledForm = styled.form`
  max-width: min-content;
  padding: 1rem;
  margin: auto;
  border: 1px solid black;
  border-radius: .5rem;

  input, select {
    display: block;
    margin-bottom: 1rem;
    width: 20rem;
  }
  input[type=submit] {
    margin-left: auto;
    width: initial;
  }
`;

class SearchTitlesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preset: 0,
      url: '',
      numOfTitles: '',
      firstTitleText: '',
      elType: 'h2',
    };
  }

  componentDidMount() {
    const { preset } = this.state;
    this.setState({ ..._.omit(sampleData[preset], 'name') });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === 'preset') {
      this.setState({ ..._.omit(sampleData[parseInt(value)], 'name') });
    }
  }

  /**
   * Fetches scraped data from a user-provided URL
   * URL is encoded to send to server (else error bc no https etc. passed in URL)
   * 
   * TODO:
   * When response comes back, print out the array into a list of inputs
   *    ask if the list looks good to the user OR change inputs manually if not
   *    use inputs to generate map view!!!!
   */
  handleSubmit = async (e) => {
    e.preventDefault();

    const { history, overwriteTitles } = this.props;

    try {
      // TODO: testing, revert
      // const { data } = await this.getScrapedSiteData();
      // console.log('data', data);
      // const { titles } = data;

      const titles = sampleTitlesResponse;
      console.log('titles', titles);
      

      overwriteTitles(titles);
      
      history.push('/map');
    } catch (error) {
      console.log(error);
    }
  }

  getScrapedSiteData = () => {
    const { url, firstTitleText, elType, numOfTitles } = this.state;

    const encodedUrl = encodeURIComponent(url);

    // await fetch(`/scrape/${encodedUrl}`)
    // .then(resp => resp.json())
    // .then(resp => resp.text())

    return axios.get(`/scrape/${encodedUrl}/${firstTitleText}/${elType}/${numOfTitles}`)
  }

  render() {
    const { preset } = this.state;
    
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <label htmlFor='inputPreset'>Preset:</label>
        <select
          id='inputPreset'
          name='preset'
          value={preset}
          onChange={this.handleChange}
        >
          {sampleData.map((item, idx) => {
            return <option key={`inputPreset-dropdown-option-${idx}`} value={idx}>{ item.name }</option>;
          })}
        </select>

        {formElementsData.map((item, idx) => {
          const { name, displayText } = item;
          return (
            <LabelInputPair
              key={`SearchTitlesForm-LabelInputPair-${idx}`}
              name={name}
              value={this.state[name]}
              displayText={displayText}
              onChange={this.handleChange}
            />
          )
        })}

        <input type='submit' value='Scrape' />
      </StyledForm>
    )
  }
}

const mapDispatchToProps = {
  overwriteTitles,
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(SearchTitlesForm));
