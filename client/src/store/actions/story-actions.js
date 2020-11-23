export const SET_TEXT_REFS = "SET_TEXT_REFS";
export const SET_TEXT_CONTAINER_REF = "SET_TEXT_CONTAINER_REF";

export const setTextRefs = (textRefs) => {
  return {
    type: SET_TEXT_REFS,
    textRefs,
  };
};
export const setTextContainerRef = (textContainerRef) => {
  return {
    type: SET_TEXT_CONTAINER_REF,
    textContainerRef,
  };
};
