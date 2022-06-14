import axios from "axios";

export const getSeries = async (seriesSlug) =>
  axios.get(`${process.env.REACT_APP_API}/series/${seriesSlug}`);
export const getSeriesById = async (seriesId) =>
  axios.get(`${process.env.REACT_APP_API}/series/id/${seriesId}`);
export const getSeriesList = async () =>
  await axios.get(`${process.env.REACT_APP_API}/series/list`);
export const getSeriesListWithThumbnails = async () =>
  await axios.get(`${process.env.REACT_APP_API}/series/list-with-thumbnails`);
export const getPaintingsInSeriesWithThumbnails = async ({
  slug,
  withThumbnails,
}) =>
  axios.get(
    `${process.env.REACT_APP_API}/series/paintings/${slug}${
      withThumbnails ? "/with-thumbnails" : "/without-thumbnails"
    }`
  );
export const fetchOneSeriesPaintingsNames = async (seriesId) =>
  await axios.get(
    `${process.env.REACT_APP_API}/series/list-paintings/${seriesId}`
  );

export const addSeries = async (series, authToken) =>
  await axios.post(`${process.env.REACT_APP_API}/series`, series, {
    headers: {
      authToken,
    },
  });

export const editSeries = async (seriesId, newSeriesName, authToken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/series`,
    { seriesId, newSeriesName },
    {
      headers: {
        authToken,
      },
    }
  );

export const removeSeries = async (seriesName, authToken) =>
  await axios.delete(`${process.env.REACT_APP_API}/series`, {
    headers: {
      authToken,
    },
    data: {
      seriesName,
    },
  });
