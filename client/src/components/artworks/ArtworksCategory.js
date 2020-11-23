import React, { Component } from "react";
import PaintingCategoryCard from "../paintings/PaintingCategoryCard";

import paintingList from "./paintingList";
import getPaintingsInCategory from "../utils/getPaintingsInCategory";

export default class ArtworksCategory extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    let cards = [];
    const paintingsInCategory = getPaintingsInCategory(
      paintingList.Sheet1,
      this.props.category
    );
    paintingsInCategory.forEach((painting, i) => {
      cards.push(
        <PaintingCategoryCard
          imgSrc={{
            uri: `../img/${painting["Category"]}/thumbs/${painting["Name"]}.jpg`,
          }}
          category={painting["Category"]}
          picTitle={painting["Name"]}
          picSize={painting["Size"]}
          year={painting["Year"]}
          price={painting["Cost unframed"]}
          key={i}
        />
      );
    });
    return (
      <div>
        <div className="galleryHolderHolder">
          <div className="galleryHolder"> {cards}</div>
        </div>
      </div>
    );
  }
}
