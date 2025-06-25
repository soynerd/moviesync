import React, { useRef } from "react";
import { Card, NavigationButton } from "../";
import {Link} from 'react-router-dom';

function MoviesSection({ trending, popular }) {
  const trendingRef = useRef(null);
  const popularRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return trending && popular ? (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-5">
      <div className="max-w-3/4 mx-auto px-1">
        {/* Trending Section */}
        <h2 className="text-xl font-bold text-gray-800">Trending</h2>
        <div className="relative">
          <NavigationButton refDestination={trendingRef} direction="left" scroll={scroll} />
          <div ref={trendingRef} className="flex overflow-x-scroll px-1 scroll-smooth no-scrollbar">
            {trending.map((movieData) =>
              movieData?.urls?.moviePoster ? (
                <Link to={`/movies/${movieData.ids.imdb || movieData.ids.trakt}`} key={movieData.ids.trakt} state={{movieData}}>
                <Card
                  key={movieData.ids.trakt}
                  name={movieData.title}
                  year={movieData.year}
                  time={movieData.runtime}
                  rating={movieData.rating}
                  genre={movieData.genres}
                  image={movieData.urls.moviePoster[0].url}
                  media={{type: "movie", section: "trending"}}
                />
                </Link>
              ) : null
            )}
          </div>
          <NavigationButton refDestination={trendingRef} direction="right" scroll={scroll} />
        </div>

        {/* Popular Section */}
        <h2 className="text-xl font-bold text-gray-800 mt-8">Popular</h2>
        <div className="relative">
          <NavigationButton refDestination={popularRef} direction="left" scroll={scroll} />
          <div ref={popularRef} className="flex overflow-x-scroll px-1 scroll-smooth no-scrollbar">
            {popular.map((movieData) => (
              <Link to={`/movies/${movieData.ids.imdb || movieData.ids.trakt}`} key={movieData.ids.trakt} state={{movieData}}>
              <Card
                key={movieData.ids.trakt}
                name={movieData.title}
                year={movieData.year}
                time={movieData.runtime}
                rating={movieData.rating}
                genre={movieData.genres}
                image={movieData.urls.moviePoster[0].url}
                media={{type: "movie", section: "popular"}}
              />
              </Link>
            ))}
          </div>
          <NavigationButton refDestination={popularRef} direction="right" scroll={scroll} />
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default MoviesSection;
