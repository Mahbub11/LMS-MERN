import React, { useReducer, createContext } from "react";
import { courseDescriptionReducer } from "./CourseDescriptionReducer";
import { courseContentReducer } from "./CourseContentReducer";
import { CourseSectionReducer } from "./CourseSectionReducer";

export const GlobalContext = createContext([]);

const initialState = {
  courseContentReducer: {
    sectiontitle: null,
    sectioncontent: [],
  },
  courseDescriptionReducer: {},
  CourseSectionReducer: {
    sectionInfo: [],
  },
};

// this needs to clafrify more
const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    // use for..in loop, if you prefer it
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );
const rootReducer = combineReducers({
  courseDescriptionReducer,
  courseContentReducer,
  CourseSectionReducer,
});

export const GlobalContextProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {props.children}
    </GlobalContext.Provider>
  );
};
