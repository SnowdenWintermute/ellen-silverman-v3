import {
  UPDATE_CACHED_SERIES,
  UPDATE_CACHED_PAINTINGS,
} from "../actions/artworks-actions";

let initialState = {
  cachedSeriesListWithThumbnails: [],
  cachedPaintingsBySeries: {},
};

const artworks = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CACHED_SERIES:
      return { ...state, cachedSeriesListWithThumbnails: [...action.payload] };
    case UPDATE_CACHED_PAINTINGS:
      let updatedPaintings = [];
      const updatedPaintingsObject = {};

      if (state.cachedPaintingsBySeries[action.payload.seriesName]) {
        state.cachedPaintingsBySeries[action.payload.seriesName].forEach(
          (painting) => {
            updatedPaintingsObject[painting.title] = painting;
          }
        );
        action.payload.paintings.forEach((painting) => {
          Object.keys(painting).forEach((key) => {
            updatedPaintingsObject[painting.title][key] = painting[key];
          });
        });
        Object.keys(updatedPaintingsObject).forEach((key) =>
          updatedPaintings.push(updatedPaintingsObject[key])
        );
      } else updatedPaintings = [...action.payload.paintings];
      return {
        ...state,
        cachedPaintingsBySeries: {
          ...state.cachedPaintingsBySeries,
          [action.payload.seriesName]: updatedPaintings,
        },
      };
    default:
      return state;
  }
};
export default artworks;
