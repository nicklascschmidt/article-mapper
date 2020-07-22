import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import styled from 'styled-components';

import sampleData from './sampleForm.data';
import formElementsData from './Form.data';
import LabelInputPair from '../../../common/LabelInputPair/LabelInputPair.jsx';

const StyledForm = styled.form`
  padding: 1rem;
  input, select {
    display: block;
    margin-bottom: 1rem;
  }
`;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preset: 0,
      url: '',
      firstTitleText: '',
      elType: 'h2',
      numOfTitles: '',
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

    const { url, firstTitleText, elType, numOfTitles } = this.state;

    const encodedUrl = encodeURIComponent(url);

    // await fetch(`/scrape/${encodedUrl}`)
    // .then(resp => resp.json())
    // .then(resp => resp.text())

    await axios.get(`/scrape/${encodedUrl}/${firstTitleText}/${elType}/${numOfTitles}`)
      .then(resp => {
        console.log('resp.data', resp.data);
        return null;
      })
      .catch(err => console.log(err));
  }

  render() {
    const { preset } = this.state;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <label htmlFor="inputPreset">Preset:</label>
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

        {formElementsData.map((item) => {
          const { name, displayText } = item;
          return (
            <LabelInputPair
              name={name}
              value={this.state[name]}
              displayText={displayText}
              onChange={this.handleChange}
            />
          )
        })}

        <input type="submit" value="Scrape" />
      </StyledForm>
    )
  }
}

export default Form;
