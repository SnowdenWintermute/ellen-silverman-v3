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
      if (params.category && params.painting) {
        pageState = "detailPage";
      } else if (params.category) {
        pageState = "categoryPage";
      }
    }

    switch (pageState) {
      case "":
        page = <SeriesList></SeriesList>;
        break;
      case "categoryPage":
        page = <SeriesPage props={params} category={params.category}></SeriesPage>;
        break;
      case "detailPage":
        page = (
          <PaintingDetailedPage
            category={params.category}
            paintingName={params.painting}
          ></PaintingDetailedPage>
        );
        break;
      default:
    }

    return <React.Fragment>{page}</React.Fragment>;
  }
}
