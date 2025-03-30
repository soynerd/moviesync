import React, { useEffect, useState } from "react";

const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];
const languages = ["English", "Spanish", "French", "German", "Mandarin", "Hindi"];
const countries = ["USA", "UK", "India", "France", "Germany", "China"];


const years = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2025 - i);

function MovieFilterForm({searchData, storedData}) {
  const [search, setSearch] = useState(storedData?.search || "");
  const [newGenre, setNewGenre] = useState(storedData?.genre || "");
  const [newLanguage, setNewLanguage] = useState(storedData?.language || "");
  const [newCountry, setNewCountry] = useState(storedData?.country || "");
  const [newYear, setNewYear] = useState(storedData?.year || ""); 

useEffect(()=>{
    const test = setTimeout(()=>{
      searchData(search, newGenre, newLanguage, newCountry, newYear);
    }, 800)
    return () => clearTimeout(test) // reset the time when search updates ( only before 800)
      
  }, [search, newGenre, newLanguage, newCountry, newYear])
  
  

    return (
      <div className="flex justify-center items-center bg-gradient-to-r from-purple-50 to-purple-100 p-4">
        <div className="flex flex-wrap gap-4 p-4 bg-white shadow-lg rounded-2xl border border-gray-200 justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-48"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
  
          <select className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto " value={newGenre} onChange={e=>setNewGenre(e.target.value)}>
            <option value="">Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre} >{genre}</option>
            ))}
          </select>
  
          <select className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto" value={newYear} onChange={e=>setNewYear(e.target.value)}>
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year} >{year}</option>
            ))}
          </select>
  
          <select className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto" value={newLanguage} onChange={e=>setNewLanguage(e.target.value)}>
            <option value="">Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang} >{lang}</option>
            ))}
          </select>
  
          <select className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto" value={newCountry} onChange={e=>setNewCountry(e.target.value)}>
            <option value="">Country</option>
            {countries.map((country) => (
              <option key={country} value={country} >{country}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  
export default MovieFilterForm;