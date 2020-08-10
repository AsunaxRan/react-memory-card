export const LinkInReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        linkedIn: true,
        level: action.level,
        user: action.user
      };
    case "LOG_OUT":
      return {
        ...state,
        linkedIn: false
      };
    default:
      return state;
  }
};