const fetchPopularAnime = async (limit = 15) => {
    const query = `
      query {
        Page(perPage: ${limit}) {
          media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
          episodes
          duration
          averageScore
          genres
          }
        }
      }
    `;
  
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
  
    const data = await response.json();
    return data.data.Page.media;
  };
  
  export default fetchPopularAnime;
  