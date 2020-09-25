import React, { Component } from 'react';
import styled from 'styled-components';

import { ArrowUpCircle, ArrowDownCircle } from '@styled-icons/feather';
import { scrollButtonContainerId } from '../../pages/MapView/MapView.jsx';

const iconStyle = `
  color: var(--color-accent);
  stroke-width: 1.5px;
`;

const StyledArrowUpCircle = styled(ArrowUpCircle)`
  ${iconStyle};
`;

const StyledArrowDownCircle = styled(ArrowDownCircle)`
  ${iconStyle};
`;

class ScrollButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isArrowDown: true,
      listenerElement: '',
    };
  }
  
  /**
   * Add an event listener to the content container bc scroll happens on the content, not the window or document.
   * Save the element to the state to reference throughout the class.
  */
  componentDidMount() {
    this.listenerElement = document.getElementById(scrollButtonContainerId);
    this.listenerElement.addEventListener(
      'scroll',
      this.trackScrolling,
      false,
    );
  }

  componentWillUnmount() {
    this.listenerElement.removeEventListener('scroll', this.trackScrolling, false);
  }

  handleScroll = () => {
    const { isArrowDown } = this.state;

    const listenerElementHeight = this.listenerElement.scrollHeight;
    const scrollToY = isArrowDown ? listenerElementHeight : 0;

    this.listenerElement.scrollTo({
      top: scrollToY,
      behavior: 'smooth',
    });
  }

  /** SetTimeout accounts for short lag time for "smooth behavior". Looks glitchy otherwise */
  handleClick = () => {
    this.handleScroll();

    setTimeout(() => {
      this.switchArrow();
    }, 50);
  }

  switchArrow = () => {
    this.setState(prevState => ({ isArrowDown: !prevState.isArrowDown }));
  }

  isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const { scrollToElementId } = this.props;
    const wrappedElement = document.getElementById(scrollToElementId);
    
    this.setState(prevState => {
      if (this.isBottom(wrappedElement) && prevState.isArrowDown) return { isArrowDown: true };
      if (!this.isBottom(wrappedElement) && !prevState.isArrowDown) return { isArrowDown: false };
    });
  }

  render() {
    const { isArrowDown } = this.state;

    const iconProps = {
      className: 'scrollButton',
      size: '2rem',
      onClick: this.handleClick,
    };

    return (isArrowDown
      ? <StyledArrowDownCircle {...iconProps} />
      : <StyledArrowUpCircle {...iconProps} />);
  }
}

export default ScrollButton;