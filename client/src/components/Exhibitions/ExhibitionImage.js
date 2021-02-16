import React, { useState } from "react";

const ExhibitionImage = ({ image }) => {
  const [imgClass, setImgClass] = useState(null);
  const [xClass, setXClass] = useState("transparent");

  const handleImgClick = (e) => {
    if (!imgClass) setImgClass("expanded-image");
    if (imgClass) setImgClass(null);
    if (xClass === "transparent") setXClass("image-exit-button-visible");
    if (xClass !== "transparent") setXClass("transparent");
  };

  return (
    <div className={`side-image-frame`} onClick={handleImgClick}>
      <div className={`image-exit-button ${xClass}`}>X</div>
      <img className={`side-image ${imgClass}`} src={image} alt={image} />
    </div>
  );
};

export default ExhibitionImage;
