import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Home, Anime, Movies, TvShows, Profile, Login } from './pages/index.jsx';
import {MovieDetails, AnimeDetails, TvShowsDetails} from './components/extendedDetails/'
import { mediaDataLoader, showsDataLoader, getAnimeDetails } from './utils/index.js';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import { addMovie, addAnime, addTvShows } from './app/mediaSlice.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      
      {/* Anime Loader */}
      <Route
        path="/anime"
        loader={async () => {
          const state = store.getState();
          let trending = state.media.animes.find(anime => anime.title === "trending")?.data || [];
          let popular = state.media.animes.find(anime => anime.title === "popular")?.data || [];
          let upcoming = state.media.animes.find(anime => anime.title === "upcoming")?.data || [];

          if (trending.length === 0 || popular.length === 0 || upcoming.length === 0) {
            const res = await getAnimeDetails();
            trending = trending.length > 0 ? trending : res.trending.media;
            popular = popular.length > 0 ? popular : res.popular.media;
            upcoming = upcoming.length > 0 ? upcoming : res.nextSeason.media;

            store.dispatch(addAnime({ title: "trending", data: trending }));
            store.dispatch(addAnime({ title: "popular", data: popular }));
            store.dispatch(addAnime({ title: "upcoming", data: upcoming }));
          }

          return { trending, popular, upcoming };
        }}
        element={<Anime />}
      />

      {/* Movies Loader */}
      <Route
        path="/movies"
        loader={async () => {
          const state = store.getState();
          let trending = state.media.movies.find(movie => movie.title === "trending")?.data || [];
          let popular = state.media.movies.find(movie => movie.title === "popular")?.data || [];

          if (trending.length === 0) {
            trending = await mediaDataLoader("movies", "trending");
            store.dispatch(addMovie({ title: "trending", data: trending }));
          }

          if (popular.length === 0) {
            popular = await mediaDataLoader("movies", "popular");
            store.dispatch(addMovie({ title: "popular", data: popular }));
          }

          return { trending, popular };
        }}
        element={<Movies />}
      />

      {/* TV Shows Loader */}
      <Route
  path="/tvshows"
  loader={async () => {
    const state = store.getState();
    let trending = state.media.shows.find(show => show.title === "trending")?.data || [];
    let popular = state.media.shows.find(show => show.title === "popular")?.data || [];

    if (trending.length === 0) {
      const fetchedTrending = await showsDataLoader("shows", "trending");
      trending = fetchedTrending;
      store.dispatch(addTvShows({ title: "trending", data: fetchedTrending }));
    }

    if (popular.length === 0) {
      const fetchedPopular = await showsDataLoader("shows", "popular");
      popular = fetchedPopular;
      store.dispatch(addTvShows({ title: "popular", data: fetchedPopular }));
    }

    return { trending, popular };
  }}
  element={<TvShows />}
/>


      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />

      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path='/anime/:id' element={<AnimeDetails />} />
      <Route path='/tvshows/:id' element={<TvShowsDetails />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
