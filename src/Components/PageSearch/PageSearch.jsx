import React, { useState, useEffect } from 'react';
import { Input, Pagination } from 'antd';
import axios from 'axios';
import debounce from 'lodash.debounce';

import Load from '../Load/Load';
import MovieList from '../MovieList/MovieList';
import Movie from '../Movie/Movie';

const MOVIESURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=98afe23e546cecc06bd27931bbacb27e';
const PageSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(5);
  const getMovies = async (url) => {
    const { results: movies, total_pages: pages } = await axios.get(url).then((response) => response.data);

    const { genres } = await axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=98afe23e546cecc06bd27931bbacb27e')
      .then((response) => response.data);
    setIsLoading(false);
    setTotalPages(pages);
    setMovies([...movies]);
    setGenre([...genres]);
    return movies;
  };
  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);

    getMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=98afe23e546cecc06bd27931bbacb27e&language=en-US&query=${e.target.value}&page=1`
    );
  };

  useEffect(async () => {
    await getMovies(MOVIESURL);
    setTotalPages(1);
  }, []);

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
  const renderMovies = () => {
    if (movies.length === 0) {
      return <span>Movies not found!</span>;
    }
    return movies.map((el) => {
      const genres = getGenres(el);
      return (
        <Movie
          key={el.id}
          description={el.overview}
          title={el.original_title}
          poster={el.poster_path}
          genres={genres}
          releaseDate={el.release_date}
          movie={el}
        />
      );
    });
  };
  const updatedOnChange = (e) => onChange(e);
  const debouncedChange = debounce(updatedOnChange, 500);
  return (
    <div>
      {isLoading ? (
        <Load />
      ) : (
        <div className={'search-input'}>
          <Input placeholder={'search movies'} onChange={debouncedChange} />
          <MovieList>{renderMovies()}</MovieList>
        </div>
      )}
      <Pagination
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        defaultCurrent={1}
        total={totalPages * 10}
        onChange={(page) => {
          getMovies(
            `https://api.themoviedb.org/3/search/movie?api_key=98afe23e546cecc06bd27931bbacb27e&language=en-US&query=${query}&page=${page}`
          );
        }}
      />
    </div>
  );
};

export default PageSearch;
