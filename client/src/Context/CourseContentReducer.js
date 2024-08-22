export const courseContentReducer = (state, action) => {
  switch (action.type) {
    case "STORE_COURSE_CONTENT":
      console.log(action);
      return {
        ...state,
        sectioncontent: action.sectioncontent,
      };
    default:
      return {
        ...state,
      };
  }
};
