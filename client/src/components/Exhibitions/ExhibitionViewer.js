import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExhibitionImage from "./ExhibitionImage";

const ExhibitionViewer = ({
  sideImages,
  title,
  subtitle,
  description,
  link,
}) => {
  const exhibitionImageElms = sideImages.map((sideImage, i) => {
    // setImgClasses([...imgClasses, ``]);
    console.log(i);
    return <ExhibitionImage key={i} image={sideImage} />;
  });

  return (
    <div className={"exhibition-viewer"}>
      {/* <img src={background} className="exhibition-background" /> */}
      <div className={"exhibition-description-frame"}>
        <h1 className="exhibition-title">{title}</h1>
        <p className="exhibition-copy exhibition-subtitle">{subtitle}</p>
        {description && (
          <p className="exhibition-copy exhibition-desc">{description}</p>
        )}
        {link && (
          <Link className="exhibition-copy exhibition-link" to={link.url}>
            {link.title}
          </Link>
        )}
      </div>
      <div className={"exhibition-images-frame"}>{exhibitionImageElms}</div>
    </div>
  );
};

export default ExhibitionViewer;
