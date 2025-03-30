const query = `
  query (
    $season: MediaSeason
    $seasonYear: Int
    $nextSeason: MediaSeason
    $nextYear: Int
  ) {
    trending: Page(page: 1, perPage: 10) {
      media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    season: Page(page: 1, perPage: 10) {
      media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    nextSeason: Page(page: 1, perPage: 10) {
      media(season: $nextSeason, seasonYear: $nextYear, sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    popular: Page(page: 1, perPage: 10) {
      media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
    top: Page(page: 1, perPage: 10) {
      media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
        ...media
      }
    }
  }

  fragment media on Media {
    id
    title {
      english
      romaji
    }
    coverImage {
      extraLarge
      large
      color
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    bannerImage
    season
    seasonYear
    description
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    isAdult
    averageScore
    popularity
    mediaListEntry {
      id
      status
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
  }
`;

function getCurrentMonth() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let currentSeason;
  let nextSeason;
  let currentYear=year;
  let nextYear=year;
  if (month === 11 || month === 0 || month === 1) {
    currentSeason = "WINTER";
    nextSeason = "SPRING";
    if(month === 11)
    nextYear = year + 1;    
  } else if (month === 2 || month === 3 || month === 4) {
    currentSeason = "SPRING";
    nextSeason = "SUMMER";
  } else if (month === 5 || month === 6 || month === 7) {
    currentSeason = "SUMMER";
    nextSeason = "FALL";
  } else if (month === 8 || month === 9 || month === 10) {
    currentSeason = "FALL";
    nextSeason = "WINTER";
    nextYear = year + 1;
  }
  return { currentSeason, nextSeason, currentYear, nextYear};
}

// Define the variables
const season = getCurrentMonth();
const variables = {
  nextSeason: season.nextSeason,
  nextYear: season.nextYear,
  season: season.currentSeason,
  seasonYear: season.currentYear,
  type: "ANIME",
};

// Define the request payload
const payload = {
  query: query,
  variables: variables,
};

// Send the request to the AniList API

async function getAnimeDetails() {
  const res = await fetch("https://graphql.anilist.co/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => {
      console.error("Anime :: getAnimeDetails :: Error", error);
    });
  return res;
}

export default getAnimeDetails;