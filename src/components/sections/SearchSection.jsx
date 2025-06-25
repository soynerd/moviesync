import React from "react";
import { Card } from "../";
import {Link} from 'react-router-dom'

function SearchSection({ cardData, name = null }) {
  console.log(cardData);
  console.log(cardData[0]?.show);

  function countSeasons(data) {
    var count = 0;
    data.map((season) => {
      if (season.title.includes("Season")) count++;
    });
    return count;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-5">
        <div className="max-w-3/4 mx-auto px-1">
          <h2 className="text-xl font-bold text-gray-800 ">{name}</h2>
          <div className="flex overflow-x-scroll px-1">
            {cardData.map((mediaData) => {
              if (mediaData.type == "movie") {
                return mediaData?.urls?.moviePoster ? (
                  <Link to={`/movies/${mediaData?.movie?.ids?.imdb || mediaData?.movie?.ids?.tmdb}`} key={mediaData?.movie?.ids?.imdb || mediaData?.movie?.ids?.tmdb} state={{movieData : mediaData}} >
                    <Card
                      key={
                        mediaData?.ids?.imdb || mediaData?.ids?.tmdb
                      }
                      name={mediaData.title}
                      image={mediaData?.urls?.moviePoster[0]?.url}
                      media={{type: "movie", section: "search"}}
                    />
                  </Link>
                ) : null;
              }
              if (mediaData.media == "show") {
                return (
                  <Link to={`/tvShows/${mediaData.id}`} key={mediaData.id} state={{showData : mediaData}} >
                    <Card
                      key={mediaData.id}
                      name={mediaData.name}
                      image={mediaData.image.medium}
                      genre={mediaData.genre}
                      seasons={countSeasons(mediaData.seasonDetails)}
                      time={mediaData.averageRuntime}
                      rating={mediaData.rating.average}
                      media={{type: "tvshow", section: "search"}}
                    />
                  </Link>
                );
              }
              if (mediaData.type === "ANIME") {
                console.log({animeData : mediaData});
                //const animeData = mediaData;
                return (
                  
                  <Link to={`/anime/${mediaData.id}`} key={mediaData.id} state={{animeData : mediaData}} >
                    <Card
                      key={mediaData.id}
                      name={
                        mediaData.title.english != null
                          ? mediaData.title.english
                          : mediaData.title.romaji
                      }
                      image={mediaData.coverImage.large}
                      time={mediaData.duration}
                      rating={mediaData.averageScore / 10}
                      genre={mediaData.genres}
                      media={{type: "anime", section: "search"}}
                    />
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchSection;
