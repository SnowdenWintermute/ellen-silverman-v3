import React, { Component } from "react";
import PaintingCategoryCard from "../paintings/PaintingCategoryCard";

import paintingList from "./paintingList";
import getCategoryListWithCoverImages from "../utils/getCategoryListWithCoverImages";

export default class Categories extends Component {
  render() {
    let cards = [];
    const categoryListWithCoverImages = getCategoryListWithCoverImages(
      paintingList.Sheet1
    );
    console.log(categoryListWithCoverImages);
    categoryListWithCoverImages.forEach((item, i) => {
      cards.push(
        <PaintingCategoryCard
          imgSrc={{
            uri: item.coverImg
          }}
          picTitle={item.category}
          linkTo={`/artworks/${item.category}`}
          key={i}
        />
      );
    });
    return <div className="galleryHolder">{cards}</div>;
  }
}
