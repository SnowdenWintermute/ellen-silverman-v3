import {
  SET_TEXT_REFS,
  SET_TEXT_CONTAINER_REF,
} from "../actions/story-actions";

const initialState = {
  textRefs: {},
  textContainerRef: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TEXT_REFS:
      return {
        ...state,
        textRefs: action.textRefs,
      };
    case SET_TEXT_CONTAINER_REF:
      return {
        ...state,
        textContainerRef: action.textContainerRef,
      };
    default:
      return state;
  }
};
