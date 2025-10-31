import { DashboardForm } from '@/components/dashboard-form'
import HotelCard from '@/components/hotel-card'
import React from 'react'

export const hotels = [
  {
    id: 1,
    image: './file.svg',
    name: 'Himalayan View Resort',
    price: 120,
    bedroom: '2 Bed • 1 Bath',
    rating: 4.8,
  },
  {
    id: 2,
    image: 'globe.svg',
    name: 'Everest Grand Hotel',
    price: 200,
    bedroom: '3 Bed • 2 Bath',
    rating: 4.9,
  },
  {
    id: 3,
    image: 'next.svg',
    name: 'Lakeside Retreat',
    price: 95,
    bedroom: '1 Bed • 1 Bath',
    rating: 4.5,
  },
  {
    id: 4,
    image: 'vercel.svg',
    name: 'Kathmandu Boutique Stay',
    price: 150,
    bedroom: '2 Bed • 2 Bath',
    rating: 4.7,
  },
  {
    id: 5,
    image: 'window.svg',
    name: 'Pokhara Paradise Hotel',
    price: 180,
    bedroom: '3 Bed • 2 Bath',
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