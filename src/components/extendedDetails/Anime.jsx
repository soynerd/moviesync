import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Star } from 'lucide-react';

// function AnimeDetails(){
// const location = useLocation();
//     const {animeData}= location.state || {title : {english :"No Data Available"}, description: "Problem with data/API"};
//     console.log(animeData)
// }
function AnimeDetails() {
    
    const location = useLocation();
    const {animeData}= location.state || {title : {english :"No Data Available"}, description: "Problem with data/API"};
    //console.log(animeData)
    useEffect(() => {
        window.scrollTo({
          top: 10,
          left: 0,
          behavior: 'smooth'
        });
      }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 text-gray-900 py-10 px-5 flex justify-center">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg max-h-fit">
        {/* Banner Image */}
        <img
          src={animeData.bannerImage}
          alt={animeData.title.english}
          className="w-full h-60 object-cover rounded-lg hidden sm:block"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Anime Cover Image */}
          <img
            src={animeData.coverImage.extraLarge}
            alt={animeData.title.english}
            className="rounded-lg w-full h-auto md:h-80 object-cover"
          />
          
          {/* Anime Details */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {animeData.title.english || animeData.title.romaji} ({animeData.startDate.year})
              </h1>
              {/* <p className="text-gray-600 mt-2">{animeData.description.replace(/<br\s*\/?>/g, "\n")}</p> */}
              <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: animeData.description }}></p>
              <p className="text-gray-500 text-sm mt-2">Episodes: {animeData.episodes}</p>
              <p className="text-gray-500 text-sm">Duration: {animeData.duration} min/ep</p>
              <p className="text-gray-500 text-sm">Season: {animeData.season} {animeData.seasonYear}</p>
              <p className="text-gray-500 text-sm">Status: {animeData.status}</p>
            </div>
            
            {/* Ratings & Genre */}
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center bg-gray-200 px-3 py-1 rounded-lg">
                <Star className="text-yellow-500" size={18} />
                <span className="ml-1 text-gray-800">{animeData.averageScore} / 100</span>
              </div>
              <div className="bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-800">
                {animeData.genres.join(" | ")}
              </div>
            </div>
          </div>
        </div>
        
        {/* Studio Information */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Studio</h3>
          <p className="text-gray-600">{animeData.studios.edges[0].node.name}</p>
        </div>
      </div>
    </div>
  );
}

function AnimeDet2ails({ anime }) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 text-gray-900 py-10 px-5 flex justify-center">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
          {/* Banner Image */}
          <img
            src={anime.bannerImage}
            alt={anime.title.english}
            className="w-full h-60 object-cover rounded-lg"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {/* Anime Cover Image */}
            <img
              src={anime.coverImage.extraLarge}
              alt={anime.title.english}
              className="rounded-lg w-full h-auto md:h-80 object-cover"
            />
            
            {/* Anime Details */}
            <div className="col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {anime.title.english} ({anime.startDate.year})
                </h1>
                <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: anime.description }}></p>
                <p className="text-gray-500 text-sm mt-2">Episodes: {anime.episodes}</p>
                <p className="text-gray-500 text-sm">Duration: {anime.duration} min/ep</p>
                <p className="text-gray-500 text-sm">Season: {anime.season} {anime.seasonYear}</p>
                <p className="text-gray-500 text-sm">Status: {anime.status}</p>
              </div>
              
              {/* Ratings & Genre */}
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center bg-gray-200 px-3 py-1 rounded-lg">
                  <Star className="text-yellow-500" size={18} />
                  <span className="ml-1 text-gray-800">{anime.averageScore} / 100</span>
                </div>
                <div className="bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-800">
                  {anime.genres.join(" | ")}
                </div>
              </div>
            </div>
          </div>
          
          {/* Studio Information */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Studio</h3>
            <p className="text-gray-600">{anime.studios.edges[0].node.name}</p>
          </div>
        </div>
      </div>
    );
  }

export default AnimeDetails


