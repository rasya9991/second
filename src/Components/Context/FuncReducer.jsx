export default (state, action) => {
  switch (action.type) {
    case 'RATE_MOVIE':
      state.rated.forEach((el, i) => {
        if (el.title === action.payload.title && action.payload.rating !== 0) {
          state.rated.splice(i, 1);
        }
        if (el.title === action.payload.title && action.payload.rating === 0) {
          state.rated.splice(i, 1);
        }
      });
      if (action.payload.rating > 0) {
        return {
          ...state,
          rated: [action.payload, ...state.rated],
        };
      } else {
        return {
          ...state,
          rated: [...state.rated],
        };
      }

    default:
      return state;
  }
};
