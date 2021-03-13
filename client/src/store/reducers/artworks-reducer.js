import {
  UPDATE_CACHED_SERIES,
  UPDATE_CACHED_PAINTINGS,
} from "../actions/artworks-actions";

let initialState = {
  cachedSeries: [],
  cachedPaintingsBySeries: {},
};

const artworks = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CACHED_SERIES:
      return { ...state, cachedSeries: [...action.payload] };
    case UPDATE_CACHED_PAINTINGS:
      return {
        ...state,
        cachedPaintingsBySeries: {
          ...state.cachedPaintingsBySeries,
          [action.payload.seriesName]: [...action.payload.paintings],
        },
      };
    default:
      return state;
  }
};
export default artworks;
