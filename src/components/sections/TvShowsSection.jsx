import React, { useRef } from "react";
import { Card, NavigationButton } from "../";
import { Link } from "react-router-dom";

function TvShowsSection({ trending, popular }) {
  //console.log(trending);
  //console.log(popular);
  const trendingRef = useRef(null);
  const popularRef = useRef(null);
  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  function countSeasons(data) {
    var count = 0;
    data.map((season) => {
      if (season.title.includes("Season")) count++;
    });
    return count;
  }
  return trending && popular ? (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-5">
      <div className="max-w-3/4 mx-auto px-1">
        <h2 className="text-xl font-bold text-gray-800 ">Trending</h2>
        <div className="relative">
          <NavigationButton refDestination={trendingRef} direction="left" scroll={scroll} />
          <div ref={trendingRef} className="flex overflow-x-scroll px-1">
            {trending.map((showData) => (
              <Link to={`/tvshows/${showData.id}`} key={showData.id} state={{showData}} >
                <Card
                  key={showData.id}
                  name={showData.name}
                  image={showData.image.medium}
                  rating={showData.rating.average}
                  genre={showData.genres}
                  time={showData.averageRuntime}
                  seasons={countSeasons(showData.seasonDetails)}
                />
              </Link>
            ))}
          </div>
          <NavigationButton refDestination={trendingRef} direction="right" scroll={scroll} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mt-8">Popular</h2>
        <div className="relative">
          <NavigationButton refDestination={popularRef} direction="left" scroll={scroll} />
          <div ref={popularRef} className="flex overflow-x-scroll px-1">
            {popular.map((showData) => (
              <Link to={`/tvshows/${showData.id}`} key={showData.id} state={{showData}} >
                <Card
                  key={showData.id}
                  name={showData.name}
                  image={showData.image.medium}
                  rating={showData.rating.average}
                  genre={showData.genres}
                  time={showData.averageRuntime}
                  seasons={countSeasons(showData.seasonDetails)}
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

export default TvShowsSection;
