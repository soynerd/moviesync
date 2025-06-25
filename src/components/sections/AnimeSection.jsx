import React, {useRef} from "react";
import { Card, NavigationButton } from "../";
import { Link } from "react-router-dom";

function AnimeSection({trending, popular, upcoming}) {
  const trendingRef = useRef(null);
  const popularRef = useRef(null);
  const upcomingRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (trending && popular && upcoming) ? (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-5">
      <div className="max-w-3/4 mx-auto px-1">
        <h2 className="text-xl font-bold text-gray-800 ">Trending</h2>
        <div className="relative">
          <NavigationButton refDestination={trendingRef} direction="left" scroll={scroll} />
          <div ref={trendingRef} className="flex overflow-x-scroll px-1">
            {trending.map((animeData)=>(
              <Link to={`/anime/${animeData.id}`} key={animeData.id} state={{animeData}}>
                <Card key={animeData.id} id={animeData.id} name={animeData.title.english != null ? animeData.title.english : animeData.title.romaji} image={animeData.coverImage.large} time={animeData.duration} rating={animeData.averageScore / 10} genre={animeData.genres} media={{type: "anime", section: "trending"}}/>
              </Link>
            ))}
          </div>
          <NavigationButton refDestination={trendingRef} direction="right" scroll={scroll} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mt-8">Popular</h2>
        <div className="realtive">
          <NavigationButton refDestination={popularRef} direction="left" scroll={scroll} />
          <div ref={popularRef} className="flex overflow-x-scroll px-1">
            {popular.map((animeData)=>(
              <Link to={`/anime/${animeData.id}`} key={animeData.id} state={{animeData}}>
                <Card key={animeData.id} id={animeData.id} name={animeData.title.english != null ? animeData.title.english : animeData.title.romaji} image={animeData.coverImage.large} time={animeData.duration} rating={animeData.averageScore / 10} genre={animeData.genres} media={{type: "anime", section: "popular"}}/>
              </Link>
            ))}
          </div>
          <NavigationButton refDestination={popularRef} direction="right" scroll={scroll} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mt-8">Upcoming</h2>
        <div className="realtive">
          <NavigationButton refDestination={upcomingRef} direction="left" scroll={scroll} />
          <div ref={upcomingRef} className="flex overflow-x-scroll px-1">
            {upcoming.map((animeData)=>(
              <Link to={`/anime/${animeData.id}`} key={animeData.id} state={{animeData}}>
                <Card key={animeData.id} id={animeData.id} name={animeData.title.english != null ? animeData.title.english : animeData.title.romaji} image={animeData.coverImage.large} time={animeData.duration} rating={animeData.averageScore / 10} genre={animeData.genres} media={{type: "anime", section: "upcoming"}}/>
              </Link>
            ))}
          </div>
          <NavigationButton refDestination={upcomingRef} direction="right" scroll={scroll} />
        </div>
      </div>
    </div>
  ) : <h1>Loading</h1> ;
}

export default AnimeSection;
// from 127 -> 42