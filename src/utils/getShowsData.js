//  check for the tvdb api -> no rate limit

const getShowsData = async (id) => {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/lookup/shows?${
        id.imdb ? `imdb=${id.imdb}` : id.tvdb ? `thetvdb=${id.thetvdb}` : ""
      }`
    );

    return (!response.ok) ? null : await response.json();
  } catch (error) {
    console.log("Show API Call :: getShowData :: error", error);
  }
};

export default getShowsData;
