import { Card, Tag } from 'antd'
import './Movie.css'
const Movie = (props) => {
  const POSTERSLINK = 'https://image.tmdb.org/t/p/original'
  const { description, title, poster, genres } = props
  const text = description.split(' ').slice(0, 40).join(' ') + '...'
  const movieGenre = genres.map((el) => {
    return <Tag key={el.id}>{el}</Tag>
  })
  return (
    <Card
      hoverable
      style={{
        width: '550px',
        display: 'flex',
      }}
      cover={
        <img alt="example" src={POSTERSLINK + poster} style={{ height: 'auto', width: '250px' }} className={'date'} />
      }
    >
      <h4 className={'title'}>{title}</h4>
      <span className={'movie-date'}>DATE</span>
      <div className={'tags'}>{movieGenre}</div>
      <div className={'card__description'}>
        <span>{text}</span>
      </div>
    </Card>
  )
}
export default Movie
