import React, { useContext } from 'react';

import Movie from '../Movie/Movie';
import MovieList from '../MovieList/MovieList';
import { GlobalContext } from '../Context/GlobalContext';

const PageRated = () => {
  const { rated } = useContext(GlobalContext);
  return (
    <div>
      <MovieList>
        {rated.map((el) => {
          if (el.rating > 0 && el.rating !== undefined) {
            return (
              <Movie
                key={el.original_title}
                description={el.overview}
                title={el.original_title}
                poster={el.poster_path}
                releaseDate={el.release_date}
                movie={el}
              />
            );
          }
        })}
      </MovieList>
    </div>
  );
};

export default PageRated;
