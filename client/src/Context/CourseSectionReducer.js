export const CourseSectionReducer = (state, action) => {
  switch (action.type) {
    case "STORE_COURSE_SECTION":
      console.log(action);
      return {
        ...state,
        sectionInfo: action.sectionInfo,
      };
    default:
      return {
        ...state,
      };
  }
};
