import { Card, Tag, Rate } from 'antd';
import './Movie.css';
import { format } from 'date-fns';
import { useContext } from 'react';

import { GlobalContext } from '../Context/GlobalContext';

const Movie = (props) => {
  const { rateMovie, rated } = useContext(GlobalContext);
  const POSTERSLINK = 'https://image.tmdb.org/t/p/original';
  const { description, title, poster, genres, releaseDate, movie, voteAverage } = props;
  const text = description.length > 0 ? description.split(' ').slice(0, 40).join(' ') + '...' : 'no description';
  const ratedMovie = rated.find((o) => o.id === movie.id);
  const disabledMovie = ratedMovie ? true : false;
  let movieGenre;
  if (genres) {
    movieGenre = genres.map((el) => {
      return <Tag key={el}>{el}</Tag>;
    });
  } else {
    ('no genre');
  }
  let cyrcleColor;

  if (voteAverage >= 7) {
    cyrcleColor = '#66E900';
  } else if (voteAverage >= 5) {
    cyrcleColor = '#E97E00';
  } else if (voteAverage >= 3) {
    cyrcleColor = '#E9D100';
  } else if (voteAverage >= 0) {
    cyrcleColor = '#66E900';
  }

  const finalDate = releaseDate.length > 0 ? format(new Date(releaseDate), 'MMMM dd, yyyy') : 'no date';
  return (
    <Card
      hoverable
      style={{
        width: '550px',
        display: 'flex',
      }}
      cover={
        <img
          alt="example"
          src={poster == null ? POSTERSLINK + '/kEcCb8PfA4GN7n10B419pXal7Hc.jpg' : POSTERSLINK + poster}
          style={{ height: 'auto', width: '250px' }}
          className={'date'}
        />
      }
    >
      <div style={{ display: 'flex' }}>
        <h4 className={'title'}>{title === undefined || null ? 'title' : title}</h4>
        <div className="rating" style={{ boxShadow: `0 0 0 5px ${cyrcleColor}` }}>
          {voteAverage ? voteAverage : 0}
        </div>
      </div>

      <div className="rate">
        <Rate
          count={10}
          onChange={(value) => {
            movie.rating = value;
            rateMovie(movie)
          }}
          value={disabledMovie ? rated.find((o) => o.id === movie.id).rating : 0}
        ></Rate>
      </div>
      <span className={'movie-date'}>{finalDate === undefined || null ? ' final date' : finalDate}</span>
      <div className={'tags'}>{movieGenre}</div>
      <div className={'card__description'}>
        <span>{text}</span>
      </div>
    </Card>
  );
};
export default Movie;
