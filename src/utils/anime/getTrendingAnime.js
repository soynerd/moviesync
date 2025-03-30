const fetchTrendingAnime = async (limit = 15) => {
    const query = `
     query {
  Page(perPage: 18) {
    media(type: ANIME, season: SPRING, seasonYear: 2025, sort: POPULARITY_DESC) {
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
    return data.data.Page.media
    
  };

  export default fetchTrendingAnime;
  


//   query {
//     Page {
//      media(id_in: [16498, 101922, 1535, 113415], type: ANIME) {
//      id
//      title {
//        romaji
//        english
//      }
//      relations {
//        edges {
//          node {
//            id
//            title {
//              romaji
//              english
//            }
//            episodes
//            type
//          }
//          relationType
//        }
//      }
//    }
//  }
//  }
 