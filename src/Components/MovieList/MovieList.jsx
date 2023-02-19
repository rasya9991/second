import React from 'react'

const MovieList = (props) => {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>{props.children}</div>
}

export default MovieList
