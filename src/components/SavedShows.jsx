import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import {db} from '../Firebase/Firebase'
import {updateDoc, doc, onSnapshot} from 'firebase/firestore'
import {AiOutlineCloseCircle} from 'react-icons/ai'

function SavedShows() {
  const[movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(()=>{
    onSnapshot(doc(db,'users',`${user?.email}`), (doc)=>{
      setMovies(doc.data().savedShows);      
    })
  },[user?.email])

  const movieRef = doc(db, 'users', `${user?.email}`);
  console.log(movieRef);

  const deleteShow = async (id) => {
    try {
      const result = movies.filter(item => item.id !== id);
      await updateDoc(movieRef, {savedShows: result});
      
    } catch (error) {
      console.log(error);  
    }
  }

  return (
    <div> 
      <h2 className='text-white font-bold md:text-xl p-4'>My Shows</h2>     
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="left-1 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((movie, index) => (
            <div key={index} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500${movie?.img}`}
                alt={movie?.title}
              />
              <div className="absolute w-full h-full left-0 top-0 hover:bg-black/80 opacity-0 hover:opacity-100 text-white duration-300">
                <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full">
                  {movie?.title}
                </p>
                <p onClick={()=>{deleteShow(movie.id)}} className="absolute text-gray-300 top-4 right-4"> <AiOutlineCloseCircle size={25}/> </p>
              </div>              
            </div>
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="right-1 bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden  group-hover:block"
        />
      </div>
    </div>
  );
}

export default SavedShows;
