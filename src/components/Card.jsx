import React, { useEffect, useState } from 'react';
import {Rating, Button} from './';

const Card = ({ image="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg",
  name="Luffy the hero ", time= 23, seasons= null, rating=null, genre = ["Action", "Adventure", "Comedy", "Animation"]}) => {
    console.log(name, image, time, seasons, rating, genre);
    //console.log(seasons)
    //console.log(name, seasons);
    // const [totalTime, setTotalTime] = useState(0);
    // useEffect(()=>{
    //   setTotalTime(seasons.reduce((sum, season) => sum + season.episode_count, 0));
    // }, [])
    function trimSentence(sentence) {
      if (!sentence) {
        return "";
      }
    
      const words = sentence.trim().split(/\s+/);
      const trimmedWords = words.slice(0, Math.min(4, words.length)); // Take up to 4 words
    
      return trimmedWords.join(" ");
    }
  return (
    <div className="relative min-w-[150px] w-32 max-w-none  sm:w-44 md:w-56 lg:w-62 bg-white shadow-lg rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:opacity-90 mx-2 my-4 flex-shrink-0">
      {/* Movie Image */}
      <img 
        src={image} 
        alt={name} 
        className="w-full h-auto object-cover mx-auto" 
      />
      
      {/* Movie Title */}
      <div className="p-4">
        <h3 className="text-xs sm:text-lg font-semibold text-gray-800">{trimSentence(name)}</h3>
      </div>
      
      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 hover:opacity-70">
        <p className="text-xs sm:text-sm mb-2"><strong>Runtime </strong> {time} mins</p>
        {seasons ? <p className="text-xs sm:text-sm mb-2"><strong>Seasons</strong> {seasons}</p> : null}
        {rating ? <p className="text-xs sm:text-sm mb-2"><strong>Rating:</strong> {Math.trunc(rating * 100)/100}</p> : null}
        <p className="text-xs sm:text-sm text-center">
          <strong>Genre:</strong> 
          {genre.map((data, index) => (
            <Button 
              key={index} 
              className="bg-green-700 px-2 py-1 mx-1 rounded-3xl text-xs text-sky-50 my-1 font-semibold"
            >
              {data}
            </Button>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Card

