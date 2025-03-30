// import React, { useEffect, useState } from "react";

// const genres = [
//     "Action",
//     "Adventure",
//     "Comedy",
//     "Drama",
//     "Ecchi",
//     "Fantasy",
//     "Hentai",
//     "Horror",
//     "Mahou Shoujo",
//     "Mecha",
//     "Music",
//     "Mystery",
//     "Psychological",
//     "Romance",
//     "Sci-Fi",
//     "Slice of Life",
//     "Sports",
//     "Supernatural",
//     "Thriller",
// ];
// const formats = [
//     {key:"TV Shows", value: "TV"},
//     {key:"Movie", value: "MOVIE"},
//     {key:"TV Short", value: "TV_SHORT"},
//     {key:"Special", value: "SPECIAL"},
//     {key:"OVA", value: "OVA"},
//     {key:"ONA", value: "ONA"},
//     {key:"Music", value: "MUSIC"},
// ];
// const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];

// const years = Array.from({ length: 2027 - 2000 + 1 }, (_, i) => 2027 - i);

// function AnimeFilterForm({ searchData, storedData }) {
//     const [search, setSearch] = useState(storedData?.search || "");
//     const [newGenre, setNewGenre] = useState(storedData?.genre || "");
//     const [season, setNewSeason] = useState(storedData?.language || "");
//     const [format, setNewFormat] = useState(storedData?.country || "");
//     const [newYear, setNewYear] = useState(storedData?.year || "");

//     useEffect(() => {
//         const test = setTimeout(() => {
//             searchData(search, newGenre, season, format, newYear);
//         }, 800);
//         return () => clearTimeout(test); // reset the time when search updates ( only before 800)
//     }, [search, newGenre, season, format, newYear]);

//     // return (
//     //     <div className="flex justify-center items-center bg-gradient-to-r from-purple-50 to-purple-100 p-4">
//     //         <div className="flex flex-wrap gap-4 p-4 bg-white shadow-lg rounded-2xl border border-gray-200 justify-center">
//     //             <input
//     //                 type="text"
//     //                 placeholder="Search..."
//     //                 className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-48"
//     //                 value={search}
//     //                 onChange={(e) => setSearch(e.target.value)}
//     //             />

//     //             <select
//     //                 className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto "
//     //                 value={newGenre}
//     //                 onChange={(e) => setNewGenre(e.target.value)}
//     //             >
//     //                 <option value="">Genres</option>
//     //                 {genres.map((genre) => (
//     //                     <option key={genre} value={genre}>
//     //                         {genre}
//     //                     </option>
//     //                 ))}
//     //             </select>

//     //             <select
//     //                 className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto"
//     //                 value={newYear}
//     //                 onChange={(e) => setNewYear(e.target.value)}
//     //             >
//     //                 <option value="">Year</option>
//     //                 {years.map((year) => (
//     //                     <option key={year} value={year}>
//     //                         {year}
//     //                     </option>
//     //                 ))}
//     //             </select>

//     //             <select
//     //                 className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto"
//     //                 value={seasons}
//     //                 onChange={(e) => setNewSeason(e.target.value)}
//     //             >
//     //                 <option value="">Season</option>
//     //                 {seasons.map((season) => (
//     //                     <option key={season} value={season}>
//     //                         {season}
//     //                     </option>
//     //                 ))}
//     //             </select>

//     //             <select
//     //                 className="border border-gray-300 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-18 sm:w-auto"
//     //                 value={formats}
//     //                 onChange={(e) => setNewFormat(e.target.value)}
//     //             >
//     //                 <option value="">Format</option>
//     //                 {formats.map((format) => (
//     //                     <option key={format.key} value={format.value}>
//     //                         {format.key}
//     //                     </option>
//     //                 ))}
//     //             </select>
//     //         </div>
//     //     </div>
//     // );

//     return(
//         <div className="flex justify-center items-center bg-gradient-to-r from-purple-50 to-purple-100 p-4">
//   <div className="flex flex-wrap gap-4 p-4 bg-white shadow-lg rounded-2xl border border-gray-200 justify-center">
//     <input
//       type="text"
//       placeholder="Search..."
//       className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-48 text-gray-700 shadow-sm"
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//     />

//     {[
//       { value: newGenre, setValue: setNewGenre, options: genres, placeholder: "Genres" },
//       { value: newYear, setValue: setNewYear, options: years, placeholder: "Year" },
//       { value: seasons, setValue: setNewSeason, options: seasons, placeholder: "Season" },
//       { value: formats, setValue: setNewFormat, options: formats.map(f => ({ key: f.key, value: f.value })), placeholder: "Format" }
//     ].map(({ value, setValue, options, placeholder }, index) => (
//       <div key={index} className="relative w-40 sm:w-auto">
//         <select
//           className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-700 shadow-sm w-full appearance-none cursor-pointer"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         >
//           <option value="" className="text-gray-400">{placeholder}</option>
//           {options.map((option, i) => (
//             <option 
//               key={i} 
//               value={option.value || option} 
//               className="bg-white text-gray-700 hover:bg-purple-100 p-3 rounded-lg"
//             >
//               {option.key || option}
//             </option>
//           ))}
//         </select>
//         <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 peer-focus:text-purple-500 pointer-events-none">
//           ▼
//         </span>
//       </div>
//     ))}
//   </div>
// </div>

//     )
// }

// export default AnimeFilterForm;












import React, { useState, useRef, useEffect } from 'react';

// Custom Dropdown Component
const CustomSelect = ({ options, value, setValue, placeholder }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-40 sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="border border-gray-300 p-3 rounded-xl bg-white text-gray-700 shadow-sm w-full text-left flex justify-between items-center focus:ring-2 focus:ring-purple-500 gap-1"
      >
        {value || placeholder}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <ul
          className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-xl border border-gray-200 z-10 overflow-y-auto max-h-80"
          // Adjust the maxHeight as needed
        >
          {options.map((option, index) => (
            <li
              key={index}
              className="p-3 hover:bg-purple-100 cursor-pointer transition-all"
              onClick={() => {
                setValue(option.value || option);
                setOpen(false);
              }}
            >
              {option.key || option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Main Application Component
const AnimeFilterForm = ({ searchData, storedData }) => {
  const [search, setSearch] = useState(storedData?.search || "");
  const [genre, setGenre] = useState(storedData?.search || "");
  const [year, setYear] = useState(storedData?.search || "");
  const [season, setSeason] = useState(storedData?.search || "");
  const [format, setFormat] = useState(storedData?.search || "");

  // Provided data
  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Hentai',
    'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mystery', 'Psychological',
    'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller',
  ];

  const formats = [
    { key: 'TV Shows', value: 'TV' },
    { key: 'Movie', value: 'MOVIE' },
    { key: 'TV Short', value: 'TV_SHORT' },
    { key: 'Special', value: 'SPECIAL' },
    { key: 'OVA', value: 'OVA' },
    { key: 'ONA', value: 'ONA' },
    { key: 'Music', value: 'MUSIC' },
  ];

  const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];

  const years = Array.from({ length: 2027 - 2000 + 1 }, (_, i) => 2027 - i);

  useEffect(() => {
      const test = setTimeout(() => {
        searchData(search, genre, season, format, year);
      }, 800);
      return () => clearTimeout(test); // reset the time when search updates ( only before 800)
    }, [search, genre, season, format, year]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-purple-50 to-purple-100 p-4">
      <div className="flex flex-wrap gap-4 p-4 bg-white shadow-lg rounded-2xl border border-gray-200 justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-48 text-gray-700 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <CustomSelect options={genres} placeholder="Genres" value={genre} setValue={setGenre} />
        <CustomSelect options={years} placeholder="Year" value={year} setValue={setYear} />
        <CustomSelect options={seasons} placeholder="Season" value={season} setValue={setSeason} />
        <CustomSelect options={formats} placeholder="Format" value={format} setValue={setFormat} />
      </div>
    </div>
  );
};

export default AnimeFilterForm;
