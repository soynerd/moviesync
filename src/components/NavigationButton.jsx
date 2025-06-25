import React from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";

function NavigationButton({refDestination, direction, scroll}) {
    
  return (
    <button 
            className={direction === "left" ? "absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hidden sm:block z-10" : "absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hidden sm:block z-10"}
            onClick={() => scroll(refDestination, direction)}
          >
            {(direction === "left") ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
  )
}

export default NavigationButton