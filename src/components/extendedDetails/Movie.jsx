import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { Star, PlayCircle } from "lucide-react";


function MovieDetails() {
  const location = useLocation();
  const {movieData} = location.state || {title : "No Data Available", tagline: "Problem with data/API"};

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 text-gray-900 py-10 px-5 flex justify-center">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg max-h-fit">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Movie Poster */}
          <img
            src={movieData.urls.moviePoster[0].url}
            alt={movieData.title}
            className="rounded-lg w-full h-auto md:h-96 object-cover"
          />
          
          {/* Movie Details */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{movieData.title} ({movieData.year})</h1>
              <p className="text-gray-600 mt-2">{movieData.tagline}</p>
              <p className="text-gray-500 text-sm mt-2">Released: {movieData.released}</p>
              <p className="text-gray-500 text-sm">Runtime: {movieData.runtime} min</p>
              <p className="mt-4 text-gray-700">{movieData.overview}</p>
            </div>

            {/* Ratings & Genre */}
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center bg-gray-200 px-3 py-1 rounded-lg">
                <Star className="text-yellow-500" size={18} />
                <span className="ml-1 text-gray-800">{movieData.rating.toFixed(1)} / 10</span>
              </div>
              <div className="bg-gray-200 px-3 py-1 rounded-lg text-sm text-gray-800">
                {movieData.genres.join(" | ")}
              </div>
            </div>

            {/* Trailer Button */}
            <a
              href={movieData.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700 transition"
            >
              <PlayCircle className="mr-2" size={20} /> Watch Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default MovieDetails;


