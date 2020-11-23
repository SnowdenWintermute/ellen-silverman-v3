import React, { useState, useEffect } from "react";
import { ReactComponent as DownArrow } from "../../arrow-down-circle.svg";

const ScrollIndicator = ({ showClass }) => {
  const [downArrowClass, setDownArrowClass] = useState("arrow-up");

  const animateArrow = () => {
    setTimeout(() => {
      if (downArrowClass === "arrow-up") setDownArrowClass("arrow-down");
      if (downArrowClass === "arrow-down") setDownArrowClass("arrow-up");
    }, 2000);
  };

  useEffect(() => {
    animateArrow();
  }, [animateArrow]);

  return (
    <div className={`scroll-indicator ${showClass}`}>
      <p>Scroll</p>
      <DownArrow className={`scroll-indicator-down-arrow ${downArrowClass}`} />
    </div>
  );
};

export default ScrollIndicator;
