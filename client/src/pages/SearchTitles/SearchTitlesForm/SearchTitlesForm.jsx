import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { HelpCircle } from '@styled-icons/feather';
import Tooltip from 'react-tooltip-lite';

import {
  // sampleTitlesResponse,
  sampleFormInputs } from './sampleForm.data';
import formElementsData from './SearchTitlesForm.data';
import LabelInputPair from '../../../common/LabelInputPair/LabelInputPair.jsx';
import Button from '../../../common/Button/Button.jsx';

import { overwriteTitles, overwriteGeneralLocation } from '../../../redux/actions/index';

const StyledForm = styled.form`
  input, select {
    display: block;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const customButtonStyle = `
  background-color: var(--color-tertiary);
`;

const LabelContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;

  .tooltip {
    margin-left: .5rem;
    svg {
      margin-bottom: 4px;
    }
  }
`;

const TooltipImage = styled.img`
  width: 50vw;
`;

const HelpCircleIcon = styled(HelpCircle)`
  stroke-width: 2px;
`;

const ErrorMessage = styled.div`
  color: var(--color-red-remove);
  margin-top: 1rem;
`;

class SearchTitlesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      numOfTitles: '',
      firstTitleText: '',
      generalLocation: '',
      error: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: '',
    });
  }

  /** @summary - populates form fields with one of the 3 samples */
  handlePopulateSample = (e) => {
    const formInputs = sampleFormInputs[Math.floor(Math.random() * 3)];
    this.setState({
      ..._.omit(formInputs, 'name')
    });
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

    const areFieldsComplete = _.every(_.omit(this.state, 'error'), item => item !== '');
    if (!areFieldsComplete) return this.setState({ error: 'Please fill in all fields' });

    overwriteGeneralLocation(generalLocation);

    try {
      const response = await this.getScrapedSiteData();
      if (!response.data) throw new Error('no data in scrape response');

      const titles = _.get(response, 'data.titles', []);

      overwriteTitles(titles);

      history.push('/confirm');
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Encountered an error. Please double-check inputs and try again.' });
    }
  }

  getScrapedSiteData = () => {
    const { url, firstTitleText, numOfTitles } = this.state;
    const params = { url, firstTitleText, numOfTitles };
    return axios.get(`/scrape`, { params });
  }

  render() {
    const { error } = this.state;
    return (
      <>
        <StyledForm onSubmit={this.handleSubmit}>

          {formElementsData.map((item, idx) => {
            const { name, labelText, tooltipImgSrc } = item;
            const labelComponent = !tooltipImgSrc ? labelText : (
              <LabelContainer>
                <div>{ labelText }</div>
                <Tooltip
                  className='tooltip'
                  direction='right'
                  useDefaultStyles
                  arrowSize={5}
                  padding='2px'
                  content={<TooltipImage src={tooltipImgSrc} alt='image not found :(' />}
                >
                  <HelpCircleIcon size=".9rem" />
                </Tooltip>
              </LabelContainer>
            );

            return (
              <LabelInputPair
                key={`SearchTitlesForm-LabelInputPair-${idx}`}
                name={name}
                value={this.state[name]}
                labelComponent={labelComponent}
                onChange={this.handleChange}
              />
            )
          })}

          <ButtonContainer>
            <Button
              type='button'
              onClick={this.handlePopulateSample}
              customStyle={customButtonStyle}
            >
              Populate Sample
            </Button>
            <Button>Go!</Button>
          </ButtonContainer>

        </StyledForm>

        {error && <ErrorMessage>{ error }</ErrorMessage>}
      </>
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
