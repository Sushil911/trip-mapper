"use client"

import { MinusIcon, PlusCircleIcon, PlusIcon } from 'lucide-react'
import React, { useState } from 'react'

const page = () => {
    const getplac= [
    {
    id: 1,
    name: "Mount Everest Base Camp",
    position: [27.9881, 86.925],
    type: "trekking",
    rating: 4.9,
    priceLevel: 3,
    location:"Solukhumbu"
  },
  {
    id: 2,
    name: "Pashupatinath Temple",
    position: [27.7106, 85.3483],
    
    type: "temple",
    rating: 4.7,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 3,
    name: "Pokhara",
    position: [28.2096, 83.9856],
    
    type: "mountain",
    rating: 4.8,
    priceLevel: 2,
    location:"Pokhara",
  },
  {
    id: 4,
    name: "Swayambhunath Stupa",
    position: [27.7149, 85.2904],
   
    rating: 4.6,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 5,
    name: "Chitwan National Park",
    position: [27.5, 84.3333],
    
    type: "national_park",
    rating: 4.5,
    priceLevel: 2,
    location:"Chitwan",
  },
  {
    id: 6,
    name: "Boudhanath Stupa",
    position: [27.7218, 85.3621],
    
    type: "temple",
    rating: 4.7,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 7,
    name: "Kathmandu Durbar Square",
    position: [27.7045, 85.3072],
    
    type: "palace",
    rating: 4.4,
    priceLevel: 1,
    location:"Kathmandu",
  },
  {
    id: 8,
    name: "Annapurna Circuit",
    position: [28.596, 83.82],
   
    type: "trekking",
    rating: 4.9,
    priceLevel: 3,
    location:"Pokhara",
  },
  {
    id: 9,
    name: "Lumbini",
    position: [27.4698, 83.2757],
   
    type: "historic",
    rating: 4.6,
    priceLevel: 2,
    location:"Rupandehi"
  },
  {
    id: 10,
    name: "Nagarkot",
    position: [27.7156, 85.5232],
   
    type: "mountain",
    rating: 4.3,
    priceLevel: 2,
    location:"Kathmandu",
  },]
  return (
    <div>
        <main>                
            <div>
                <div className='text-2xl font-semibold'>Plan to Choose and Just Explore from:  <input type="text" name="" id="" placeholder='Enter Your preferences  .' className="relative p-3 ml-5 rounded-2xl bg-blue-100 text-black  inline-block border-blue-400 w-90" /></div>
             { getplac.map((place) => ( <div key={place.id} className="bg-blue-200 h-10 mt-5 rounded-xl w-120 p-2 flex justify-between">{place.name}
              <PlusCircleIcon />
             </div> ))}
             
             <button className='bg-blue-400 rounded-xl h-8 w-20 mt-8 relative left-100'>Done</button>
             </div>

        </main>
    </div>
  )
}

export default page