import { DashboardForm } from '@/components/dashboard-form'
import HotelCard from '@/components/hotel-card'
import React from 'react'

export const hotels = [
  {
    id: 1,
    image: '/mteverest.jpeg',
    name: 'Mount Everest',
     description:
      "World's highest mountain and ultimate trekking destination in the Himalayas.",
    type: 'Trekking',
    rating: 4.8,
  },
  {
    id: 2,
    image: '/lumbini.webp',
    name: 'Lumbini',
     description:
      "Birthplace of Lord Buddha and important pilgrimage site for Buddhists worldwide.",
    type: "Historic",
    rating: 4.9,
  },
  {
    id: 3,
    image: '/pashupati.webp',
    name: 'Pashupatinath Temple',
    description:
      "Sacred Hindu temple  and UNESCO World Heritage site in Kathmandu.",
    type: "Temple",
    rating: 4.8,
  },
  {
    id: 4,
    image: '/pokhara.webp',
    name: 'Pokhara',
    description:
      "Beautiful lakeside city with stunning views of Annapurna mountain range.",
    type: "Beautiful city",
    rating: 4.7,
  },
  {
    id: 5,
    image: '/chitwannp.webp',
    name: 'Chitwan National Park',
     description:
      "UNESCO World Heritage site with wildlife including Bengal tigers and one-horned rhinoceros.",
    type: "Nature",
    rating: 4.9,
  },
    {
    id: 6,
    image: '/annapurna.webp',
    name: 'Mount Annapurna',
     description:
      "Classic trekking route through diverse landscapes and traditional villages.",
    type: "Trekking",
    rating: 4.9,
  },
];

const page = () => {
  return (
    <>
      <DashboardForm />

      <div className='p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
      </div>
    </>
  )
}

export default page