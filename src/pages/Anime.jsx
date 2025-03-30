import React, {useState, useEffect} from 'react'
import {useLoaderData} from 'react-router-dom'
import { AnimeSection, AnimeFilterForm, SearchSection } from '../components/sections';
import {getSearchedAnimeData} from '../utils/'

function Anime() {
  const [searchEnable, setSearchEnable] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [searchedAnimeData, setSearchedAnimeData] =useState()
  const {trending, popular, upcoming} = useLoaderData();
  
  useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, []);
  
  const getSearchData = async(search, genre, season, format, year) => {
      if(search.length > 2 || genre || season || format || year) {
        const animeSearchedDetails = await getSearchedAnimeData(search, genre, season, format, year)
        //animeSearchedDetails.map((data)=>({...data, type : "anime"}));
        setSearchedAnimeData(animeSearchedDetails);        
        setSearchEnable(true);   
      
      setFilterData({
          search: search,
          genre: genre,
          season: season,
          format: format,
          year: year
      })
      }else{
        setSearchedAnimeData(null);
        setSearchEnable(false);
      }
    }
return searchEnable ?
    <>
      <AnimeFilterForm searchData={getSearchData} filterData={filterData} />
      <SearchSection cardData={searchedAnimeData} name={"Related Movies"}/>
    </>
    : <>
      <AnimeFilterForm searchData={getSearchData} />
      <AnimeSection trending={trending} popular={popular} upcoming={upcoming} />
    </>

}
export default Anime