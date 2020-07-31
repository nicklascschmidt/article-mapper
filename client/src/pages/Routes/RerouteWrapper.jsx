import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const RerouteWrapper = (props) => {
  const { titles, children } = props;

  if (titles.length === 0) return <Redirect to='/search' />;;
  return children;
}

const mapStateToProps = state => ({
  titles: state.titles.titleStrings,
});

export default connect(mapStateToProps, {})(RerouteWrapper);
