import React, { createContext, useEffect, useReducer, useState } from 'react';

import FuncReducer from './FuncReducer';

const initialState = {
  rated: localStorage.getItem('rated') ? JSON.parse(localStorage.getItem('rated')) : [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(FuncReducer, initialState);
  const [genre, setGenre] = useState([]);

  const getGenres = (el) => {
    let result = [];
    for (let value of genre) {
      for (let element of el.genre_ids) {
        if (value.id === element) {
          result.push(value.name);
        }
      }
    }
    return result;
  };

  useEffect(() => {
    localStorage.setItem('rated', JSON.stringify(state.rated));
  }, [state.rated]);

  const rateMovie = (movie) => {
    dispatch({ type: 'RATE_MOVIE', payload: movie });
  };

  return (
    <GlobalContext.Provider value={{ rated: state.rated, rateMovie, genre, setGenre, getGenres }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
