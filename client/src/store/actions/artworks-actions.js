export const UPDATE_CACHED_SERIES = "UPDATE_CACHED_SERIES";
export const UPDATE_CACHED_PAINTINGS = "UPDATE_CACHED_PAINTINGS";

export const updateCachedPaintings = (newPaintings) => {
  return {
    type: UPDATE_CACHED_PAINTINGS,
    payload: newPaintings,
  };
};

export const updateCachedSeriesListWithThumbnails = (newSeries) => {
  return {
    type: UPDATE_CACHED_SERIES,
    payload: newSeries,
  };
};
