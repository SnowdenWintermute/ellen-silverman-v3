import React, { useEffect } from "react";
import BunStoryImages from "./BunStoryImages";
import BunStoryText from "./BunStoryText";
import { incrementPageViewCounter } from '../../apiCalls/page'

const BunStory = () => {
  useEffect(() => {
    incrementPageViewCounter("the-professor-story")
  }, [])
  return (
    <div>
      <BunStoryText />
      <BunStoryImages />
    </div>
  );
};

export default BunStory;
