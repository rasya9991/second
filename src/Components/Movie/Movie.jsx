import { Card, Tag } from 'antd'
import './Movie.css'
import { format } from 'date-fns'
const Movie = (props) => {
  const POSTERSLINK = 'https://image.tmdb.org/t/p/original'
  const { description, title, poster, genres, releaseDate } = props
  const text = description.split(' ').slice(0, 40).join(' ') + '...'
  const movieGenre = genres.map((el) => {
    return <Tag key={el.id}>{el}</Tag>
  })
  const finalDate = format(new Date(releaseDate), 'MMMM dd, yyyy')
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
          src={poster == null ? <div></div> : POSTERSLINK + poster}
          style={{ height: 'auto', width: '250px' }}
          className={'date'}
        />
      }
    >
      <h4 className={'title'}>{title}</h4>
      <span className={'movie-date'}>{finalDate}</span>
      <div className={'tags'}>{movieGenre}</div>
      <div className={'card__description'}>
        <span>{text}</span>
      </div>
    </Card>
  )
}
export default Movie
