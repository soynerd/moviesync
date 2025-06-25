import { data } from 'react-router-dom';
import auth from '../config/config'

const loadImages = async (movies, id=null, setter)=>{
    const allMovies =[];
    if (movies){
        try {
            await Promise.all(
                movies.map(async (movieData)=>{
                var temp ={};
                await fetch(`https://api.trakt.tv/movies/${movieData?.movie?.ids?.imdb || movieData?.ids?.imdb || movieData?.movie?.ids?.tmdb || movieData?.ids?.tmdb}?extended=full`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "trakt-api-version": "2",
                            "trakt-api-key": auth.trakt.clientId,
                        },
                    }
                )
                .then(data => data.json())
                .then((data)=>(temp = data));

                await fetch(`http://webservice.fanart.tv/v3/movies/${movieData?.movie?.ids?.imdb || movieData?.ids?.imdb || movieData?.movie?.ids?.tmdb || movieData?.ids?.tmdb}?api_key=${auth.fanart.apiKey}`)
                .then(data => data.status == 400 ? {movielogo : [{"url" : undefined}], movieposter : [{"url" : undefined}], moviebackground : [{"url" : undefined}], moviebanner : [{"url" : undefined}]} : data.status === 404 ? data=null :data.json())
                .then(data => data ? ({...temp, urls : {movieLogo : data.movielogo, moviePoster : data?.movieposter, movieBackground : data.moviebackground, movieBanner : data.moviebanner}}) : null)
                .then(data =>({...data, type:"movie"}))
                .then(data => data ? allMovies.push(data) : null)
                })

                
            
            )
            
        } catch (error) {
            console.log("API :: loadImages :: error ", error)
        }
    }
    if(id){
        const url = await fetch(`http://webservice.fanart.tv/v3/movies/${id}?api_key=${auth.fanart.apiKey}`)
            .then(data => data.status == 400 ? {movielogo : [{"url" : undefined}], movieposter : [{"url" : undefined}], moviebackground : [{"url" : undefined}], moviebanner : [{"url" : undefined}]} : data.json())
            .then(data => ({urls : {movieLogo : data.movielogo, moviePoster : data?.movieposter, movieBackground : data.moviebackground, movieBanner : data.moviebanner}}))
            .then(data => (allMovies.push(data)))
    }
    // console.log(allMovies);
    if(setter) setter(allMovies)
        else return allMovies;

    

  }

  export default loadImages;

  // not aplicable for tv shows and anime