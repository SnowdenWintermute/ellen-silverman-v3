import React, { Component } from "react";

import Categories from "./Categories";
import ArtworksCategory from "./ArtworksCategory";
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
        page = <Categories></Categories>;
        break;
      case "categoryPage":
        page = <ArtworksCategory category={params.category}></ArtworksCategory>;
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
