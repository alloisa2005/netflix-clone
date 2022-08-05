import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MovieCard from './MovieCard';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';

function Row({title, fetchurl, rowId}) {
  const [movies, setMovies] = useState([]);  

  useEffect(() => {
    axios.get(fetchurl)
      .then( res => setMovies(res.data.results))
  }, [fetchurl]);
  
  const slideLeft = () =>{
    let slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  const slideRight = () =>{
    let slider = document.getElementById('slider' + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  return (
    <div>
      <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft onClick={slideLeft} size={40} className='left-1 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'/>
        <div id={'slider' + rowId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {
            movies.map( (movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))
          }          
        </div>
        <MdChevronRight onClick={slideRight} size={40} className='right-1 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden  group-hover:block'/>
      </div>
    </div>
  )
}

export default Row