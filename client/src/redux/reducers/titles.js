import * as T from '../actions/actionTypes';
import { sampleReducerTitles } from '../../pages/SearchTitles/SearchTitlesForm/sampleForm.data';

const initialState = {
  titleStrings: [],
  // titleStrings: sampleReducerTitles, // for testing
};

export default (state = initialState, action) => {
  switch (action.type) {
    case T.ADD_TITLES: {
      const { titles } = action.payload;

      return {
        ...state,
        titleStrings: state.titles.concat(titles),
      };
    }

    case T.OVERWRITE_TITLES: {
      const { titles } = action.payload;

      return {
        ...state,
        titleStrings: titles,
      };
    }

    default:
      return state;
  }
}
