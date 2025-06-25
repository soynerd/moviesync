import React from 'react'
import { useLocation } from 'react-router-dom'

function T2vShowsDetails() {
  const location = useLocation();
  const {showData}= location.state || {title : "No Data Available", tagline: "Problem with data/API"};
  console.log(showData);
  return (
    <div>TvShows</div>
  )
}


function TvShowDetails({ show }) {
  
  const location = useLocation();
  const {showData}= location.state || {title : "No Data Available", tagline: "Problem with data/API"};
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 text-gray-900 py-10 px-5 flex justify-center">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
        {/* Banner Image */}
        <img
          src={showData.image.original}
          alt={showData.name}
          className="w-full h-80 object-cover rounded-lg"
        />

        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-800">{showData.name}</h1>
          <p className="text-gray-600 mt-2" dangerouslySetInnerHTML={{ __html: showData.summary }}></p>
          <p className="text-gray-500 text-sm mt-2">Language: {showData.language}</p>
          <p className="text-gray-500 text-sm">Status: {showData.status}</p>
          <p className="text-gray-500 text-sm">Premiered: {showData.premiered}</p>
          <p className="text-gray-500 text-sm">Network: {showData.webChannel?.name || "N/A"}</p>
          <p className="text-gray-500 text-sm">Genres: {showData.genres.join(" | ")}</p>
          <p className="text-gray-500 text-sm">Average Rating: {showData.rating.average} / 10</p>
          <a
            href={showData.officialSite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block mt-2"
          >
            Official Site
          </a>
        </div>

        {/* Season Details */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800">Seasons</h3>
          {showData.seasonDetails.map((season) => (
            <div key={season.number} className="mt-4 bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800">{season.title}</h4>
              <p className="text-gray-600 mt-1">{season.overview}</p>
              <p className="text-gray-500 text-sm">Episodes: {season.episode_count}</p>
              <p className="text-gray-500 text-sm">First Aired: {new Date(season.first_aired).toDateString()}</p>
              <p className="text-gray-500 text-sm">Rating: {season.rating.toFixed(1)} / 10</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default TvShowDetails