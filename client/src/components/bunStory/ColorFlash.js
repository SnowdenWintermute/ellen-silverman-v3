import React from "react";

const ColorFlash = ({ showClass, color }) => {
  return (
    <div
      className={`color-flash ${showClass}`}
      style={{ background: color ? color : "white" }}
    ></div>
  );
};

export default ColorFlash;
