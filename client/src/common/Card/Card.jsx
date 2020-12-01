import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  border: 1px solid var(--color-secondary);
  border-radius: .5rem;
  width: 20rem;
  overflow: hidden;
  height: min-content;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.2);

  ${props => props.customStyle};
`;

const HeaderContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--color-secondary);
  font-size: 18px;
  background-color: var(--color-secondary);
  color: var(--color-white);
`;

const DescriptionContainer = styled.div`
  font-size: 12px;
`;

const ContentContainer = styled.div`
  padding: 1rem;
  background-color: var(--color-light-grey);
`;

const Card = (props) => {
  const { headerText, customStyle = '', descriptionText, noDescription = false, children } = props;

  return (
    <Container customStyle={customStyle}>
      <HeaderContainer>
        { headerText }
        {!noDescription && (<>
          <hr />
          <DescriptionContainer>{ descriptionText }</DescriptionContainer>
        </>)}
      </HeaderContainer>
      <ContentContainer>
        { children }
      </ContentContainer>
    </Container>
  );
}

export default Card;
