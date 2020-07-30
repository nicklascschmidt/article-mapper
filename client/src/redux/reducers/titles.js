import * as T from '../actions/actionTypes';

const initialState = {
  // titleStrings: [],
  // TODO: testing, revert
  titleStrings: [
    "coit tower",
    "1256 page st sf",
    "streettaco sf",
    // "183 eureka st sf",
    // "aburaya oakland",
    // "san francisco botanical garden",
    
    // "Fort Williams Park",
    // "Crescent Beach State Park",
    // "Goddard Mansion",
    // "Portland Head Lighthouse",
    // "Cape Elizabeth Lighthouse",
    // "Two Lights State Park",
    // "Richmond Island",
    // "Peak’s Island",
    // "Sea Fishing",
    // "Spurwink Church",
    // "Great Pond Trail",
    // "Winnick Woods",
    // "Alewives Brook Farm",
    // "C-Salt Gourmet Market",
    // "Seaglass Restaurant at Inn by the Sea"
  ],
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
