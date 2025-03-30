import auth from "../config/config";

const getMediaDetails = async (media, type, searchData, limit = 15, page = 1) => {
    if (searchData) {
        var string_ = "";
        searchData.search ? (string_ += searchData.search.replace(" ", "%20")) : null;
        searchData.genre ? (string_ += `&genre=${searchData.genre}`) : null;
        searchData.language ? (string_ += `&language=${searchData.language}`) : null;
        searchData.country ? (string_ += `country=${searchData.country}`) : null;
        searchData.search && searchData.year ? (string_ = +`%20${searchData.year}`) : searchData.year ? (string_ = +`${searchData.year}`) : null;
        try {
            
            const response = await fetch(
                `https://api.trakt.tv/search/${media}?query=${string_}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "trakt-api-version": "2",
                        "trakt-api-key": auth.trakt.clientId,
                    },
                }
            ).then((data) => data.json());
            // if(searchData.year){
            //     response.filter((movieData => (movieData.movie.year === searchData.year)));
            // }
            
            // response.filter((movieData)=>(movieData.movie.year >= 1980));
            // console.log(response);
            
            return response
            
        } catch (error) {
            
        }
    } else {
        try {
            const response = await fetch(
                `https://api.trakt.tv/${media}/${type}?limit=${limit}&page=${page}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "trakt-api-version": "2",
                        "trakt-api-key": auth.trakt.clientId,
                    },
                }
            ).then((data) => data.json());
            
            
            return response;
        } catch (err) {
            console.log(err);
        }
    }
};

export default getMediaDetails;
