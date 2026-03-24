import React from 'react'

export default function MovieView({mov,index}) {
  return (
      <div key={index} className="col-2">
        <div className='position-relative'>
          {mov.poster_path ? <img className='w-100 mb-1' src={`https://image.tmdb.org/t/p/w500` + mov.poster_path} alt='img'/> :""}
          {mov.profile_path ? <img className='w-100 mb-1' src={`https://image.tmdb.org/t/p/w500` + mov.profile_path} alt='img'/> :""}
          <div className="position-absolute top-0 end-0 bg-info">{mov.vote_average}</div>
        </div>
        <p className='mb-3'>{mov.title} {mov.name}</p>
      </div>
  )
}
