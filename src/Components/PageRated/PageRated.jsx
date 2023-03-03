import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from 'antd';

import Movie from '../Movie/Movie';
import MovieList from '../MovieList/MovieList';
import { GlobalContext } from '../Context/GlobalContext';

const PageRated = () => {
  const { rated } = useContext(GlobalContext);
  const [pageNow, setPageNow] = useState(1);
  const [renderPage, setPage] = useState(rated.slice(0, 20));
  const { getGenres } = useContext(GlobalContext);
  const nextPage = (value) => {
    const end = value * 2 * 10;
    const pages = rated.slice(end - 20, end);
    setPage(pages);
  };
  useEffect(() => {
    nextPage(pageNow);
  }, [rated, pageNow])
  return (
    <div>
      <MovieList>
        {renderPage.map((el) => {
          const genres = getGenres(el);
          if (el.rating > 0 && el.rating !== undefined) {
            return (
              <Movie
                voteAverage={el.vote_average}
                key={el.original_title}
                description={el.overview}
                title={el.original_title}
                poster={el.poster_path}
                genres={genres}
                releaseDate={el.release_date}
                movie={el}
              />
            );
          }
        })}
      </MovieList>
      <Pagination
        defaultCurrent={1}
        total={Math.ceil((rated.length / 20) * 10)}
        onChange={(page) => {
          setPageNow(page);
        }}
      />
    </div>
  );
};

export default PageRated;
