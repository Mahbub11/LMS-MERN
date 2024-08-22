export const courseDescriptionReducer = (state, action) => {
  switch (action.type) {
    case "STORE_COURSE_DESCRIPTION":
      return {
        ...state,
        _id: action._id,
        title: action.title,
        category: action.cateory,
        subTitle: action.subtitle,
        description: action.description,
        price: action.price,
        discount: action.discount,
        learningOutcomes: action.learningOutcomes,
        requirnments: action.requirnments,
      };
    default:
      return {
        ...state,
      };
  }
};
