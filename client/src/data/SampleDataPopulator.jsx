import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as thunks from './sampleThunks';
import * as actions from '../redux/actions/index';

/**
 * @summary Populates redux store when included in any render method.
 *    - comment in/out whatever needs populating
*     - don't forget to import too
 * 
 * Usage: <SampleDataPopulator seconds={3} />
 */
class SampleDataPopulator extends PureComponent {
  componentDidMount() {
    const {
      seconds = 3,
      populateSampleTitleData,
      populateSampleLocationData,
    } = this.props;
    
    populateSampleTitleData(seconds);
    populateSampleLocationData(seconds);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  ...thunks,
  ...actions,
}

export default connect(null, mapDispatchToProps)(SampleDataPopulator);
