import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    movies: [
        {
            id: nanoid(),
            title: "trending",
            data: []
        },
        {
            id: nanoid(),
            title: "popular",
            data: []
        }
    ],

    animes: [
        {
            id: nanoid(),
            title: "trending",
            data: []
        },
        {
            id: nanoid(),
            title: "popular",
            data: []
        },
        {
            id: nanoid(),
            title: "upcoming",
            data: []
        }
    ],

    shows: [
        {
            id: nanoid(),
            title: "trending",
            data: []
        },
        {
            id: nanoid(),
            title: "popular",
            data: []
        }
    ],

}

export const mediaSlice = createSlice({
        name: 'media',
        initialState,
        reducers: {
            addMovie: (state, action) => {
                state.movies = state.movies.map((movieType)=>(movieType.title === action.payload.title ? {...movieType, data : action.payload.data} : movieType))                
            },            

            addAnime: (state, action) => {
                state.animes = state.animes.map((animeType)=>(animeType.title === action.payload.title ? {...animeType, data : action.payload.data} : animeType))
            },

            addTvShows: (state, action) => {
                state.shows = state.shows.map((showType)=>(showType.title === action.payload.title ? {...showType, data : action.payload.data} : showType))
            }
        }
});

export const {addMovie, addAnime, addTvShows} = mediaSlice.actions;

export default mediaSlice.reducer;
