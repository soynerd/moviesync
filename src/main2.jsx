import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import {Home, Anime, Movies, TvShows, Profile} from './pages/index.jsx'
import {mediaDataLoader, showsDataLoader, getAnimeDetails, getPopularAnime} from './utils/index.js'
import './index.css'
import App from './App.jsx'
import { useSelector, useDispatch, Provider } from 'react-redux'
import {store} from './app/store.js'

// const selectorMovies = useSelector((state) => state.movies);
// const dispatch = useDispatch();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" element={<Home />} />
      <Route loader={async () => {
        const res = await getAnimeDetails();
        const trending = res.trending.media;
        const popular = res.popular.media;
        const upcoming = res.nextSeason.media;
        return {trending, popular, upcoming}
      }

      } path="/anime" element={<Anime />} />
      <Route loader={async()=>{
        // var trending="";
        // var popular="";
        // selectorMovies.map(async (movieType) => {
        //   if(movieType.title === "trending" && movieType.data.length === 0) {
        //     trending = await mediaDataLoader("movies", "trending");
        //     dispatch(addMovie({title: "trending", data: trending}))
        //   }
        //   if(movieType.title === "trending" && movieType.data.length > 0) {
        //     trending = movieType.data
        //   }
        //   if(movieType.title === "popular" && movieType.data.length === 0) {
        //     popular = await mediaDataLoader("movies", "popular");
        //     dispatch(addMovie({title: "popular", data: popular}))
        //   }
        //   if(movieType.title === "popular" && movieType.data.length > 0) {
        //     popular = movieType.data
        //   }
        // })
        const trending = await mediaDataLoader("movies", "trending");
        const popular = await mediaDataLoader("movies", "popular");
        return {trending, popular}
        }} path='/movies' element={<Movies />} />
      <Route loader={async()=>{
        const trending = await showsDataLoader("shows", "trending");
        const popular = await showsDataLoader("shows", "popular");
        return {trending, popular};
      }} path='/tvshows' element={<TvShows />} />
      <Route path='/profile' element={<Profile />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
