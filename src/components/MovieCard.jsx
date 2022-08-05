import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import {UserAuth} from '../context/AuthContext'
import {db} from '../Firebase/Firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

function MovieCard({ movie }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const {user} = UserAuth();

  const movieId = doc(db, 'users', `${user?.email}`)

  const saveMovie = async () => {
    if(user?.email){
      setLike(!like);
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path
        })
    })
    }else{
      alert('Please login to save your favorite shows')
    }
  }

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
        alt={movie?.title}
      />
      <div className="absolute w-full h-full left-0 top-0 hover:bg-black/80 opacity-0 hover:opacity-100 text-white duration-300">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full">
          {movie?.title}
        </p>
        <p onClick={saveMovie} className="absolute top-4 left-4 text-gray-300">
          {/* {like ? <FaHeart /> : <FaRegHeart />} */}
          {user?.email ? like ? <FaHeart /> : <FaRegHeart /> : <FaRegHeart />}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
