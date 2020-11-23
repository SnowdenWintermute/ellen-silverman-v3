import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as storyActions from "../../store/actions/story-actions";
import { texts } from "./consts";
import Credits from "./Credits";

const BunStoryText = (props) => {
  const dispatch = useDispatch();
  const [numScrolls, setNumScrolls] = useState(0);
  const [textElements, setTextElements] = useState([]);
  const [textBlocksShowing, setTextBlocksShowing] = useState();
  const [textShowClasses, setTextShowClasses] = useState({});
  const [creditsShowing, setCreditsShowing] = useState(false);

  const textRefs = useRef([]);
  const textContainerRef = useRef();
  const creditsRef = useRef();

  // send textRefs to store
  useEffect(() => {
    dispatch(storyActions.setTextRefs(textRefs));
    dispatch(storyActions.setTextContainerRef(textContainerRef));
  }, [dispatch]);

  //
  const calculateShowClasses = useCallback(() => {
    const newShowClasses = {};
    let counter = 1;
    for (let val in textBlocksShowing) {
      if (!textBlocksShowing[val])
        newShowClasses[val] = `transparent text-${counter}-class-1`;
      if (textBlocksShowing[val]) newShowClasses[val] = `text-show`;
      counter++;
    }
    setTextShowClasses(newShowClasses);
  }, [textBlocksShowing]);

  // determine text blocks showing based on if a block's top is within top 1/3 of screen height
  useEffect(() => {
    if (!textRefs.current) return;
    const newTextBlocksShowing = [];
    for (let ref in textRefs.current) {
      newTextBlocksShowing[ref] =
        textRefs.current[ref].getBoundingClientRect().top <
        window.innerHeight / 3;
    }
    setTextBlocksShowing(newTextBlocksShowing);
  }, [numScrolls, textRefs]);

  // scroll
  const handleScroll = useCallback(
    (e) => {
      if (!textBlocksShowing) return;
      setNumScrolls(numScrolls + 1);
      calculateShowClasses();

      if (creditsRef.current) {
        if (
          creditsRef.current.getBoundingClientRect().top <
          window.innerHeight / 3
        ) {
          setCreditsShowing(true);
        } else {
          setCreditsShowing(false);
        }
      }
    },
    [textBlocksShowing, calculateShowClasses, numScrolls]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function cleanup() {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    calculateShowClasses();
  }, [calculateShowClasses, numScrolls]);

  const createTextElements = useCallback(() => {
    let elementsArray = [];
    let counter = 1;
    for (let textEntry in texts) {
      elementsArray.push(
        <div
          className={`bun-story-text transition-1-sec text-${counter} ${
            textShowClasses[textEntry]
              ? textShowClasses[textEntry]
              : "transparent"
          }`}
          ref={(el) => (textRefs.current[textEntry] = el)}
          key={textEntry}
        >
          {texts[textEntry]}
          <div className="bun-text-index">{counter}</div>
        </div>
      );
      counter++;
    }
    return elementsArray;
  }, [textShowClasses]);

  useEffect(() => {
    const newTextElements = createTextElements();
    setTextElements(newTextElements);
  }, [createTextElements]);

  return (
    <div className="bun-story-text-container" ref={textContainerRef}>
      <div className="story-title">~ The Professor ~</div>
      {textElements}
      {
        <div className={`story-credits-container`} ref={creditsRef}>
          <Credits creditsShowing={creditsShowing} />
        </div>
      }
    </div>
  );
};

export default BunStoryText;
