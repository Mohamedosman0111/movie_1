import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieView from '../movieView/MovieView';

export default function Home() {

  const [movie, setMovie]= useState([]);
  const [tv, setTv]= useState([]);
  const [person, setPeople]= useState([]);

  async function MovieType(Type, fun) {
    let { data }= await axios.get(`https://api.themoviedb.org/3/trending/${Type}/week?api_key=9ff5a618ac62be52b604b250d2cb4394`)
    fun(data.results)
  }

  useEffect(() => {
    MovieType("movie",setMovie)
    MovieType("tv",setTv)
    MovieType("person",setPeople)
  },[])

  return (
    <div>
      <div className="row mb-3 mt-3">
        <div className="col-4 d-flex flex-column justify-content-center">
          <div className="brdr w-25 my-2"></div>
          <h2 className='h2'>Trending <br/> Movie <br/> To Watch right Now</h2>
          <div className="brdr w-50 my-2"></div>
          <p>Most Watched Movie By Days</p>
        </div>
        {movie.slice(0,16).map((mov, index) => <MovieView mov= {mov} index= {index} />)}
      </div>

      <div className="row mb-3">
        <div className="col-4 d-flex flex-column justify-content-center">
          <div className="brdr w-25 my-2"></div>
          <h2 className='h2'>Trending tv <br/> To Watch right Now</h2>
          <div className="brdr w-50 my-2"></div>
          <p className='py-1'>Most Watched tv By Days</p>
        </div>
        {tv.slice(0,16).map((mov, index) => <MovieView mov= {mov} index= {index} />)}
      </div>

      <div className="row mb-3">
        <div className="col-4 d-flex flex-column justify-content-center">
          <div className="brdr w-25 my-2"></div>
          <h2 className='h2'>Trending <br/> person <br/> To Watch right Now</h2>
          <div className="brdr w-50 my-2"></div>
          <p className='py-1'>Most Watched person By Days</p>
        </div>
        {person.slice(0,16).map((mov, index) => <MovieView mov= {mov} index= {index} />)}
      </div>
    </div>
  )
}
