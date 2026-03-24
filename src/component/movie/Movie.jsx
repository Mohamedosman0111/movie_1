import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieView from '../movieView/MovieView';

export default function Movie() {

  const [movie, setMovie]= useState([]);
  const [tv, setTv]= useState([]);

  async function movieData(type, fun){
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/week?api_key=9ff5a618ac62be52b604b250d2cb4394`)
    fun(data.results)
  }

  useEffect(()=> {
    movieData("movie", setMovie);
    movieData("tv", setTv);
  },[])

  return (
    <div className='mb-3'>
      <div className='my-3'>
        <h1>Choose Your Fav Movie</h1>
      </div>

        <div id="carouselExampleIndicators" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button rounded-circle" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <div className='row mt-3'>
              {movie.map((mov, index) => <MovieView mov={mov} key={index} />)}
            </div>
          </div>
          <div class="carousel-item">
            <div className='row mt-3'>
              {tv.map((mov, index) => <MovieView mov={mov} key={index} />)}
            </div>
          </div>
          <div class="carousel-item">
            <div className='row mt-3'>
              {movie.map((mov, index) => <MovieView mov={mov} key={index} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
