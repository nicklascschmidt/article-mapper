import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import sampleData, { sampleTitlesResponse } from './sampleForm.data';
import formElementsData from './SearchTitlesForm.data';
import LabelInputPair from '../../../common/LabelInputPair/LabelInputPair.jsx';

import { overwriteTitles, overwriteGeneralLocation } from '../../../redux/actions/index';

const StyledForm = styled.form`
  input, select {
    display: block;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
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
      generalLocation: '',
      elType: 'h2',
    };
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      const { preset } = this.state;
      this.setState({ ..._.omit(sampleData[preset], 'name') });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === 'preset') {
      this.setState({ ..._.omit(sampleData[parseInt(value)], 'name') });
    }
  }

  /**
   * @summary Fetches scraped data from a user-provided URL
   *  - URL is encoded to send to server (else error bc no https etc. passed in URL)
   *  - Update titles reducer, then send user to /confirm page
   *  - also submit the generalLocation input to titles reducer
   */
  handleSubmit = async (e) => {
    e.preventDefault();
    const { history, overwriteTitles, overwriteGeneralLocation } = this.props;
    const { generalLocation } = this.state;
    
    overwriteGeneralLocation(generalLocation);

    try {
      const response = await this.getScrapedSiteData();
      /** Use this when testing the /map page to have static data and avoid making /scrape call */
      // const titles = (process.env.NODE_ENV === 'development'
      //   ? sampleTitlesResponse
      //   : _.get(response, 'data.titles', []));
      const titles = _.get(response, 'data.titles', []);

      overwriteTitles(titles);

      history.push('/confirm');
    } catch (error) {
      console.log(error);
    }
  }

  getScrapedSiteData = () => {
    const { url, firstTitleText, elType, numOfTitles } = this.state;
    const params = { url, firstTitleText, elType, numOfTitles };
    return axios.get(`/scrape`, { params });
  }

  displayPresetDropdown = () => (
    <>
      <label htmlFor='inputPreset'>Preset:</label>
      <select
        id='inputPreset'
        name='preset'
        value={this.state.preset}
        onChange={this.handleChange}
      >
        {sampleData.map((item, idx) => {
          return <option key={`inputPreset-dropdown-option-${idx}`} value={idx}>{item.name}</option>;
        })}
      </select>
    </>
  )

  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        {process.env.NODE_ENV === 'development' && this.displayPresetDropdown()}

        {formElementsData.map((item, idx) => {
          const { name, labelText } = item;
          return (
            <LabelInputPair
              key={`SearchTitlesForm-LabelInputPair-${idx}`}
              name={name}
              value={this.state[name]}
              labelText={labelText}
              onChange={this.handleChange}
            />
          )
        })}

        <input type='submit' value='Go' />
      </StyledForm>
    )
  }
}

const mapDispatchToProps = {
  overwriteTitles,
  overwriteGeneralLocation,
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(SearchTitlesForm));
