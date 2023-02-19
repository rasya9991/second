import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Input } from 'antd'

import './style.css'

import Load from './Components/Load/Load'
import Movie from './Components/Movie/Movie'
import MovieList from './Components/MovieList/MovieList'

const MOVIESURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=98afe23e546cecc06bd27931bbacb27e'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [genre, setGenre] = useState([])
  const [query, setQuery] = useState('')
  const getMovies = async (url) => {
    const { results: movies } = await axios.get(url).then((response) => response.data)
    const { genres } = await axios
      .get('https://api.themoviedb.org/3/genre/movie/list?api_key=98afe23e546cecc06bd27931bbacb27e')
      .then((response) => response.data)
    setIsLoading(false)
    setMovies([...movies])
    setGenre([...genres])
    return movies
  }
  const onChange = (e) => {
    e.preventDefault()

    setQuery(e.target.value)

    getMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=98afe23e546cecc06bd27931bbacb27e&language=en-US&query=${e.target.value}&page=1`
    )
  }

  useEffect(() => {
    getMovies(MOVIESURL)
  }, [])

  const getGenres = (el) => {
    let result = []
    for (let value of genre) {
      for (let element of el.genre_ids) {
        if (value.id === element) {
          result.push(value.name)
        }
      }
    }
    return result
  }
  const renderMovies = () => {
    return movies.map((el) => {
      const genres = getGenres(el)
      return (
        <Movie
          key={el.id}
          description={el.overview}
          title={el.original_title}
          poster={el.poster_path}
          genres={genres}
          releaseDate={el.release_date}
        />
      )
    })
  }
  return (
    <div>
      {isLoading ? (
        <Load />
      ) : (
        <div className={'search-input'}>
          <Input placeholder={'search movies'} value={query} onChange={(e) => onChange(e)} />
          <MovieList>{renderMovies()}</MovieList>
        </div>
      )}
    </div>
  )
}

export default App
