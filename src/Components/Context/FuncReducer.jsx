export default (state, action) => {
  switch (action.type) {
    case 'RATE_MOVIE':
      return {
        ...state,

        rated: [action.payload, ...state.rated],
      };
    default:
      return state;
  }
};
