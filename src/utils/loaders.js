import { getMediaDetails, getImageUrls, getShowsData, getShowSeasonsDetails } from "./";

export async function mediaDataLoader(media, type) {
  const res = await getMediaDetails(media, type);
  
  return getImageUrls(res);
}

export async function showsDataLoade(media, type) {
  const showsData = [];
  const res = await getMediaDetails(media, type);

  await res.map(async (show) => {
    try {
      if (
        show?.show?.ids?.imdb ||
        show?.ids?.imdb ||
        show?.ids?.tmdb ||
        show?.ids?.tvdb
      ) {
        const res = await getShowsData(show?.show?.ids || show?.ids);
        const seasonDetails = await getShowSeasonsDetails(show?.show?.ids.imdb || show?.ids.imdb)
        res.seasonDetails =  seasonDetails
        
        showsData.push(res);
      }
    } catch (error) {
      console.log("Loader :: showsLoader :: error", error);
    }
  });
  return showsData;
}

export async function showsDataLoader(media, type) {
  const showsData = [];
  const res = await getMediaDetails(media, type);

  for (const show of res) {
    try {
      if (
        show?.show?.ids?.imdb ||
        show?.ids?.imdb ||
        show?.ids?.tmdb ||
        show?.ids?.tvdb
      ) {
        const details = await getShowsData(show?.show?.ids || show?.ids);
        const seasonDetails = await getShowSeasonsDetails(
          show?.show?.ids?.imdb || show?.ids?.imdb
        );

        details.seasonDetails = seasonDetails;
        showsData.push(details);
      }
    } catch (error) {
      console.log("Loader :: showsLoader :: error", error);
    }
  }
  return showsData;
}
