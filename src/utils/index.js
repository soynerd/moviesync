import getImageUrls from "./getImageUrls"; // gets data from fanart api
import getMediaDetails from "./getMediaDetails"; // gets data from tract api
import getShowsData from "./getShowsData"; // gets data from tvmaze api -> for each shows
import { getShowSeasonsDetails } from "./getShowSeasonsDetails"; // gets data from tract api ( full season details )
import getTrendingAnime from "./anime/getTrendingAnime";
import getPopularAnime from "./anime/getPopularAnime";
import getAnimeDetails from "./anime/getAnimeDetails";
import getSearchedAnimeData from "./anime/getSearchedAnimeData";
import { mediaDataLoader, showsDataLoader } from "./loaders";

export {
  getImageUrls,
  getMediaDetails,
  getShowsData,
  mediaDataLoader,
  showsDataLoader,
  getShowSeasonsDetails,
  getTrendingAnime,
  getPopularAnime,
  getAnimeDetails,
  getSearchedAnimeData
};
