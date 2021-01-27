import React, { useState, useEffect, useCallback, useRef } from "react";
import { ReactComponent as DownArrow } from "../../arrow-down-circle.svg";

const ScrollIndicator = ({ showClass }) => {
  const [downArrowClass, setDownArrowClass] = useState("arrow-up");
  const arrowAnimationTimeoutHolder = useRef(null)

  const animateArrow = useCallback(
    () => {
      arrowAnimationTimeoutHolder.current = setTimeout(() => {
        if (downArrowClass === "arrow-up") setDownArrowClass("arrow-down");
        if (downArrowClass === "arrow-down") setDownArrowClass("arrow-up");
      }, 2000);
    },
    [downArrowClass, setDownArrowClass],
  );

  useEffect(() => {
    animateArrow();
    return () => clearTimeout(arrowAnimationTimeoutHolder.current)
  }, [animateArrow]);

  return (
    <div className={`scroll-indicator ${showClass}`}>
      <p>Scroll</p>
      <DownArrow className={`scroll-indicator-down-arrow ${downArrowClass}`} />
    </div>
  );
};

export default ScrollIndicator;
