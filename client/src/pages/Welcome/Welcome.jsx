import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Card from '../../common/Card/Card.jsx';
import {
  getWelcomeMessage,
  getCustomMessage,
  updateFarthestStep,
} from '../../utils/farthestStep/farthestStep.jsx';
import Button from '../../common/Button/Button.jsx';

/**
 * TODO:
 * Add option to select a previous search from a dropdown
 * (might be better to impl a DB for this)
 */

const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;
`;

const link = (
  <a
    href='https://www.planetware.com/california/things-to-do-in-yosemite-national-park-us-ca-278.htm'
    target='_blank'
  >
    this listicle
  </a>
);
const descriptionText = (
  <>
    <p>
      Article Mapper is a utility web app that allows users to visualize
      locations listed in an article (e.g. {link}). The app scans the article
      (provided by you) and collects location data from each list item, then
      displays those locations in a basic interactive map view.
    </p>
    <p>
      <b>Step 1: </b>Input basic information from your article (e.g. URL, etc.).
    </p>
    <p>
      <b>Step 2: </b>Confirm that the scanned locations are correct and edit/add
      more as needed.
    </p>
    <p>
      <b>Step 3: </b>View the article's locations in the interactive map and
      edit/add locations as needed.
    </p>
    <p>
      <b>Step 4: </b>Click New Search and run it back!
    </p>
  </>
);

class Welcome extends Component {
  componentWillUnmount() {
    updateFarthestStep();
  }

  render() {
    const { history } = this.props;
    const farthestStep = localStorage.getItem('farthestStep');
    const welcomeMessage = getWelcomeMessage(farthestStep);
    const customMessage = getCustomMessage(farthestStep);

    return (
      <Container>
        <Card headerText={welcomeMessage} noDescription>
          {!!customMessage && <i>{customMessage}</i>}
          {descriptionText}
          <StyledButton onClick={() => history.push('/search')}>
            Start a Search!
          </StyledButton>
        </Card>
      </Container>
    );
  }
}

export default withRouter(Welcome);
