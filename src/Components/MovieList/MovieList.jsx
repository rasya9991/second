import React from 'react'
import './MovieList.css'
const MovieList = (props) => {
  return (
    <div className={'movie-list'} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
      {props.children}
    </div>
  )
}

export default MovieList
