import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Credits = ({ creditsShowing }) => {
  const [boxClass, setBoxClass] = useState("transparent-above");
  const [titleClass, setTitleClass] = useState("transparent-above");
  const [textClass1, setTextClass1] = useState("transparent-above");
  const [textClass2, setTextClass2] = useState("transparent-above");
  const [textClass3, setTextClass3] = useState("transparent-above");
  const [textClass4, setTextClass4] = useState("transparent-above");

  useEffect(() => {
    if (creditsShowing) {
      setTimeout(() => {
        setBoxClass("");
        setTitleClass("");
        setTextClass1("");
        setTextClass2("");
        setTextClass3("");
        setTextClass4("");
      }, 1000);
    } else {
      setBoxClass("transparent-above");
      setTitleClass("transparent-above");
      setTextClass1("transparent-above");
      setTextClass2("transparent-above");
      setTextClass3("transparent-above");
      setTextClass4("transparent-above");
    }
  }, [
    setBoxClass,
    setTextClass1,
    setTextClass2,
    setTextClass3,
    setTitleClass,
    creditsShowing,
  ]);

  return (
    <div className={`story-credits ${boxClass}`}>
      <h1 className={`story-credits-title ${titleClass}`}>~ The Professor ~</h1>
      <p className={`story-credits-text credits-text-1 ${textClass1}`}>
        Story by Ben Silverman
      </p>
      <p className={`story-credits-text credits-text-2 ${textClass2}`}>
        Artwork by Ellen Silverman
      </p>
      <p className={`story-credits-text credits-text-3 ${textClass3}`}>
        Web design by Mike Silverman
      </p>
      <div className={`story-credits-text credits-text-4 ${textClass4}`}>
        <Link
          className={"story-credits-text"}
          to={"/artworks/The%20Professor's%20Interiors"}
        >
          Explore more paintings in The Professor's Interiors Series
        </Link>
      </div>
    </div>
  );
};

export default Credits;
