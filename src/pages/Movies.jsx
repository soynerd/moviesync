import {MovieFilterForm, MoviesSection, SearchSection} from '../components/sections'
import React, { useState } from 'react'
import { getMediaDetails, getImageUrls } from '../utils';
import { useLoaderData } from 'react-router-dom';

function Movies() {
    const [searchEnable, setSearchEnable] = useState(false);
    const [filterData, setFilterData] = useState({});
    const [searchedMovieData, setSearchedMovieData] =useState()
    const {trending, popular} = useLoaderData();
    

    const getSearchData = async(search, genre, language, country, year) => {
        if(search.length > 2 || genre || language || country || year) {
          await getMediaDetails("movie", null, {search, genre, language, country, year})
          .then((movie)=> getImageUrls(movie))
          .then((data)=> {
            setSearchedMovieData(data)
            setSearchEnable(true);
            
        })  
        
        }
        setFilterData({
            search: search,
            genre: genre,
            language: language,
            country: country,
            year: year

        })
      }
  return searchEnable ?
      <>
        <MovieFilterForm searchData={getSearchData} filterData={filterData} />
        <SearchSection cardData={searchedMovieData} name={"Related Movies"}/>
      </>
      : <>
        <MovieFilterForm searchData={getSearchData} />
        <MoviesSection trending={trending} popular={popular} />
      </>

}
export default Movies