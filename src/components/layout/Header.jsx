import React from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom'
import { Menu, X } from 'lucide-react';
import {Button} from '../'


const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation().pathname;


  return (
    <header className="bg-gradient-to-r from-blue-100 to-purple-200 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-800">MovieSync</span>
        </div>

        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <NavLink to="/movies" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/movies" && e.preventDefault()}>Movies</NavLink>
          <NavLink to="/tvshows" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/tvshows" && e.preventDefault()}>Tv Shows</NavLink>
          <NavLink to="/anime" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/anime" && e.preventDefault()}>Anime</NavLink>
          <NavLink to="/profile" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/profile" && e.preventDefault()}>Profile</NavLink>
          <Button className="px-4 py-1.5 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition duration-300">Login</Button>
        </div>

        <div className="md:hidden ml-auto">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4 items-end">
            <NavLink to="/movies" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/movies" && e.preventDefault()}>Movies</NavLink>
            <NavLink to="/tvshows" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/tvshows" && e.preventDefault()}>Tv Shows</NavLink>
            <NavLink to="/anime" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/anime" && e.preventDefault()}>Anime</NavLink>
            <NavLink to="/profile" className={({isActive}) => ` hover:text-purple-600 transition duration-300 ${isActive ? "text-purple-600" : "text-gray-700"}`} onClick={(e) => location === "/profile" && e.preventDefault()}>Profile</NavLink>
            <Button>Login</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
