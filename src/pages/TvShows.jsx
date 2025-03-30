import {MovieFilterForm, TvShowsSection, SearchSection} from '../components/sections'
import React, { useState } from 'react'
import { getMediaDetails, getShowsData, getShowSeasonsDetails } from '../utils';
import { useLoaderData } from 'react-router-dom';

function Movies() {
    const [searchEnable, setSearchEnable] = useState(false);
    const [filterData, setFilterData] = useState({});
    const [searchedShowData, setsearchedShowData] =useState()
    const {trending, popular} = useLoaderData();
    
    const getSearchData = async(search, genre, language, country, year) => {
      const searchedData = [];
        if(search.length > 2 || genre || language || country || year) {
          try {
            
            const res = await getMediaDetails("show", null, {search, genre, language, country, year});
            
            
            await Promise.all(res.map(async (showData)=>{
              const showIds = showData.show.ids;
              console.log(showIds)
              const showDetails = await getShowsData(showIds);
              const seasonDetails = await getShowSeasonsDetails(showIds.imdb || showIds.tmdb);
              showDetails.seasonDetails = seasonDetails;
              showDetails.media = "show"
              searchedData.push(showDetails)

          }))
          } catch (error) {
            console.log("Search :: showsSearch :: getSearchData :: error", error)
          } finally {
            setsearchedShowData(searchedData);
            setSearchEnable(true);
          }

        }else{
          setsearchedShowData(null);
          setSearchEnable(false)
        }
        setFilterData({
            search: search,
            genre: genre,
            language: language,
            country: country,
            year: year

        })
        console.log(searchedData)
      }

    // const getSearchData = async(search, genre, language, country, year) => {
    //   if(search.length > 2 || genre || language || country || year) {
    //     await getMediaDetails("show", null, {search, genre, language, country, year})
    //     .then((movie)=> getImageUrls(movie))
    //     .then((data)=> {
    //       setsearchedShowData(data)
    //       setSearchEnable(true);
    //   })  
    //   }
    //   setFilterData({
    //       search: search,
    //       genre: genre,
    //       language: language,
    //       country: country,
    //       year: year

    //   })
    // }
  return searchEnable ?
      <>
        <MovieFilterForm searchData={getSearchData} filterData={filterData} />
        <SearchSection cardData={searchedShowData} name={"Related Movies"}/>
      </>
      : <>
        <MovieFilterForm searchData={getSearchData} />
        <TvShowsSection trending={trending} popular={popular} />
      </>

}
export default Movies

// await getMediaDetails("show", null, {search, genre, language, country, year})
//           .then((data)=>(data.map(async(showData)=>{
//             const showIds = showData.show.ids;
//             const res = await getShowsData(showIds);
//             const seasonDetails = await getShowSeasonsDetails(showIds);
//             res.seasonDetails = seasonDetails;
//             res.media = "show"
//             searchedData.push(res);

//           })))
//           .finally(()=>{
//             setsearchedShowData(searchedData)
//             setSearchEnable(true)
//           })