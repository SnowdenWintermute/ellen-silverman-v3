import React from "react";
import { Link } from "react-router-dom";
import toTitleCase from '../../utils/toTitleCase'
import './locationBar.css'

const LocationBar = ({ match }) => {
  let currentPage, series, paintingName;
  let capitalizedSeries, capitalizedCurrentPage;
  if (match.params) {
    currentPage = match.params.page;
    series = match.params.series;
    paintingName = match.params.painting;
  }
  if (currentPage) capitalizedCurrentPage = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  if (series) capitalizedSeries = toTitleCase(series.split("-").join(" "))
  return (
    <div className="location-bar">
      <span>
        <Link to={`/`}>Lucretia E. McGuff-Silverman</Link>
        {currentPage ? " - " : ""}
        <Link to={`/${currentPage}`}>{capitalizedCurrentPage}</Link>
        {capitalizedSeries ? " - " : ""}
        {capitalizedSeries && (
          <Link to={`/${currentPage}/${series}`}>{capitalizedSeries}</Link>
        )}
        {paintingName && " - "}
        {paintingName && (
          <Link to={`/${currentPage}/${series}/${paintingName}`}>
            {paintingName}
          </Link>
        )}
      </span>
    </div>
  );
};
export default LocationBar;
