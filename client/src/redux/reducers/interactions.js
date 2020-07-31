import _ from 'lodash';
import * as T from '../actions/actionTypes';

const initialState = {
  activeAction: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.OVERWRITE_INTERACTIONS_FIELD: {
      const { field, value } = action.payload;      
      return {
        ...state,
        [field]: value,
      };
    }

    default:
      return state;
  }
}
