import React, { createContext, useEffect, useReducer } from 'react';

import FuncReducer from './FuncReducer';

const initialState = {
  rated: localStorage.getItem('rated') ? JSON.parse(localStorage.getItem('rated')) : [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(FuncReducer, initialState);

  useEffect(() => {
    localStorage.setItem('rated', JSON.stringify(state.rated));
  }, [state.rated]);
  // const AddMovieToRated = (movie,rating) => {
  //   dispatch({ type: 'RATE_MOVIE', payload: movie });
  // };

  const rateMovie = (movie) => {
    dispatch({ type: 'RATE_MOVIE', payload: movie });
  };

  return <GlobalContext.Provider value={{ rated: state.rated, rateMovie }}>{props.children}</GlobalContext.Provider>;
};
