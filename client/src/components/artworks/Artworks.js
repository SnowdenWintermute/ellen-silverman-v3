import React, { Component } from "react";

import SeriesList from "./SeriesList";
import SeriesPage from "./SeriesPage";
import PaintingDetailedPage from "./PaintingDetailedPage";

export default class Artworks extends Component {
  render() {
    let { params } = this.props.match;
    let pageState = "";
    let page;
    if (params) {
      if (params.category && params.paintingSlug) {
        pageState = "detailPage";
      } else if (params.category) {
        pageState = "categoryPage";
      }
    }

    switch (pageState) {
      case "":
        page = <SeriesList />;
        break;
      case "categoryPage":
        page = <SeriesPage props={params} category={params.category} />;
        break;
      case "detailPage":
        page = <PaintingDetailedPage paintingSlug={params.paintingSlug} />;
        break;
      default:
    }

    return <React.Fragment>{page}</React.Fragment>;
  }
}
